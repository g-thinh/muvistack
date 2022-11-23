import type { NextApiRequest, NextApiResponse } from "next";
import { Webhook, WebhookUnbrandedRequiredHeaders } from "svix";
import { ClerkPayload, CreatedUserData, DeletedUserData } from "types/clerk";
import isClerkEvent from "utils/is-clerk";
import { createNewUser, deleteUser } from "@src/prisma/user";
import { withExceptionFilter } from "@src/utils/with-exception.filter";
import { ApiError } from "next/dist/server/api-utils";
import HttpStatusCode from "@src/types/http-status-code";

const secret = process.env.clerkWebhookSecret as string;

/**
 * @name userWebhookHandler
 * @description handle incoming webhook requests for user-related events from Clerk. See more {@link https://clerk.dev/docs/integration/webhooks here}.
 * @remarks webhook signature is verified by {@link https://docs.svix.com/receiving/verifying-payloads/how Svix}
 * @param req
 * @param res
 */
async function userWebhookHandler(req: NextApiRequest, res: NextApiResponse) {
  const payload = JSON.stringify(req.body);
  const headers = req.headers as unknown as WebhookUnbrandedRequiredHeaders;
  const webhook = new Webhook(secret);

  //validate the webhook
  try {
    const verifiedPayload = webhook.verify(payload, headers) as ClerkPayload;

    if (isClerkEvent(verifiedPayload.type ?? verifiedPayload?.event_type)) {
      switch (verifiedPayload.type) {
        case "user.created": {
          await createNewUser(verifiedPayload as ClerkPayload<CreatedUserData>);
          break;
        }
        case "user.deleted": {
          await deleteUser(verifiedPayload as ClerkPayload<DeletedUserData>);
          break;
        }
        default:
          break;
      }
    }

    return res.status(200).json({
      message: `successfully processed ${
        verifiedPayload?.type ?? verifiedPayload.event_type
      }`,
    });
  } catch (error) {
    throw new ApiError(
      HttpStatusCode.FORBIDDEN,
      "User does not have permission handle webhook request."
    );
  }
}

export const config = {
  api: {
    bodyParse: false,
  },
};

export default function userApiHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return withExceptionFilter(req, res)(userWebhookHandler);
}

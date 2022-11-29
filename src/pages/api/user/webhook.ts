import { CatchException } from "middlewares/catch-exception";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  createHandler,
  ForbiddenException,
  Post,
  Req,
  Res,
} from "next-api-decorators";
import { UserService } from "services/user-service";
import { Webhook, WebhookUnbrandedRequiredHeaders } from "svix";
import { ClerkPayload, CreatedUserData, DeletedUserData } from "types/clerk";
import isClerkEvent from "utils/is-clerk";

const secret = process.env.clerkWebhookSecret as string;

/**
 * Route handler for incoming webhook requests for user-related events from Clerk.
 * @see {@link https://clerk.dev/docs/integration/webhooks Clerk Webhooks}.
 * @remarks webhook signature is verified by {@link https://docs.svix.com/receiving/verifying-payloads/how Svix}
 */
@CatchException()
class UserWebhookHandler {
  constructor(private readonly userService: UserService) {
    this.userService = new UserService();
  }

  @Post("/webhook")
  async handleWebhook(@Req() req: NextApiRequest, @Res() res: NextApiResponse) {
    const payload = JSON.stringify(req.body);
    const headers = req.headers as unknown as WebhookUnbrandedRequiredHeaders;
    const webhook = new Webhook(secret);

    //validate the webhook
    try {
      const verifiedPayload = webhook.verify(payload, headers) as ClerkPayload;

      if (isClerkEvent(verifiedPayload.type ?? verifiedPayload?.event_type)) {
        switch (verifiedPayload.type) {
          case "user.created": {
            await this.userService.create(
              verifiedPayload as ClerkPayload<CreatedUserData>
            );
            break;
          }
          case "user.updated": {
            await this.userService.update(
              verifiedPayload as ClerkPayload<CreatedUserData>
            );
            break;
          }
          case "user.deleted": {
            const {
              data: { id },
            } = verifiedPayload as ClerkPayload<DeletedUserData>;
            await this.userService.removeById(id);
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
      throw new ForbiddenException("User not allowed to make webhook requests");
    }
  }
}

export const config = {
  api: {
    bodyParse: false,
  },
};

export default createHandler(UserWebhookHandler);

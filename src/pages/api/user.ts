import type { NextApiRequest, NextApiResponse } from "next";
import { Webhook, WebhookUnbrandedRequiredHeaders } from "svix";

const secret = process.env.clerkWebhookSecret as string;

const CLERK_SUBSCRIBED_EVENT_TYPES = ["user.created", "svix.ping"] as const;
type EventType = typeof CLERK_SUBSCRIBED_EVENT_TYPES[number];

interface Payload<T = {}> {
  data: Record<any, any> | T;
  object: "event";
  event_type?: string;
  type: EventType;
}

function isClerkEvent(eventType: string): eventType is EventType {
  return (
    typeof eventType === "string" &&
    CLERK_SUBSCRIBED_EVENT_TYPES.includes(eventType as EventType)
  );
}

async function handleWebhook(message: Payload) {
  if (isClerkEvent(message.type ?? message?.event_type)) {
    console.log("this is a valid type", message.type);
  } else {
    console.log("invalid type", message.type);
  }
  console.log(message);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const payload = JSON.stringify(req.body);
  const headers = req.headers as unknown as WebhookUnbrandedRequiredHeaders;
  const webhook = new Webhook(secret);

  //validate the webhook
  try {
    const verifiedPayload = webhook.verify(payload, headers) as Payload;

    await handleWebhook(verifiedPayload);

    res.status(200).json({
      message: `successfully processed ${verifiedPayload.event_type}`,
    });
  } catch (error) {
    res.status(400).json(error);
  }
}

export const config = {
  api: {
    bodyParse: false,
  },
};

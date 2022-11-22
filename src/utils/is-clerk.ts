import { ClerkEventType, CLERK_SUBSCRIBED_EVENT_TYPES } from "types/clerk";

export default function isClerkEvent(
  eventType: string
): eventType is ClerkEventType {
  return (
    typeof eventType === "string" &&
    CLERK_SUBSCRIBED_EVENT_TYPES.includes(eventType as ClerkEventType)
  );
}

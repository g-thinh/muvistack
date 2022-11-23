import HttpStatusCode from "@src/types/http-status-code";
import { ApiError } from "next/dist/server/api-utils";

export function isError(exception: unknown): exception is Error {
  return exception instanceof Error;
}

export function getExceptionStatus(exception: unknown) {
  return exception instanceof ApiError
    ? exception.statusCode
    : HttpStatusCode.INTERNAL_SERVER_ERROR;
}

export function getExceptionMessage(exception: unknown) {
  return isError(exception) ? exception.message : `Internal Server Error`;
}

export function getExceptionStack(exception: unknown) {
  return isError(exception) ? exception.stack : undefined;
}

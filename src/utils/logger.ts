import pino, { Logger } from "pino";

/**
 * returns a pino logging instance with its default configuration given a context name
 * @remarks uses  {@link https://github.com/pinojs/pino-pretty pino-pretty}
 * @see {@link https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-pino-to-log-node-js-applications/ Better Stack Logging Guide}
 * @param name name of the context being logged
 */
export function getLogger(name: string): Logger {
  return pino({
    name,
    level: process.env.NODE_ENV !== "production" ? "debug" : "info",
    transport: {
      target: "pino-pretty",
      options: {
        levelFirst: true,
        minimumLevel: "debug",
      },
    },
  });
}

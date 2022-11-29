export const PUBLIC_PATHS = ["/", "/sign-in*", "/sign-up*", "/api*"];

/**
 * verifies if the url path is public
 * @param path
 */
export const isPublic = (path: string) => {
  return PUBLIC_PATHS.find((p) =>
    path.match(new RegExp(`^${p}$`.replace("*$", "($|/)")))
  );
};

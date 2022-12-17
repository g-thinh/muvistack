import { withSwagger } from "next-swagger-doc";

/**
 * middleware that will read jsdoc commentary to generate and return an api response
 * @see {@link https://swagger.io/docs/specification/paths-and-operations/}
 */
const swaggerHandler = withSwagger({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "NextJS Swagger",
      version: "0.1.0",
    },
  },
  apiFolder: "/src/pages/api",
});
export default swaggerHandler();

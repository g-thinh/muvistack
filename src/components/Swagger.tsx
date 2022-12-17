import SwaggerUI, { SwaggerUIProps } from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function Swagger(props: SwaggerUIProps) {
  return <SwaggerUI {...props} />;
}

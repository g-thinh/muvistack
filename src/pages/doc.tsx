import { InferGetStaticPropsType } from "next";
import { createSwaggerSpec } from "next-swagger-doc";
import dynamic from "next/dynamic";

const SwaggerUI = dynamic(() => import("components/Swagger"), { ssr: false });

export const getStaticProps = async () => {
  const spec: Record<string, any> = createSwaggerSpec({
    apiFolder: "/src/pages/api",
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Next Swagger API Example",
        version: "1.0",
      },
    },
  });

  return {
    props: {
      spec,
    },
  };
};

export default function ApiDocPage({
  spec,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <SwaggerUI spec={spec} />;
}

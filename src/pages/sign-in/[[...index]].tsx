import { SignIn } from "@clerk/nextjs";
import { Container } from "@mantine/core";
import { useRouter } from "next/router";

export default function SignInPage() {
  const { query } = useRouter();

  const redirectUrl = query.redirect_url as string;

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        redirectUrl={redirectUrl ?? "/"}
      />
    </Container>
  );
}

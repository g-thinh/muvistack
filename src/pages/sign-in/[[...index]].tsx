import { SignIn } from "@clerk/nextjs";
import { Container } from "@mantine/core";

export default function SignInPage() {
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
        redirectUrl="/"
      />
    </Container>
  );
}

import { SignUp } from "@clerk/nextjs";
import { Container } from "@mantine/core";

export default function SignUpPage() {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        redirectUrl="/"
      />
    </Container>
  );
}

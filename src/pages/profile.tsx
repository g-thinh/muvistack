import { UserProfile } from "@clerk/nextjs";
import { Container } from "@mantine/core";

export default function ProfilePage() {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <UserProfile />
    </Container>
  );
}

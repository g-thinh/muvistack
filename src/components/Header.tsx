import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { Box, Button, Flex, Text, Title } from "@mantine/core";
import Link from "next/link";

export default function Header() {
  const { isLoaded, isSignedIn, user } = useUser();
  return (
    <Box component="header">
      <Flex justify="space-between" p={12} align="center">
        <Box
          component={Link}
          href="/"
          sx={(theme) => ({
            textDecoration: "none",
            color: "inherit",
            ":hover": {
              color: theme.colors.blue[6],
            },
          })}
        >
          <Title>Muvistack</Title>
        </Box>
        <SignedIn>
          <Flex align="center" gap={12}>
            {isLoaded && isSignedIn && <Text>Hello, {user.fullName}</Text>}
            <UserButton afterSignOutUrl="/" />
          </Flex>
        </SignedIn>
        <SignedOut>
          <Button component={Link} href="/sign-in">
            Sign In
          </Button>
        </SignedOut>
      </Flex>
    </Box>
  );
}

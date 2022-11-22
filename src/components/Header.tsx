import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Box, Button, Flex, Title, NavLink } from "@mantine/core";
import { NextLink } from "@mantine/next";
import Link from "next/link";

export default function Header() {
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
          <UserButton />
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

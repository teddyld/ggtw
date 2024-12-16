import React from "react";
import { dark } from "@clerk/themes";
import { UserProfile } from "@clerk/clerk-react";
import { Paper, Center, SegmentedControl } from "@mantine/core";
import { FaRegUser } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";

import { useTheme } from "../hooks/useTheme";
import Layout from "../components/layout/Layout";

export default function Profile() {
  const { theme } = useTheme();
  const [control, setControl] = React.useState("account");

  return (
    <Layout>
      <SegmentedControl
        value={control}
        onChange={setControl}
        data={[
          {
            value: "account",
            label: (
              <Center className="gap-2">
                <FaRegUser className="text-lg" />
                <span>Account</span>
              </Center>
            ),
          },
          {
            value: "settings",
            label: (
              <Center className="gap-2">
                <CiSettings className="text-lg" />
                <span>Settings</span>
              </Center>
            ),
          },
        ]}
      />
      {control === "account" ? (
        <UserProfile
          appearance={{
            baseTheme: theme === "dark" ? dark : undefined,
          }}
        />
      ) : (
        <Paper
          shadow="sm"
          p="xl"
          withBorder
          radius="lg"
          className="w-full max-w-4xl"
        >
          Settings
        </Paper>
      )}
    </Layout>
  );
}

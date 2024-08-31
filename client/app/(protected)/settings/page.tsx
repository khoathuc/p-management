import React from "react";
import { auth, signOut } from "../../../auth";
import DataTable from "@/components/data-table"; // Adjust import path
import SignOutButton from "@/components/auth/sign-out-button";

const SettingsPage = async () => {
  const session = await auth();
  console.log(session);

  return;
};

export default SettingsPage;

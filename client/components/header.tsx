import React from "react";
import { RxNotionLogo } from "react-icons/rx";
import { AiOutlineGlobal } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa6";
import { HeaderMenubar } from "@/components/menu-bar";

import Link from "next/link";
import { Button } from "./ui/button";
import { LoginButton } from "./auth/login-button";

const Header = () => {
  return (
    <div className="w-full">
      <div className="h-16 flex items-center justify-between px-5 mx-auto">
        <div className="flex items-center gap-6">
          <Link
            href={"/"}
            className="flex items-center font-medium text-lg tracking-tight"
          >
            <RxNotionLogo size={36} className="mr-2.5" />
            {/* <p>
              simple<span className="text-black/50">list</span>
            </p> */}
            <p>Notion</p>
          </Link>
          <HeaderMenubar />
        </div>

        <div className="flex items-center gap-2">
          <Button variant={"ghost"} size={"xs"} className="font-normal border">
            Request a demo
          </Button>

          <LoginButton>
            <Button size={"xs"}>Get Notion free</Button>
          </LoginButton>
        </div>
      </div>
    </div>
  );
};

export default Header;

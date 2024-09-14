"use client";

import { useParams } from "next/navigation";
import { Clock, MenuIcon, MessageSquareText, Star } from "lucide-react";
import { Title } from "./title";
import { Menu } from "./menu";
import { Publish } from "./publish";
import { Banner } from "./banner";
import { timeSolved } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Edited from "./edited";
import { Button } from "@/components/ui/button";
import { IoStarOutline } from "react-icons/io5";
import Starred from "./starred";

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

export const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
  const params = useParams();

  const document = null;

  if (document === undefined) {
    return (
      <nav className="h-11 bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center justify-between">
        <Title.Skeleton />
        <div className="flex items-center gap-x-2">
          <Menu.Skeleton />
        </div>
      </nav>
    );
  }

  if (document === null) {
    return null;
  }

  return (
    <>
      <nav className="h-11 bg-background dark:bg-[#1F1F1F] px-2.5 py-2 w-full flex items-center gap-x-4">
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="h-6 w-6 text-muted-foreground"
          />
        )}
        <div className="flex items-center justify-between w-full">
          <Title initialData={document} />
          <div className="flex items-center gap-x-0.5">
            <Edited initialData={document} />
            {/* <Publish initialData={document} /> */}
            {/* <Starred initialData={document} /> */}
            {/* <Menu documentId={document._id} /> */}
          </div>
        </div>
      </nav>
      {/* {document.isArchived && <Banner documentId={document._id} />} */}
    </>
  );
};

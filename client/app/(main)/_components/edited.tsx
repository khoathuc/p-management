import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { timeSolved } from "@/lib/utils";
import React from "react";

interface PublishProps {
  initialData: {
    updateTime: number; // This should be a timestamp (number)
    _creationTime: number; // This should also be a timestamp
  };
}

export const Edited = ({ initialData }: PublishProps) => {
  // TODO: Create user hook to get current user data
  // const { user } = useUser();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <p className="text-muted-foreground/70 cursor-default text-sm mr-1">
            {timeSolved(initialData.updateTime.toString()) !== "0m"
              ? `Edited ${timeSolved(initialData.updateTime.toString())} ago`
              : "Edited just now"}
          </p>
        </TooltipTrigger>
        <TooltipContent
          align="start"
          className="text-xs p-1.5 px-2.5 text-muted-foreground space-y-0.5"
        >
          <p>
            Edited by
            <span className="text-primary font-medium">
              {
                // user?.username
                "William"
              }{" "}
            </span>
            {timeSolved(initialData.updateTime.toString())} ago
          </p>
          <p>
            Created by{" "}
            <span className="text-primary font-medium">
              {
                // user?.username
                "William"
              }{" "}
            </span>
            {timeSolved(initialData._creationTime.toString())} ago
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Edited;

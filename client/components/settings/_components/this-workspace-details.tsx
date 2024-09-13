import React from "react";
import { Input } from "../../ui/input";
import HeadContent from "./head-content";
import TitleContent from "./title-content";

const WorkspaceDetails = () => {

    return (
        <div>

            <HeadContent label="Details" />
            <div className="flex flex-col gap-4">
                <TitleContent
                    title="Name"
                    subtitle={
                        // user?.emailAddresses[0]?.emailAddress
                        "Change the name of the workspace."
                    }
                >
                    <Input className="w-60 mr-1" placeholder="Name" />
                </TitleContent>
            </div>
        </div>
    );
}

export default WorkspaceDetails;
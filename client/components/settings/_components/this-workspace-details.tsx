import { Input } from "../../ui/input";
import HeadContent from "./head-content";
import TitleContent from "./title-content";

const WorkspaceDetails = () => {

    return (
        <div>

            <HeadContent label="Details" />
            <div className="flex flex-col gap-4">
                <TitleContent
                    title="Avatar"
                    subtitle="Change workspace's avatar"
                >
                    <></>
                </TitleContent>
                <div className="flex items-center flex-col gap-3">
                    <img src="https://picsum.photos/200/300?random=4" alt="" className="size-40 rounded-xl" />
                    <label htmlFor="avatar" className="cursor-pointer flex flex-col items-center text-sm">
                        Choose Image
                        <Input id="avatar" type="file" className="w-64 mb-4" />
                    </label>
                </div>

                <TitleContent
                    title="Name"
                    subtitle={
                        // user?.emailAddresses[0]?.emailAddress
                        "Change the name of the workspace."
                    }
                >
                    <Input className="w-96 mr-1" placeholder="Name" />
                </TitleContent>

            </div>
        </div>
    );
}

export default WorkspaceDetails;
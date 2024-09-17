import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Ellipsis } from 'lucide-react';
import { useState } from "react";
import HeadContent from './_components/head-content';

const MyWorkspaces = () => {

    const [workspace_datas, setWorkspace_data] = useState([
        {
            name: 'Notion Clone',
            avatar: "https://picsum.photos/200/300?random=1",
            owner: 'Joshua Kimmich',
            myRole: 'User'
        },
        {
            name: 'Github Clone',
            avatar: "https://picsum.photos/200/300?random=2",
            owner: 'Erling Finland',
            myRole: 'Admin'
        },
        {
            name: 'OHA Taiwan',
            avatar: "https://picsum.photos/200/300?random=3",
            owner: 'Kilian Emdangphe',
            myRole: 'Admin'
        }
    ]);

    return (
        <>
            <HeadContent label="Workspaces" />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[340px]">Name</TableHead>
                        <TableHead className="w-[220px]">Owner</TableHead>
                        <TableHead>My role</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {workspace_datas.map((wd) => (
                        <TableRow key={wd.name}>
                            <TableCell>
                                <div className="flex flex-row">
                                    <span className="flex flex-row mr-2 cursor-pointer"><img className="w-5 rounded-[3px]" src={wd.avatar} alt="workspace avatar" /></span>
                                    <span className="text-[#0c66e4] flex items-center flex-row cursor-pointer hover:underline hover:decoration-solid">{wd.name}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-row">
                                    <span className="flex flex-row mr-1 cursor-pointer">
                                        <Avatar className="size-7">
                                            <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </span>
                                    <span className="text-[#0c66e4] flex items-center flex-row cursor-pointer hover:underline hover:decoration-solid">{wd.owner}</span>
                                </div>
                            </TableCell>
                            <TableCell>{wd.myRole}</TableCell>
                            <TableCell className="text-right flex justify-end">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Ellipsis className="cursor-pointer" />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-40 p-0 py-2 rounded-sm">
                                        <div className="flex flex-col w-full">
                                            <div className="cursor-pointer h-8 flex items-center text-sm px-3 hover:bg-[#091E420F]">
                                                Workspace settings
                                            </div>
                                            <div className="cursor-pointer h-8 flex items-center text-sm px-3 hover:bg-[#091E420F]">
                                                Move to trash
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody >
            </Table >
        </>
    );
}

export default MyWorkspaces;
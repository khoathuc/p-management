import { Button } from "@/components/ui/button";
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList
} from "@/components/ui/command";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { CheckIcon, ChevronDown } from "lucide-react";
import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "../../ui/table";
import HeadContent from "./head-content";

const WorkspaceAccess = () => {
    const [isChange, setIsChange] = useState(true);
    const [users, setUsers] = useState([
        {
            avatar: "https://picsum.photos/200/300?random=1",
            username: "johndoe",
            email: "johndoe@gmail.com",
            role: "owner",
            action: ""
        },
        {
            avatar: "https://picsum.photos/200/300?random=2",
            username: "janedean",
            email: "janedean@gmail.com",
            role: "member",
            action: ""
        },
        {
            avatar: "https://picsum.photos/200/300?random=3",
            username: "jeandown",
            email: "jeandown@gmail.com",
            role: "admin",
            action: ""
        }
    ]);

    const [openPopover, setOpenPopover] = useState<string | null>(null); // Track which Popover is open

    const frameworks = [
        {
            value: "admin",
            label: "Admin",
        },
        {
            value: "owner",
            label: "Owner",
        },
        {
            value: "member",
            label: "Member",
        },
    ];

    const handleRoleChange = (username: string, newRole: string) => {
        const updatedUsers = users.map(user =>
            user.username === username ? { ...user, role: newRole } : user
        );
        setUsers(updatedUsers);
        setIsChange(!isChange); // Toggle the state to force re-render
        setOpenPopover(null); // Close the Popover after selection
    };

    return (
        <div>
            <HeadContent label="Access" />
            <div className="flex flex-col gap-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[300px]">User</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead className="w-[150px] mx-4">Role</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.username}>
                                <TableCell className="font-medium">
                                    <span className="inline-block w-6 h-6 mr-1">
                                        <img src={user.avatar} />
                                    </span>
                                    <span>{user.username}</span>
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Popover open={openPopover === user.username} onOpenChange={() => setOpenPopover(user.username)}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size={"lg"}
                                                className="px-2 text-sm font-normal h-7"
                                            >
                                                {user.role
                                                    ? frameworks.find((framework) => framework.value === user.role)
                                                        ?.label
                                                    : "Admin"}
                                                <ChevronDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[240px] p-0" align="end">
                                            <Command>
                                                <CommandList>
                                                    <CommandGroup>
                                                        {frameworks.map((framework) => (
                                                            <CommandItem
                                                                key={framework.value}
                                                                value={framework.value}
                                                                onSelect={() => handleRoleChange(user.username, framework.value)}
                                                                className="cursor-pointer"
                                                            >
                                                                {framework.label}
                                                                <CheckIcon
                                                                    className={cn(
                                                                        "ml-auto h-4 w-4",
                                                                        user.role === framework.value
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    )}
                                                                />
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                                <TableCell className="text-right">{user.action}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default WorkspaceAccess;

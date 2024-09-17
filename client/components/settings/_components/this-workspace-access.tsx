import { Button } from "@/components/ui/button";
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList
} from "@/components/ui/command";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { CheckIcon, ChevronDown, Link } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";
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

    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        setError(''); // Xóa lỗi khi người dùng bắt đầu nhập
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputValue) {
            setError('Email or Username not valid');
        } else {
            // Xử lý logic gửi lời mời ở đây
            console.log('Invitation sent to:', inputValue);
        }
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
                <div className="flex justify-end">

                    <Dialog onOpenChange={() => setError('')}>
                        <DialogTrigger asChild>
                            <Button
                                variant={'outline'}
                                className="bg-blue-700 text-white w-40 text-base hover:bg-blue-900 hover:text-white">
                                Invite new user
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Invite users</DialogTitle>
                                <DialogDescription>
                                    Invite users to this workspace
                                </DialogDescription>
                            </DialogHeader>
                            <div>
                                <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                                    <Input
                                        type="text"
                                        placeholder="Email or Username"
                                        value={inputValue}
                                        onChange={handleInputChange}
                                        className="input-class"
                                    />
                                    <Button type="submit" className="button-class">
                                        Invite
                                    </Button>
                                </form>
                                {error && <div className="text-red-500 mt-2 mx-1 text-sm">{error}</div>}
                            </div>
                            <div className="flex items-center mx-1">
                                <span className="text-center text-[#737373]">Invite user by link:</span>
                                <span className="mx-4">
                                    <Button variant={'secondary'} onClick={() => {
                                        navigator.clipboard.writeText("https://example.com/invite");
                                        toast.success('Copied!')
                                    }}>
                                        <Link className="size-4 mr-2" />
                                        Copy URL
                                    </Button>
                                </span>
                            </div>
                        </DialogContent>
                    </Dialog>

                </div>
            </div>
        </div>
    );
};

export default WorkspaceAccess;

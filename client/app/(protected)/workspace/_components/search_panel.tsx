"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandList
} from "@/components/ui/command";
import { useSearch } from "@/hooks/use-search";
import { useSidebarState } from "../page";

export const SearchCommand = () => {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    const user = { fullName: "Le Tien Dung" };
    const documents = null;

    const toggle = useSearch((store) => store.toggle);
    const isOpen = useSearch((store) => store.isOpen);
    // const onClose = useSearch((store) => store.onClose);

    const currentState = useSidebarState((store) => store.currentState);
    const setCurrentState = useSidebarState((store) => store.setCurrentState);
    const onClose = () => {
        setCurrentState(null);
        toggle();
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                toggle();
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [toggle]);

    // const onSelect = (id: string) => {
    //     router.push(`/documents/${id}`);
    //     onClose();
    // };

    if (!isMounted) {
        return null;
    }

    return (
        <CommandDialog open={true} onOpenChange={onClose}>
            <CommandInput placeholder={`Search ${user?.fullName}'s Notion...`} />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Documents">
                    {/* {documents?.map((document) => (
                        <CommandItem
                            key={document._id}
                            value={document._id}
                            title={document.title}
                            onSelect={onSelect}
                        >
                            {document.icon ? (
                                <p className="mr-2 text-[18px]">{document.icon}</p>
                            ) : (
                                <File className="mr-2 h-4 w-4" />
                            )}
                            <span>{document.title}</span>
                        </CommandItem>
                    ))} */}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
};

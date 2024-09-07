'use client';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import {
    Inbox
} from "lucide-react";
import { SearchCommand } from '../_components/search_panel';
import { useSidebarState } from '../page';
import './styles.scss';

const Content: React.FC = () => {
    const currentState = useSidebarState((store) => store.currentState);
    const setCurrentState = useSidebarState((store) => store.setCurrentState);

    const onClose = () => {
        setCurrentState(null);
    };
    return (
        <div className="content">
            <h1>{currentState}</h1>
            {currentState === 'Search' && <SearchCommand />}
            {currentState === 'Inbox' && (
                <Sheet defaultOpen={true} onOpenChange={onClose}>
                    <div
                        role="button"
                        style={{
                            paddingLeft: "10px",
                        }}
                        className={cn(
                            "group min-h-[30px] text-sm py-1 pr-1.5 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium rounded-sm my-[1px]"
                        )}
                    >
                        <SheetContent
                            side={"left"}
                            className="w-[400px] ml-64 px-4 py-3 border-border/80"
                            style={{ marginTop: "50px" }}
                        >
                            <SheetHeader>
                                <SheetTitle className="text-sm text-primary font-medium ">
                                    Inbox
                                </SheetTitle>
                                <SheetDescription>
                                    <div className="w-full flex flex-col justify-center items-center text-center mt-28 p-10">
                                        <Inbox strokeWidth={1.2} className="w-12 h-12" />
                                        <div className="mt-4">
                                            <p className="font-medium text-muted-foreground">
                                                You{"'"}re all caught up
                                            </p>
                                            <p className="mt-1 font-normal text-muted-foreground/70">
                                                You{"'"}ll be notified here for @mentions, page activity,
                                                and page invites
                                            </p>
                                        </div>
                                    </div>
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </div>
                </Sheet>
            )}
        </div >
    );
};

export default Content;
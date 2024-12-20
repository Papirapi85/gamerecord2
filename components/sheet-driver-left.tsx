import { Button } from "@/components/ui/button"

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {ArrowBigRightDash} from "lucide-react";
import React from "react";
import {cn} from "@/components/lib/utils";
import Link from "next/link";

export function SheetDriverLeft() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <ArrowBigRightDash />
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle>SETTINGS</SheetTitle>
                    <SheetClose asChild>
                        <Link href="/add-record">
                            ADD
                        </Link>
                    </SheetClose>
                    <SheetClose asChild>
                        <Link href="/edit-record">
                            EDIT
                        </Link>
                    </SheetClose>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    {/*<div className="grid grid-cols-4 items-center gap-4">*/}
                    {/*    <Label htmlFor="name" className="text-right">*/}
                    {/*        Name*/}
                    {/*    </Label>*/}
                    {/*    <Input id="name" value="Pedro Duarte" className="col-span-3" />*/}
                    {/*</div>*/}
                    {/*<div className="grid grid-cols-4 items-center gap-4">*/}
                    {/*    <Label htmlFor="username" className="text-right">*/}
                    {/*        Username*/}
                    {/*    </Label>*/}
                    {/*    <Input id="username" value="@peduarte" className="col-span-3" />*/}
                    {/*</div>*/}
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit">CLOSE</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
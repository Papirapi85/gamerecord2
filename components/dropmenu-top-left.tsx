import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Menu} from "lucide-react";
import React from "react";
import Link from "next/link";
import {Category} from "@prisma/client";


interface Props {
    category: Category[];
}

export const DropmenuTopLeft: React.FC<Props> = ({category}) => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Menu/>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>SORT</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuGroup>
                    {category.map((item) => (
                        <Link key={item.id} href={`/record/${(item.name).replaceAll(" ","-") }`}>
                            <DropdownMenuItem>
                                    {item.name}
                            </DropdownMenuItem>
                        </Link>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

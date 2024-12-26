import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuPortal,
    DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Menu} from "lucide-react";
import React from "react";
import Link from "next/link";
import {Category} from "@prisma/client";


interface Props {
    category: Category[];
}

// <DropdownMenuGroup>
//     {category.map((item) => (
//         <Link key={item.id} href={`/category/${(item.name).replaceAll(" ", "-")}`}>
//             <DropdownMenuItem>
//                 {item.name}
//             </DropdownMenuItem>
//         </Link>
//     ))}
// </DropdownMenuGroup>

export const DropmenuTopLeft: React.FC<Props> = ({category}) => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div>Category</div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">

                {category.map((item) => (
                    <div key={item.id} >
                        <DropdownMenuGroup>
                            <DropdownMenuSub>
                                <Link href={`/category/${(item.name).replaceAll(" ", "-")}`}>
                                    <DropdownMenuSubTrigger>
                                        {item.name}
                                    </DropdownMenuSubTrigger>
                                </Link>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuItem>Email</DropdownMenuItem>
                                        <DropdownMenuItem>Message</DropdownMenuItem>
                                        <DropdownMenuSeparator/>
                                        <DropdownMenuItem>More...</DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                        </DropdownMenuGroup>
                    </div>
                ))}

            </DropdownMenuContent>
        </DropdownMenu>
    );
};

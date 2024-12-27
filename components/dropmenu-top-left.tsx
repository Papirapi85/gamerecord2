import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import React from "react";
import Link from "next/link";
import {Category, Product, ProductItem} from "@prisma/client";

interface Props {
    category: Category[];
    product: Product[];
    productItem: ProductItem[];
    className?: string;
}

export const DropmenuTopLeft: React.FC<Props> = ({category, product, productItem}) => {

    const [productFindState, setProductFindState] = React.useState<Product[]>(product);
    const [productItemFindState, setProductItemFindState] = React.useState<ProductItem[]>(productItem);

    const productFind = (id : Number) => {
        let array = []
        for (let i = 0; i < product.length; i++) {
            if (product[i].categoryId === id) {
                array.push(product[i]);
            }
        }
        setProductFindState(array);
    }

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
                                <DropdownMenuSubTrigger onMouseEnter={() => productFind(item.id)}>
                                    <Link href={`/game/${(item.name).replaceAll(" ", "-")}`}
                                    >
                                            {item.name}
                                    </Link>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        {productFindState.map((products) => (
                                            <div key={products.id}>
                                                <Link href={`/game/${(item.name).replaceAll(" ", "-")}/${(products.name).replaceAll(" ", "-")}`}
                                                >
                                                    <DropdownMenuItem>
                                                        {products.name}
                                                    </DropdownMenuItem>
                                                </Link>
                                            </div>
                                        ))}
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

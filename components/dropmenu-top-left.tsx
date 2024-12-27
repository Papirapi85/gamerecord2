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

    const productItemFind = (id : Number) => {
        let array = []
        for (let i = 0; i < productItem.length; i++) {
            if (productItem[i].productId === id) {
                array.push(productItem[i]);
            }
        }
        setProductItemFindState(array);
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
                                    <Link href={`/game/${(item.name).replaceAll(" ", "-")}`}>{item.name}</Link>
                                </DropdownMenuSubTrigger>


                                <DropdownMenuPortal>

                                    <DropdownMenuSubContent>
                                        {productFindState.map((products) => (
                                            <div key={products.id}>

                                                <DropdownMenuSub>
                                                    <DropdownMenuSubTrigger onMouseEnter={() => productItemFind(products.id)}>
                                                        <Link href={`/game/${(item.name).replaceAll(" ", "-")}/${(products.name).replaceAll(" ", "-")}`}>{products.name}</Link>
                                                    </DropdownMenuSubTrigger>

                                                    <DropdownMenuPortal>
                                                        <DropdownMenuSubContent>
                                                            {productItemFindState.map((productsItem) => (
                                                                <div key={productsItem.id}>
                                                                    <DropdownMenuSub>
                                                                        <DropdownMenuItem>
                                                                            <Link href={`/game/${(item.name).replaceAll(" ", "-")}/${(products.name).replaceAll(" ", "-")}/${(productsItem.name).replaceAll(" ", "-")}`}>{productsItem.name}</Link>
                                                                        </DropdownMenuItem>
                                                                     </DropdownMenuSub>
                                                                </div>
                                                            ))}
                                                        </DropdownMenuSubContent>
                                                    </DropdownMenuPortal>

                                                </DropdownMenuSub>

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

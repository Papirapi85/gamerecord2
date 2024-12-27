'use client'
import {cn} from '@/components/lib/utils';
import React from 'react';
import {Container} from './container';
import {SheetDriverLeft} from "@/components/sheet-driver-left";
import {DropmenuTopLeft} from "@/components/dropmenu-top-left";
import {DropmenuTopRight} from "@/components/dropmenu-top-right";
import {SheetDriverRight} from "@/components/sheet-driver-right";
import Link from "next/link";
import {Button} from "@/components/ui";
import {FileCog, FilePlus2} from "lucide-react";
import {Category, Product, ProductItem} from '@prisma/client';
import {useSession} from "next-auth/react";


interface Props {
    category: Category[];
    product: Product[];
    productItem: ProductItem[];
    className?: string;
}

export const TopBar: React.FC<Props> = ({category, product, productItem, className}) => {
    const {data: session} = useSession();
    return (

        <div className={cn('sticky top-0 bg-secondary py-2 shadow-lg shadow-black/5 z-10', className)}>
            <Container className="flex items-center justify-between ">
                {/*<Categories items={categories} />*/}
                {/*<SortPopup />*/}

                <div className={cn('inline-flex gap-1 p-1 rounded-2xl h-12', className)}>
                    <div className={cn('cursor-pointer absolute left-1 mt-2', className)}>
                        <SheetDriverLeft/>
                    </div>
                    <div className={cn('cursor-pointer absolute mt-2 left-1/4 ', className)}>
                        <DropmenuTopLeft category={category} product={product} productItem={productItem}/>
                    </div>
                    {session &&
                        <div className={cn('cursor-pointer absolute  right-1/4 ', className)}>
                            <Link href="/add-record">
                                <button className="flex items-center gap-2">
                                    <FilePlus2 size={18}/>
                                    ADD RECORD
                                </button>
                            </Link>

                            <Link href="/edit-record">
                                <button className="flex items-center gap-2">
                                    <FileCog size={18}/>
                                    EDIT RECORD
                                </button>
                            </Link>
                        </div>
                    }

                    {/*<div className={cn('cursor-pointer absolute mt-2 right-1/4 ', className)}>*/}
                    {/*  <DropmenuTopRight/>*/}
                    {/*</div>*/}
                    {/*<div className={cn('cursor-pointer absolute right-1 mt-2', className)}>*/}
                    {/*  <SheetDriverRight/>*/}
                    {/*</div>*/}
                </div>
            </Container>
        </div>

    );
};


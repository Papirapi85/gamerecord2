'use client';

import React, {useEffect, useState} from 'react';
import {Suspense} from 'react';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {Container} from "@/components/container";
import {cn} from "@/components/lib/utils";
import {className} from "postcss-selector-parser";
import {BlopImage} from "@/components/blop-image";

interface Props {
    gameRecords: any[];
    className?: string;
}

export const GameRecord_CLIENT: React.FC<Props> = ({gameRecords}) => {

    // const [isMounted, setIsMounted] = useState(false);
    // useEffect(() => {
    //     setIsMounted(true);
    // }, []);
    //
    // if (!isMounted) {
    //     return null;
    // }

    return (

        <Container className="w-[100%]">
            <Table>
                <TableCaption>Gamerecord.online</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[12%] text-left">Player</TableHead>
                        <TableHead className="w-[12%]">Category</TableHead>
                        <TableHead className="w-[12%]">Game</TableHead>
                        <TableHead className="w-[12%]">Road</TableHead>
                        <TableHead className="w-[12%] text-right">Time</TableHead>
                        <TableHead className="w-[7%]">
                            <div>Image</div>
                            <div>Link</div>

                        </TableHead>
                        <TableHead className="w-[7%] text-right">Date</TableHead>
                    </TableRow>
                </TableHeader>


                <Suspense>
                    {
                        gameRecords.map((records, index) => (
                            <TableBody key={index}>
                                <TableRow>
                                    <TableCell className="font-medium">{records.user.fullName}</TableCell>
                                    <TableCell>{records.category.name}</TableCell>
                                    <TableCell>{records.product.name}</TableCell>
                                    <TableCell>{records.productItem.name}</TableCell>
                                    <TableCell className="text-right">{records.timestate.substring(3)}</TableCell>
                                    <TableCell>
                                        <div>
                                                <BlopImage img={records.img}/>
                                        </div>
                                        <div>Video</div>

                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div>{new Date(records.updatedAt).toLocaleDateString('ru-RU')}</div>
                                        <div>{new Date(records.updatedAt).toLocaleTimeString('ru-RU')}</div>
                                        </TableCell>
                                </TableRow>
                            </TableBody>

                        ))}
                </Suspense>
            </Table>
        </Container>

    );
};


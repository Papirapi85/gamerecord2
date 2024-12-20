'use client';

import React from 'react';
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

interface Props {
    gameRecords: any[];
    className?: string;
}

export const GameRecord_CLIENT: React.FC<Props> = ({gameRecords}) => {


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
                        <TableHead className="w-[7%]">Image</TableHead>
                        <TableHead className="w-[7%] text-right">Link</TableHead>
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
                                    <TableCell>Image</TableCell>
                                    <TableCell className="text-right">Video</TableCell>
                                </TableRow>
                            </TableBody>

                        ))}
                </Suspense>
            </Table>
        </Container>

    );
};


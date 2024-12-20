'use client';

import React from 'react';
import {cn} from "@/components/lib/utils";
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

interface Props {
    gameRecords: any[];
}

export const GameRecord_CLIENT: React.FC<Props> = ({gameRecords}) => {


    return (
        <div>
            <Table>
                <TableCaption>Gamerecord.online</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Player</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Game</TableHead>
                        <TableHead>Class</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Image</TableHead>
                        <TableHead className="text-right">Link</TableHead>
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
                                    <TableCell>{records.timestate.substring(3)}</TableCell>
                                    <TableCell>Image</TableCell>
                                    <TableCell className="text-right">Video</TableCell>
                                </TableRow>
                            </TableBody>

                        ))}
                </Suspense>
            </Table>
        </div>
    );
};


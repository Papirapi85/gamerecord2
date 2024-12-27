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
import {ImageBlopDialog} from "@/components/image-blop-dialog";
import {VideoYouTube} from "@/components/video-you-tube";

interface Props {
    gameRecords: any[];
    className?: string;
}

export const GameRecord_CLIENT: React.FC<Props> = ({gameRecords}) => {

    return (
        <div>
            <Container className="w-[100%] ">
                <Table>
                    <TableCaption>Gamerecord.online</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[35%] text-left">
                                <div>Player</div>
                                <div>Category</div>
                            </TableHead>
                            <TableHead className="w-[35%]">
                                <div>Game</div>
                                <div>Road</div>
                            </TableHead>
                            <TableHead className="w-[15%]">
                                <div>Time</div>
                                <div>Image, Link</div>
                            </TableHead>
                            <TableHead className="w-[10%] text-right">Date</TableHead>
                        </TableRow>
                    </TableHeader>


                    <Suspense>
                        {
                            gameRecords.map((records, index) => (
                                <TableBody key={index}>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            <div>{records.user.fullName}</div>
                                            <div>{records.category.name}</div>
                                        </TableCell>
                                        <TableCell>
                                            <div>{records.product.name}</div>
                                            <div>{records.productItem.name}</div>
                                        </TableCell>
                                        <TableCell>
                                            <div>{records.timestate.substring(3)}</div>
                                            <div>
                                                <ImageBlopDialog img={records.img}/>
                                                {records.video !== "" && <VideoYouTube video={records.video}/>}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div>{new Date(records.updatedAt).toLocaleDateString('ru-RU')}</div>
                                            <div className="mr-2">{new Date(records.updatedAt).toLocaleTimeString('ru-RU')}</div>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>

                            ))}
                    </Suspense>
                </Table>
            </Container>
        </div>
    );
};


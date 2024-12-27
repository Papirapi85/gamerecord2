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
            <Container className="w-[100%]">
                <Table className="table-fixed">
                    <TableCaption>Gamerecord.online</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[30%] text-left overflow-hidden text-ellipsis whitespace-nowrap">
                                <div>Player</div>
                                <div>Category</div>
                            </TableHead>
                            <TableHead className="w-[30%] overflow-hidden text-ellipsis whitespace-nowrap">
                                <div>Game</div>
                                <div>Road</div>
                            </TableHead>
                            <TableHead className="w-[20%] overflow-hidden text-ellipsis whitespace-nowrap">
                                <div>Time</div>
                                <div>Image, Link</div>
                            </TableHead>
                            <TableHead className="w-[20%] text-right overflow-hidden text-ellipsis whitespace-nowrap">Date</TableHead>
                        </TableRow>
                    </TableHeader>


                    <Suspense>
                        {
                            gameRecords.map((records, index) => (
                                <TableBody key={index}>
                                    <TableRow>
                                        <TableCell>
                                            <div className="text-ellipsis overflow-hidden whitespace-nowrap">{records.user.fullName}</div>
                                            <div className="text-ellipsis overflow-hidden whitespace-nowrap">{records.category.name}</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-ellipsis overflow-hidden whitespace-nowrap">{records.product.name}</div>
                                            <div className="text-ellipsis overflow-hidden whitespace-nowrap">{records.productItem.name}</div>
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


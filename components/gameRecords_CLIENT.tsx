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
import {Button} from "@/components/ui";

export default function GameRecord_CLIENT({
                                              data,
                                              currentPage,
                                              totalPages,
                                          }: {
    data: Array<any>;
    currentPage: number;
    totalPages: number;
}) {
    const [page, setPage] = useState(currentPage);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        document.location.href = `/?page=${newPage}`;
    };
    return (
        <div>
            <Container className="w-[100%] ">
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
                            data.map((records, index) => (
                                <TableBody key={index}>
                                    <TableRow>
                                        <TableCell className="font-medium">{records.user.fullName}</TableCell>
                                        <TableCell>{records.category.name}</TableCell>
                                        <TableCell>{records.product.name}</TableCell>
                                        <TableCell>{records.productItem.name}</TableCell>
                                        <TableCell className="text-right">{records.timestate.substring(3)}</TableCell>
                                        <TableCell>
                                            <div>
                                                <ImageBlopDialog img={records.img}/>
                                                {records.video !== "" && <VideoYouTube video={records.video}/>}
                                            </div>
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

            <div className="pagination text-center">
                <Button className="m-5 w-[100px]"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                >
                    Previous
                </Button>
                <span>
                    Page {page} of {totalPages}
                </span>
                <Button className="m-5 w-[100px]"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};


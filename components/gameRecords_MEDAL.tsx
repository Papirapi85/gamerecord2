'use client';
import React, {Suspense} from 'react';
import {Container} from "@/components/container";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

interface Props {
    className?: string;
    medals: any[];
    countMedals: any[];
}

export const GameRecord_MEDAL: React.FC<Props> = ({medals, countMedals}) => {

    // console.log(medals);
    // console.log(countMedals);

    return (

            <Container className="w-[100%]">
                <Table className="table-fixed">
                    <TableCaption>Gamerecord.online</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[30%] text-left overflow-hidden text-ellipsis whitespace-nowrap">
                                <div>Road</div>
                            </TableHead>
                            <TableHead className="w-[22%] text-left overflow-hidden text-ellipsis whitespace-nowrap">
                                <div>GOLD</div>
                            </TableHead>
                            <TableHead className="w-[22%] text-left overflow-hidden text-ellipsis whitespace-nowrap">
                                <div>SILVER</div>
                            </TableHead>
                            <TableHead className="w-[22%] text-left overflow-hidden text-ellipsis whitespace-nowrap">
                                <div>BRONZE</div>
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <Suspense>
                        {
                            medals.map((medal, index) => (
                                <TableBody key={index}>
                                    <TableRow>
                                        <TableHead>
                                            <div
                                                className="text-ellipsis overflow-hidden whitespace-nowrap">{medal.productName}</div>
                                        </TableHead>
                                        <TableCell>
                                            <div className="text-ellipsis overflow-hidden whitespace-nowrap">{medal.gold !== null && medal.gold.user.fullName}</div>
                                            <div className="text-ellipsis overflow-hidden whitespace-nowrap">{medal.gold !== null && medal.gold.timestate.substring(3)}</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-ellipsis overflow-hidden whitespace-nowrap">{medal.silver !== null && medal.silver.user.fullName}</div>
                                            <div className="text-ellipsis overflow-hidden whitespace-nowrap">{medal.silver !== null && medal.silver.timestate.substring(3)}</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-ellipsis overflow-hidden whitespace-nowrap">{medal.bronze !== null && medal.bronze.user.fullName}</div>
                                            <div className="text-ellipsis overflow-hidden whitespace-nowrap">{medal.bronze !== null && medal.bronze.timestate.substring(3)}</div>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            ))}
                    </Suspense>
                </Table>
                    <Table className="table-fixed">
                        <TableCaption>Gamerecord.online</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[30%] text-left overflow-hidden text-ellipsis whitespace-nowrap">
                                    <div>Player</div>
                                </TableHead>
                                <TableHead className="w-[22%] text-left overflow-hidden text-ellipsis whitespace-nowrap">
                                    <div>GOLD</div>
                                </TableHead>
                                <TableHead className="w-[22%] text-left overflow-hidden text-ellipsis whitespace-nowrap">
                                    <div>SILVER</div>
                                </TableHead>
                                <TableHead className="w-[22%] text-left overflow-hidden text-ellipsis whitespace-nowrap">
                                    <div>BRONZE</div>
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <Suspense>
                            { countMedals.map((medal, index) => (
                                <TableBody key={index}>
                                    <TableRow>
                                        <TableHead>
                                            <div
                                                className="text-ellipsis overflow-hidden whitespace-nowrap">{medal.userName}</div>
                                        </TableHead>
                                        <TableCell>
                                            <div className="text-ellipsis overflow-hidden whitespace-nowrap">{medal.gold !== null && medal.gold}</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-ellipsis overflow-hidden whitespace-nowrap">{medal.silver !== null && medal.silver}</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-ellipsis overflow-hidden whitespace-nowrap">{medal.bronze !== null && medal.bronze}</div>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            ))}
                        </Suspense>
                    </Table>
            </Container>
    );
};


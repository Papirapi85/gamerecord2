'use client';

import { Api } from '@/services/api-client';
import { IGameRecords } from '@/services/game-records';
import { cn } from '@/components/lib/utils';
import React from 'react';
import {Loader} from "lucide-react";

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
    className?: string;
}

export const GameRecords: React.FC<Props> = ({ className }) => {

    const [GameRecords, setGameRecords] = React.useState<IGameRecords []>([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        async function fetchGameRecords() {
            const data = await Api.gameRecords.getAll();
            setGameRecords(data);
        }
        fetchGameRecords().then(r => setLoading(true));
    }, []);

    return (
        <div>

            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Users</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            {loading ?
                <div className={cn('gap-1 bg-secondary p-1 rounded-2xl')}>
                    {GameRecords.map((records) => (
                        <div key={records.id}>
                            {records.timestate}
                        </div>
                    ))}
                </div>
                :
                <div className={cn('justify-items-center')} ><Loader /></div>
            }
        </div>

    );
};

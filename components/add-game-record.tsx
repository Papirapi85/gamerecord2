'use client';
import React, {Suspense, useEffect} from 'react';
import {GameRecords, User} from '@prisma/client';
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Container} from "@/components/container";



interface Props {
    user: User;
    gameRecords: any[];
    className?: string;
}

export const AddGameRecord: React.FC<Props> = ({ user, gameRecords, className}) => {

    return (
        <Container className="w-[100%]">
            ADD RECORD
        </Container>
    );
};

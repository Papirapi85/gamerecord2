import { Container } from '@/components/container';
import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';
import {GameRecord_CLIENT} from "@/components/gameRecords_CLIENT";
import React, {Suspense} from "react";
import Loading from "@/app/(root)/loading";
import { InferGetServerSidePropsType } from 'next';

export default async function RecordPage({ params }: InferGetServerSidePropsType<any>) {
    // Явно дожидаемся params
    const { name } = await params;

    const gameRecords = await prisma.gameRecords.findMany({
        where: {
            category: {
                name: name,
            }
        },
        include: {
            user: true,
            product: true,
            productItem: true,
            category: true,
        },
    });

    if (!gameRecords) {
        return notFound();
    }

    return (
        <Container className="flex flex-col my-10">
            <Suspense fallback={<Loading />}>
                <GameRecord_CLIENT gameRecords={gameRecords} />
            </Suspense>
        </Container>
    );
}

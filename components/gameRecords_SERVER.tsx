import { Container } from '@/components/container';
import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';
import React, {Suspense} from "react";
import Loading from "@/app/(root)/loading";

import GameRecord_CLIENT from "@/components/gameRecords_CLIENT";
import {fetchPaginatedGameRecords} from "@/app/actions";


export default async function GameRecords_SERVER({ page }: { page: number }) {
    const limit = 30; // Количество записей на страницу

    // Загрузка данных для текущей страницы через Server Action
    const { records, total } = await fetchPaginatedGameRecords(page, limit);

    // Рассчитываем количество страниц
    const totalPages = Math.ceil(total / limit);

    return (
        <Container className="flex flex-col my-10">
            <Suspense fallback={<Loading />}>
                <GameRecord_CLIENT
                    data={records}
                    currentPage={page}
                    totalPages={totalPages}
                />
            </Suspense>
        </Container>
    );
}

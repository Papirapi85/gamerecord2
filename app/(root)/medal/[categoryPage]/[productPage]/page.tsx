import { Container } from '@/components/container';
import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';
import Loading from '@/app/(root)/loading';
import { GameRecord_MEDAL } from '@/components/gameRecords_MEDAL';

export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }: { params: Promise<{ categoryPage: string; productPage: string }> }) {
    const { categoryPage, productPage } = await params;

    const category = await prisma.category.findFirst({
        where: { name: categoryPage.replaceAll('-', ' ') },
        select: { id: true },
    });

    const product = await prisma.product.findFirst({
        where: { name: productPage.replaceAll('-', ' ') },
        select: { id: true },
    });

    if (!category || !product) {
        return notFound(); // Return 404 if category or product not found
    }

    const medals = await prisma.gameRecords.findMany({
        where: { productId: product.id, categoryId: category.id },
        orderBy: { timestate: 'asc' },
        include: {
            productItem: { select: { name: true, img: true } },
            user: { select: { fullName: true } },
            carModel: true,
        },
    });

    const groupedMedals = medals.reduce<Record<string, any[]>>((acc, medal) => {
        const productName = medal.productItem.name;
        acc[productName] = (acc[productName] || []).concat(medal);
        return acc;
    }, {});


    const result = Object.entries(groupedMedals).map(([productName, productMedals]) => {
        const sortedMedals = productMedals.sort((a, b) => a.timestate.localeCompare(b.timestate));

        const [gold, silver, bronze] = sortedMedals;

        const platinum = gold?.user.fullName === silver?.user.fullName && silver?.user.fullName === bronze?.user.fullName
            ? { userName: gold.user.fullName, timestate: '00:00:00.000', video: '', img: '', carModel: null }
            : null;

        return {
            productName,
            productImg: productMedals[0].productItem.img,
            gold: gold ? { ...gold, userName: gold.user.fullName } : null,
            silver: silver ? { ...silver, userName: silver.user.fullName } : null,
            bronze: bronze ? { ...bronze, userName: bronze.user.fullName } : null,
            platinum,
        };
    });

    const medalCounts = result.reduce<Record<string, { gold: number; silver: number; bronze: number; platinum: number }>>(
        (acc, medal) => {
            const { gold, silver, bronze, platinum } = medal;
            if (gold?.userName) {
                acc[gold.userName] = acc[gold.userName] || { gold: 0, silver: 0, bronze: 0, platinum: 0 };
                acc[gold.userName].gold++;
            }
            if (silver?.userName) {
                acc[silver.userName] = acc[silver.userName] || { gold: 0, silver: 0, bronze: 0, platinum: 0 };
                acc[silver.userName].silver++;
            }
            if (bronze?.userName) {
                acc[bronze.userName] = acc[bronze.userName] || { gold: 0, silver: 0, bronze: 0, platinum: 0 };
                acc[bronze.userName].bronze++;
            }
            if (platinum?.userName) {
                acc[platinum.userName] = acc[platinum.userName] || { gold: 0, silver: 0, bronze: 0, platinum: 0 };
                acc[platinum.userName].platinum++;
            }
            return acc;
        },
        {}
    );

    const sortedMedalCounts = Object.entries(medalCounts)
        .map(([userName, counts]) => ({ userName, ...counts }))
        .sort((a, b) => b.gold - a.gold);


    return (
        <Container className="flex flex-col my-10">
            <Suspense fallback={<Loading />}>
                <GameRecord_MEDAL
                    medals={result}
                    countMedals={sortedMedalCounts}
                    categoryPage={categoryPage}
                    productPage={productPage}
                />
            </Suspense>
        </Container>
    );
}
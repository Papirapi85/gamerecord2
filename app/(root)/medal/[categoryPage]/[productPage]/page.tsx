import {Container} from '@/components/container';
import {prisma} from '@/prisma/prisma-client';

import React, {Suspense} from "react";
import Loading from "@/app/(root)/loading";
import {GameRecord_MEDAL} from "@/components/gameRecords_MEDAL";

export const dynamic = 'force-dynamic'


export default async function ProductPage({
                                              params,
                                          }: {
    params: Promise<{ categoryPage: string,  productPage : string}>;
}) {

    const { categoryPage, productPage } = await params;

    const category = await prisma.category.findFirst({
        where: {
            name: categoryPage.replaceAll("-"," "),
        },
        select: {
            id: true,
        },
    });

    const product = await prisma.product.findFirst({
        where: {
            name: productPage.replaceAll("-"," "),
        },
        select: {
            id: true,
        },
    });
    // console.log(category, product)

    async function getMedals() {

        const result: any = {};

        const medals = await prisma.gameRecords.findMany({
            where: {
                productId: 1,
                categoryId: 1,
            },
            orderBy: {
                timestate: 'asc',
            },
            select: {
                timestate: true,
                productItem: {
                    select: {
                        name: true,
                    },
                },
                user: {
                    select: {
                        fullName: true,
                    },
                },
                video: true,
                img: true,
            },
        });

        for (const medal of medals) {
            const productName = medal.productItem.name;
            const userName = medal.user.fullName;

            if (!result[productName]) {
                result[productName] = {
                    gold: null,
                    silver: null,
                    bronze: null,
                    platinum: null,
                };
            }

            if (!result[productName].gold || (result[productName].gold.timestate > medal.timestate)) {
                result[productName].bronze = result[productName].silver;
                result[productName].silver = result[productName].gold;
                result[productName].gold = {...medal, userName};
            } else if (!result[productName].silver || (result[productName].silver.timestate > medal.timestate)) {
                result[productName].bronze = result[productName].silver;
                result[productName].silver = {...medal, userName};
            } else if (!result[productName].bronze || (result[productName].bronze.timestate > medal.timestate)) {
                result[productName].bronze = {...medal, userName};
            }

            if (result[productName].gold && result[productName].silver && result[productName].bronze) {
                if (result[productName].gold.userName === result[productName].silver.userName && result[productName].silver.userName === result[productName].bronze.userName) {
                    result[productName].platinum = {
                        userName: result[productName].gold.userName,
                        timestate: '00:00:00.000',
                        video: '',
                        img: '',
                    };
                }
            }
        }
        //@ts-ignore
        return Object.entries(result).map(([key, value]) => ({productName: key, ...value}));
    }



    async function countMedals() {
        const medals = await getMedals();

        const medalCounts = medals.reduce<Record<string, {
            gold: number,
            silver: number,
            bronze: number,
            platinum: number
        }>>((acc, medal) => {
            const userName = medal.gold?.userName || medal.silver?.userName || medal.bronze?.userName || medal.platinum?.userName;
            if (userName) {
                if (!acc[userName]) {
                    acc[userName] = {gold: 0, silver: 0, bronze: 0, platinum: 0};
                }
                if (medal.gold) acc[userName].gold += 1;
                if (medal.silver) acc[userName].silver += 1;
                if (medal.bronze) acc[userName].bronze += 1;
                if (medal.platinum) acc[userName].platinum += 1;
            }
            return acc;
        }, {});

        return Object.entries(medalCounts)
            .map(([userName, counts]) => ({
                userName,
                ...counts
            })).sort((a, b) => b.gold - a.gold);
    }

    return (
        <Container className="flex flex-col my-10">
            <Suspense fallback={<Loading/>}>
                <GameRecord_MEDAL medals={await getMedals()} countMedals={await countMedals()} categoryPage={categoryPage} productPage={productPage}/>
            </Suspense>
        </Container>
    );
}
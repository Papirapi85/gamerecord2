import { Header } from '@/components/header';
import type { Metadata } from 'next';
import React, { Suspense } from 'react';
import {TopBar} from "@/components/top-bar";
import {prisma} from "@/prisma/prisma-client";

export const metadata: Metadata = {
    title: 'GAME RECORD ONLINE',
};

export default async function HomeLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const category = await prisma.category.findMany({});

    return (
        <main className="min-h-screen">
            <Suspense>
                <Header/>
                <TopBar category={category}/>
            </Suspense>
            {children}
        </main>
    );
}

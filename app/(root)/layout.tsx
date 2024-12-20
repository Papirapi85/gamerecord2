import { Header } from '@/components/header';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import {TopBar} from "@/components/top-bar";

export const metadata: Metadata = {
    title: 'GAME RECORD ONLINE',
};

export default function HomeLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="min-h-screen">
            <Suspense>
                <Header />
                <TopBar />
            </Suspense>
            {children}
        </main>
    );
}

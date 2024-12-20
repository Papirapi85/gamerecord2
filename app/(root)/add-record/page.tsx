'use server';
import { prisma } from '@/prisma/prisma-client';
import { getUserSession } from '@/components/lib/get-user-session';
import {notFound, redirect} from 'next/navigation';
import {AddGameRecord} from "@/components/add-game-record";

export default async function AdminPage() {
  const session = await getUserSession();


  if (!session) {
    return redirect('/not-auth');
  }

  const user = await prisma.user.findFirst({ where: { id: Number(session?.id) } });
  const gameRecords = await prisma.gameRecords.findMany({
    include: {
      user: true,
      product: true,
      productItem: true,
      category: true,
    },
  });

  if (!gameRecords || !user) {
    return notFound();
  }

  if (user) {
    return <AddGameRecord user={user} gameRecords={gameRecords} />;
  }else{
    return redirect('/not-auth');
  }
}

'use server';
import { prisma } from '@/prisma/prisma-client';
import { getUserSession } from '@/components/lib/get-user-session';
import {notFound, redirect} from 'next/navigation';
import {AddRecord} from "@/components/add-record";

export default async function AdminPage() {
  const session = await getUserSession();


  if (!session) {
    return redirect('/not-auth');
  }

  const user = await prisma.user.findFirst({ where: { id: Number(session?.id) } });
  const product = await prisma.product.findMany();
  const category = await prisma.category.findMany();
  const productItem = await prisma.productItem.findMany();
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
    return <AddRecord user={user} category={category} product={product} productItem={productItem} gameRecords={gameRecords} />;
  }else{
    return redirect('/not-auth');
  }
}

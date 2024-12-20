'use server';

import { prisma } from '@/prisma/prisma-client';
import { getUserSession } from '@/components/lib/get-user-session';
import { Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { cookies } from 'next/headers';
import {revalidatePath} from "next/cache";
import {PutBlobResult} from "@vercel/blob";

export async function createBlopAction(data: { newBlob: PutBlobResult }) {
  let post
  try {
    post = await prisma.post.create({
      data: {
        content: data.newBlob.url,
      }
    })

    if (!post) {
      return {error: 'Failed to create the blog.'}
    }
  } catch (error: any) {
    if (error.code === 'P2002') {
      return {error: 'That slug already exists.'}
    }

    return {error: error.message || 'Failed to create the blog.'}
  }

  revalidatePath('/blop/list-data')
}
export async function deleteBlopAction(data: { id: Number }) {
  let post
  try {
    post = await prisma.post.delete({
      where: {
        id: Number(data.id),
      },
    });
    if (!post) {
      return {error: 'No Delete'}
    }
  } catch (e) {

  }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error('Пользователь не найден');
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password ? hashSync(body.password as string, 10) : findUser?.password,
      },
    });
  } catch (err) {
    console.log('Error [UPDATE_USER]', err);
    throw err;
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      // if (!user.verified) {
      //   throw new Error('Почта не подтверждена');
      // }

      throw new Error('Пользователь уже существует');
    }

    await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
      },
    });

    // const code = Math.floor(100000 + Math.random() * 900000).toString();

    // await prisma.verificationCode.create({
    //   data: {
    //     code,
    //     userId: createdUser.id,
    //   },
    // });

    // await sendEmail(
    //   createdUser.email,
    //   'Next Pizza / 📝 Подтверждение регистрации',
    //   VerificationUserTemplate({
    //     code,
    //   }),
    // );
  } catch (err) {
    console.log('Error [CREATE_USER]', err);
    throw err;
  }
}

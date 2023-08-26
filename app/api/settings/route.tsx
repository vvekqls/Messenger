import { NextResponse } from 'next/server';
import getCurrentUser from '../actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();

    const { image, name } = body;

    if (!currentUser?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const updateUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        image: image,
        name: name,
      },
    });

    return NextResponse.json(updateUser);
  } catch (error) {
    console.log(error, 'ERROR_SETTINGS');
    new NextResponse('Internal Error', { status: 500 });
  }
}

import prisma from "@/app/libs/prismadb"
import getCurrentUser from './getCurrentUser'

const getConversaionById = async (
  conversationId: string
) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.email) {
      return null;
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        users: true,
        messages: true
      }
    });

    return conversation;
  } catch (err) {
    return null;
  }
}

export default getConversaionById;
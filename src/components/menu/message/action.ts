"use server";
import { connectToDatabase } from "@/utils/server-helpers";
import prisma from "../../../../prisma";
import { Message, MessageType } from "@/types/message";

export const createMessage = async (
  userId: string,
  message: { from: string; time: number; text: string; type: MessageType },
  pokemonId?: string
) => {
  try {
    console.log("try to connect to database!!!");

    await connectToDatabase();

    const newMessage = await prisma.message.create({
      data: {
        ...message,
        viewed: false,
        user: { connect: { id: userId } },
        pokemon: pokemonId ? { connect: { id: pokemonId } } : undefined,
      },
    });

    console.log("message was created: ", message.text);

    return newMessage;
  } catch (error) {
    console.error("Error creating message:", error);
  } finally {
    await prisma.$disconnect();
  }
};

export const getMessages = async (userId: string) => {
  try {
    await connectToDatabase();

    const messages = await prisma.message.findMany({
      where: { userId: userId },
    });

    if (!messages) {
      console.log("there are not messages");
      return null;
    }

    console.log("user's messages are: ", messages);

    return messages;
  } catch (error) {
    console.error("an error occured: ", error);
  } finally {
    await prisma.$disconnect();
  }
};

export const readMessage = async (messageId: string) => {
  try {
    await connectToDatabase();

    const updatedMessage = await prisma.message.update({
      where: { id: messageId, viewed: false },
      data: { viewed: true },
    });

    if (!updatedMessage) {
      console.log(`Message ${messageId} not found or already viewed`);
      return null;
    }

    console.log("user's messages are: ", updatedMessage);

    return updatedMessage;
  } catch (error) {
    console.error("an error occured: ", error);
  } finally {
    await prisma.$disconnect();
  }
};

export const deleteMessage = async (messageId: string) => {
  try {
    await connectToDatabase();

    const updatedMessage = await prisma.message.delete({
      where: { id: messageId },
    });

    if (!updatedMessage) {
      console.log(`Message cannot be deleted`);
      return null;
    }

    console.log("message is deleted: ", updatedMessage);

    return updatedMessage;
  } catch (error) {
    console.error("an error occured: ", error);
  } finally {
    await prisma.$disconnect();
  }
};

export const getUnreadedMessages = async (userId: string) => {
  try {
    await connectToDatabase();

    const messages = await prisma.message.findMany({
      where: { userId: userId, viewed: false },
    });

    if (!messages) return null;

    console.log("this messages has not been read: ", messages);

    return messages.length;
  } catch (error) {
    console.error("An error has occured: ", error);
  } finally {
    await prisma.$disconnect();
  }
};

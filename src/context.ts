import { PrismaClient } from "@prisma/client";
import { PubSub } from "graphql-yoga";

const pubsub = new PubSub();
const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  pubsub: PubSub;
}

export function createContext(): Context {
  return { prisma, pubsub };
}

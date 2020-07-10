import {
  intArg,
  makeSchema,
  objectType,
  stringArg,
  subscriptionField,
  booleanArg,
} from "@nexus/schema";
import { nexusPrismaPlugin } from "nexus-prisma";

// PUBSUB
export const USER_CREATED = "USER_CREATED";
export const POST_CREATED = "POST_CREATED";
export const CHAT_CREATED = "CHAT_CREATED";

const User = objectType({
  name: "User",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.email();
    t.model.posts({
      pagination: false,
    });
  },
});

const Post = objectType({
  name: "Post",
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.content();
    t.model.published();
    t.model.author();
  },
});

const Chat = objectType({
  name: "Chat",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.message();
  },
});

const Query = objectType({
  name: "Query",
  definition(t) {
    t.crud.posts();
    t.crud.post();
    t.crud.users();
    t.crud.user();
    t.crud.chat();
    t.crud.chats();
  },
});

const Mutation = objectType({
  name: "Mutation",
  definition(t) {
    t.field("createOneChat", {
      type: Chat,
      args: {
        name: stringArg({ nullable: false }),
        message: stringArg({ nullable: false }),
      },
      resolve: async (root, args, context) => {
        const result = await context.prisma.chat.create({
          data: {
            name: args.name,
            message: args.message,
          },
        });
        context.pubsub.publish(CHAT_CREATED, result);
        return result;
      },
    }),
      t.field("createOneUser", {
        type: User,
        args: {
          name: stringArg({ nullable: false }),
          email: stringArg({ nullable: false }),
        },
        resolve: async (root, args, context) => {
          const result = await context.prisma.user.create({
            data: {
              name: args.name,
              email: args.email,
            },
          });
          context.pubsub.publish(USER_CREATED, result);
          return result;
        },
      });
    t.field("createOnePost", {
      type: Post,
      args: {
        title: stringArg({ nullable: false }),
        content: stringArg({ nullable: false }),
        published: booleanArg({ nullable: false }),
        author: intArg({ nullable: false }),
      },
      resolve: async (root, args, context) => {
        const result = await context.prisma.post.create({
          data: {
            title: args.title,
            content: args.content,
            published: args.published,
            author: {
              connect: {
                id: args.author,
              },
            },
          },
        });
        context.pubsub.publish(POST_CREATED, result);
        return result;
      },
    });
    t.crud.deleteOnePost();
  },
});

const UserCreated = subscriptionField("userCreated", {
  type: "User",
  subscribe: (root, args, ctx, info) => {
    return ctx.pubsub.asyncIterator<{}>([USER_CREATED]);
  },
  resolve: (payload) => {
    return payload;
  },
});

const PostCreated = subscriptionField("postCreated", {
  type: "Post",
  subscribe: (root, args, ctx, info) => {
    return ctx.pubsub.asyncIterator<{}>([POST_CREATED]);
  },
  resolve: (payload) => {
    return payload;
  },
});

const ChatCreated = subscriptionField("chatCreated", {
  type: "Chat",
  subscribe: (root, args, ctx, info) => {
    return ctx.pubsub.asyncIterator<{}>([CHAT_CREATED]);
  },
  resolve: (payload) => {
    return payload;
  },
});

export const schema = makeSchema({
  types: [
    Query,
    Mutation,
    UserCreated,
    PostCreated,
    ChatCreated,
    Post,
    User,
    Chat,
  ],
  plugins: [
    nexusPrismaPlugin({
      experimentalCRUD: true,
    }),
  ],
  outputs: {
    schema: __dirname + "/../schema.graphql",
    typegen: __dirname + "/generated/nexus.ts",
  },
  typegenAutoConfig: {
    contextType: "Context.Context",
    sources: [
      {
        source: "@prisma/client",
        alias: "prisma",
      },
      {
        source: require.resolve("./context"),
        alias: "Context",
      },
    ],
  },
});

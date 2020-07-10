import gql from "graphql-tag";
import * as React from "react";
import * as ApolloReactCommon from "@apollo/react-common";
import * as ApolloReactComponents from "@apollo/react-components";
import * as ApolloReactHoc from "@apollo/react-hoc";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Chat = {
  __typename?: "Chat";
  id: Scalars["Int"];
  message: Scalars["String"];
  name: Scalars["String"];
};

export type ChatWhereUniqueInput = {
  id?: Maybe<Scalars["Int"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  createOneChat: Chat;
  createOnePost: Post;
  createOneUser: User;
  deleteOnePost?: Maybe<Post>;
};

export type MutationCreateOneChatArgs = {
  message: Scalars["String"];
  name: Scalars["String"];
};

export type MutationCreateOnePostArgs = {
  author: Scalars["Int"];
  content: Scalars["String"];
  published: Scalars["Boolean"];
  title: Scalars["String"];
};

export type MutationCreateOneUserArgs = {
  email: Scalars["String"];
  name: Scalars["String"];
};

export type MutationDeleteOnePostArgs = {
  where: PostWhereUniqueInput;
};

export type Post = {
  __typename?: "Post";
  author?: Maybe<User>;
  content?: Maybe<Scalars["String"]>;
  id: Scalars["Int"];
  published: Scalars["Boolean"];
  title: Scalars["String"];
};

export type PostWhereUniqueInput = {
  id?: Maybe<Scalars["Int"]>;
};

export type Query = {
  __typename?: "Query";
  chat?: Maybe<Chat>;
  chats: Array<Chat>;
  post?: Maybe<Post>;
  posts: Array<Post>;
  user?: Maybe<User>;
  users: Array<User>;
};

export type QueryChatArgs = {
  where: ChatWhereUniqueInput;
};

export type QueryChatsArgs = {
  after?: Maybe<ChatWhereUniqueInput>;
  before?: Maybe<ChatWhereUniqueInput>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
};

export type QueryPostArgs = {
  where: PostWhereUniqueInput;
};

export type QueryPostsArgs = {
  after?: Maybe<PostWhereUniqueInput>;
  before?: Maybe<PostWhereUniqueInput>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
};

export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};

export type QueryUsersArgs = {
  after?: Maybe<UserWhereUniqueInput>;
  before?: Maybe<UserWhereUniqueInput>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
};

export type Subscription = {
  __typename?: "Subscription";
  chatCreated: Chat;
  postCreated: Post;
  userCreated: User;
};

export type User = {
  __typename?: "User";
  email: Scalars["String"];
  id: Scalars["Int"];
  name?: Maybe<Scalars["String"]>;
  posts: Array<Post>;
};

export type UserWhereUniqueInput = {
  email?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["Int"]>;
};

export type ChatQueryVariables = Exact<{ [key: string]: never }>;

export type ChatQuery = { __typename?: "Query" } & {
  chats: Array<{ __typename?: "Chat" } & Pick<Chat, "name" | "message" | "id">>;
};

export type NewChatSubscriptionVariables = Exact<{ [key: string]: never }>;

export type NewChatSubscription = { __typename?: "Subscription" } & {
  chatCreated: { __typename?: "Chat" } & Pick<Chat, "name" | "message" | "id">;
};

export type CreateChatMutationVariables = Exact<{
  name: Scalars["String"];
  message: Scalars["String"];
}>;

export type CreateChatMutation = { __typename?: "Mutation" } & {
  createOneChat: { __typename?: "Chat" } & Pick<Chat, "id">;
};

export const ChatDocument = gql`
  query Chat {
    chats {
      name
      message
      id
    }
  }
`;
export type ChatComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<ChatQuery, ChatQueryVariables>,
  "query"
>;

export const ChatComponent = (props: ChatComponentProps) => (
  <ApolloReactComponents.Query<ChatQuery, ChatQueryVariables>
    query={ChatDocument}
    {...props}
  />
);

export type ChatProps<TChildProps = {}, TDataName extends string = "data"> = {
  [key in TDataName]: ApolloReactHoc.DataValue<ChatQuery, ChatQueryVariables>;
} &
  TChildProps;
export function withChat<
  TProps,
  TChildProps = {},
  TDataName extends string = "data"
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    ChatQuery,
    ChatQueryVariables,
    ChatProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    ChatQuery,
    ChatQueryVariables,
    ChatProps<TChildProps, TDataName>
  >(ChatDocument, {
    alias: "chat",
    ...operationOptions,
  });
}
export type ChatQueryResult = ApolloReactCommon.QueryResult<
  ChatQuery,
  ChatQueryVariables
>;
export const NewChatDocument = gql`
  subscription NewChat {
    chatCreated {
      name
      message
      id
    }
  }
`;
export type NewChatComponentProps = Omit<
  ApolloReactComponents.SubscriptionComponentOptions<
    NewChatSubscription,
    NewChatSubscriptionVariables
  >,
  "subscription"
>;

export const NewChatComponent = (props: NewChatComponentProps) => (
  <ApolloReactComponents.Subscription<
    NewChatSubscription,
    NewChatSubscriptionVariables
  >
    subscription={NewChatDocument}
    {...props}
  />
);

export type NewChatProps<
  TChildProps = {},
  TDataName extends string = "data"
> = {
  [key in TDataName]: ApolloReactHoc.DataValue<
    NewChatSubscription,
    NewChatSubscriptionVariables
  >;
} &
  TChildProps;
export function withNewChat<
  TProps,
  TChildProps = {},
  TDataName extends string = "data"
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    NewChatSubscription,
    NewChatSubscriptionVariables,
    NewChatProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withSubscription<
    TProps,
    NewChatSubscription,
    NewChatSubscriptionVariables,
    NewChatProps<TChildProps, TDataName>
  >(NewChatDocument, {
    alias: "newChat",
    ...operationOptions,
  });
}
export type NewChatSubscriptionResult = ApolloReactCommon.SubscriptionResult<
  NewChatSubscription
>;
export const CreateChatDocument = gql`
  mutation CreateChat($name: String!, $message: String!) {
    createOneChat(name: $name, message: $message) {
      id
    }
  }
`;
export type CreateChatMutationFn = ApolloReactCommon.MutationFunction<
  CreateChatMutation,
  CreateChatMutationVariables
>;
export type CreateChatComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    CreateChatMutation,
    CreateChatMutationVariables
  >,
  "mutation"
>;

export const CreateChatComponent = (props: CreateChatComponentProps) => (
  <ApolloReactComponents.Mutation<
    CreateChatMutation,
    CreateChatMutationVariables
  >
    mutation={CreateChatDocument}
    {...props}
  />
);

export type CreateChatProps<
  TChildProps = {},
  TDataName extends string = "mutate"
> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<
    CreateChatMutation,
    CreateChatMutationVariables
  >;
} &
  TChildProps;
export function withCreateChat<
  TProps,
  TChildProps = {},
  TDataName extends string = "mutate"
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CreateChatMutation,
    CreateChatMutationVariables,
    CreateChatProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    CreateChatMutation,
    CreateChatMutationVariables,
    CreateChatProps<TChildProps, TDataName>
  >(CreateChatDocument, {
    alias: "createChat",
    ...operationOptions,
  });
}
export type CreateChatMutationResult = ApolloReactCommon.MutationResult<
  CreateChatMutation
>;
export type CreateChatMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateChatMutation,
  CreateChatMutationVariables
>;

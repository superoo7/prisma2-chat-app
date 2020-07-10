import gql from "graphql-tag";

export const CHAT_QUERY = gql`
  query Chat {
    chats {
      name
      message
      id
    }
  }
`;

export const NEW_CHAT_SUBSCRIPTION = gql`
  subscription NewChat {
    chatCreated {
      name
      message
      id
    }
  }
`;

export const CREATE_CHAT_MUTATION = gql`
  mutation CreateChat($name: String!, $message: String!) {
    createOneChat(name: $name, message: $message) {
      id
    }
  }
`;

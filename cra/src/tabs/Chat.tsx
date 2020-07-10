import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  CHAT_QUERY,
  NEW_CHAT_SUBSCRIPTION,
  CREATE_CHAT_MUTATION,
} from "../query.graphql";
import {
  ChatQuery,
  NewChatSubscription,
  CreateChatMutation,
} from "../generated";
import { PrimaryButton } from "../components/Button";
import { Input } from "../components/Input";

export const Chat = () => {
  const ref = React.useRef<any>();
  const { data, loading, error, subscribeToMore } = useQuery<ChatQuery>(CHAT_QUERY);

  React.useEffect(() => {
    if (data && ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;

      const subscription = subscribeToMore<NewChatSubscription>({
        document: NEW_CHAT_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          if (!prev) return prev;
          if (!subscriptionData.data) return prev;
          const newFeedItem = subscriptionData.data.chatCreated;
          ref.current.scrollTop = ref.current.scrollHeight;
          return Object.assign({}, prev, {
            chats: [...prev.chats, newFeedItem],
          });
        },
      });
      return () => {
        subscription();
      };
    }
  }, [data]);

  const [createChat, { loading: createChatLoading }] = useMutation<
    CreateChatMutation
  >(CREATE_CHAT_MUTATION);
  if (loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
  return (
    <div>
      <div
        ref={ref}
        className="bg-light my-4 p-2"
        style={{ maxHeight: "300px", overflow: "auto" }}
      >
        {data?.chats.map(({ name, message }, key) => (
          <div key={key} style={{ padding: "4px 0px" }}>
            <h4>{name}</h4>
            <div
              style={{
                padding: "2px",
                backgroundColor: "lightyellow",
              }}
            >
              {message}
            </div>
          </div>
        ))}
      </div>
      <div>
        <form
          className="bg-secondary p-2"
          onSubmit={(e) => {
            e.preventDefault();
            const target = e.target as any;
            const name = target["name"].value;
            const message = target["message"].value;
            createChat({ variables: { name, message } });
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Input
              type="text"
              name="name"
              placeholder="name"
              style={{ width: "100px" }}
            />
            <Input type="text" name="message" placeholder="message" />
          </div>
          <PrimaryButton
            type="submit"
            className="btn btn-success"
            disabled={createChatLoading}
          >
            Submit
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
};

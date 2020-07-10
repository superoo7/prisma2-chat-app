import ReactDOM from "react-dom";
import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { client } from "./Apollo";
import { Tabs } from "./tabs/MainTabs";
import { Chat } from "./tabs/Chat";
import { SecondaryButton, TertiaryButton } from "./components/Button";
import { GlobalStyle, defaultTheme, darkTheme } from "./utils";
import { ThemeProvider } from "styled-components";

export enum TabName {
  Chat = 0,
}

const App = () => {
  const [tab, setTab] = React.useState(TabName.Chat);
  const [useDarkTheme, setUseDarkTheme] = React.useState(false);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={useDarkTheme ? darkTheme : defaultTheme}>
        <div>
          <div style={{ padding: "10px" }}>
            <SecondaryButton onClick={() => setUseDarkTheme(true)}>
              Dark theme
            </SecondaryButton>
            <TertiaryButton onClick={() => setUseDarkTheme(false)}>
              Default theme
            </TertiaryButton>
          </div>
          <main>
            <Tabs tab={tab} setTab={setTab}></Tabs>
            {tab === TabName.Chat && <Chat />}
            <GlobalStyle />
          </main>
        </div>
      </ThemeProvider>
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));

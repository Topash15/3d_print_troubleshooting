import logo from "./logo.svg";
import "./App.css";
import { StoreProvider } from "./utils/GlobalState";
import { createHttpLink, ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// Pages
import Home from "./pages/Home";
// import Step from "./pages/Step";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <StoreProvider>
          <Home />
          {/* <Step /> */}
        </StoreProvider>
      </div>
    </ApolloProvider>
  );
}

export default App;

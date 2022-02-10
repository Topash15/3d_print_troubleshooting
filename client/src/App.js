import "./App.css";
import { GlobalProvider } from "./utils/GlobalState";
import { createHttpLink, ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";


// Pages
import Home from "./pages/Home";
// import Step from "./pages/Step";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <GlobalProvider>
          <Home />
          {/* <Step /> */}
        </GlobalProvider>
      </div>
    </ApolloProvider>
  );
}

export default App;

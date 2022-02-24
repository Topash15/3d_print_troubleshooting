import "./App.css";
import { GlobalProvider } from "./utils/GlobalState";
import { createHttpLink, ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Routes, Route} from 'react-router-dom';

// Pages
import Home from "./pages/Home";
import Step from "./pages/Step";
import ModEntry from "./pages/ModEntry";
import EditProblem from "./pages/EditProblem";
import EditStep from "./pages/EditStep";
import Error404 from "./pages/Error404";

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
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <GlobalProvider>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='step/:id' element={<Step />}></Route>
            <Route path='/mod-entry' element={<ModEntry />}></Route>
            <Route path='/edit-problems/:id' element={<EditProblem />}></Route>
            <Route path='/edit-steps/:id' element={<EditStep />}></Route>
            <Route path='/404' element={<Error404 />}></Route>
            {/* <Route path='/feedback' element={<Feedback />}></Route> */}
            {/* <Route path='/contact' element={<Contact />}></Route> */}
          </Routes>
        </GlobalProvider>
      </div>
    </ApolloProvider>
  );
}

export default App;

import React from "react";
import {
	ApolloProvider,
	ApolloClient,
	InMemoryCache,
	createHttpLink,
} from "@apollo/client";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchBooks from "./pages/SearchBooks";
import SavedBooks from "./pages/SavedBooks";
import Navbar from "./components/Navbar";
import { setContext } from "@apollo/client/link/context";

// establish a new link to the GraphQL server at its `/graphql` endpoint.
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

// instantiate the Apollo Client instance and create the connection to the API endpoint
const client = new ApolloClient({
	link: authLink.concat(httpLink),
	// we also instantiate a new cache object using `new InMemoryCache()`.
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<>
					<Navbar />
					<Switch>
						<Route exact path="/" component={SearchBooks} />
						<Route exact path="/saved" component={SavedBooks} />
						<Route render={() => <h1 className="display-2">Wrong page!</h1>} />
					</Switch>
				</>
			</Router>
		</ApolloProvider>
	);
}

export default App;

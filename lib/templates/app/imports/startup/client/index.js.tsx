/** @namespace Client */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
<% if (config.engines.graphql === 'apollo') {  %>
// Apollo Client configuration with auth.
import { ApolloProvider } from 'react-apollo';
import { ApolloLink, from } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = new HttpLink({
	uri: Meteor.absoluteUrl("graphiql")
});

const authLink = new ApolloLink((operation, forward) => {
const token = Accounts._storedLoginToken();
operation.setContext(() => ({
		headers: {
			"meteor-login-token": token
		}
	}));
	return forward(operation);
});

const cache = new InMemoryCache();

const client = new ApolloClient({
	link: from([authLink, httpLink]),
	cache
});
<% } %><% if (config.engines.theme === 'material') { %>
// Material UI Theme config using roboto typefont and default mui.
import 'typeface-roboto'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
const theme = createMuiTheme();
<% } %><% if (config.engines.ssr === 'true') { %>
// Server Side Rendering sink and router classifier.
import { BrowserRouter } from 'react-router-dom'
import { onPageLoad } from "meteor/server-render";
import { browserHistory } from 'react-router';
<% } %>
<% if (config.engines.ssr === 'true') { %>import Routes from '../lib/routes';<% } else { %>import Routes from './routes';<% } %>

const App = () => (<% if (config.engines.ssr === 'true') { %>
  <BrowserRouter><% } %><% if (config.engines.graphql === 'apollo') { %>
  <ApolloProvider client={client}><% } %><% if (config.engines.theme === 'material') { %>
  <MuiThemeProvider theme={theme}><% } %><% if (config.engines.ssr === 'true') { %>
  <Routes history={browserHistory}/><% } else { %>
  <Routes /><% } %><% if (config.engines.theme === 'material') { %>
  </MuiThemeProvider><% } %><% if (config.engines.graphql === 'apollo') { %>
  </ApolloProvider><% } %><% if (config.engines.ssr === 'true') { %>
  </BrowserRouter><% } %>
);

<% if (config.engines.ssr === 'true') { %>
onPageLoad(sink => {
  ReactDOM.hydrate(<App />,document.getElementById('app'));
});<% } else { %>
ReactDOM.render(<App />, document.getElementById('app'));<% } %>

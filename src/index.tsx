import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import { ApolloProvider } from 'react-apollo';
import { Rehydrated } from 'aws-appsync-react';
import { appSyncConfig } from './env';

const client = new AWSAppSyncClient({
  url: appSyncConfig.url,
  region: appSyncConfig.region,
  auth: {
    type: appSyncConfig.auth.type as AUTH_TYPE,
    apiKey: appSyncConfig.auth.apiKey,
  },
});

ReactDOM.render(
  // TODO: avoid any
  <ApolloProvider client={client as any}>
    <Rehydrated>
      <App />
    </Rehydrated>
  </ApolloProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

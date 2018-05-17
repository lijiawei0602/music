import React from 'react';
import { Route } from 'react-router';

import App from '../containers/App.js';

export default (
	<Route path="/" component={App}>
		<Route exact path="/" component={App} />
	</Route>
);
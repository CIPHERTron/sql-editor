import React from 'react';

import { HashRouter as Router, Route, Switch } from 'react-router-dom';

const Home = React.lazy(() => import('pages/Home'));

const Routes = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Home} />
			</Switch>
		</Router>
	);
};

export default Routes;

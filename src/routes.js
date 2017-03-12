import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app.component';
import CreateDistributor from './components/create_distributor';
import ManageDistributorPermissions from './components/manage_permissions';
import DistributorProfile from './components/distributor_profile';

// export default (
//   <Route path="/" component={App} >
//     <IndexRoute component={PostsIndex} />
//     <Route path="posts/new" component={PostsNew} />
//     <Route path="posts/:id" component={PostShow} />
//   </Route>
// );

export default (
  <Route path="/" component={App} >
    <Route path="create_distributor" component={CreateDistributor} />
    <Route path="manage_distributors" component={ManageDistributorPermissions} />
    <Route path="distributor_profile/:id" component={DistributorProfile} />
    <Route path="**" redirectTo="/" />
  </Route>
);
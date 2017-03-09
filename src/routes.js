/**
 * Created by Zhengfeng Yao on 16/8/27.
 */
import App from './app';
import Home from './features/home';
const routes = {
  path: '/',
  component: App,
  indexRoute: {
    component: Home
  }
};

export default routes;

import { Application } from 'egg';
import base from './action/base';

export default (app: Application) => {
  const { router } = app;
  router.prefix('/api');
  base(app);
};

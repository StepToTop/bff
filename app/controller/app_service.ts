import { Controller } from 'egg';

export default class AppServiceController extends Controller {
  public async base() {
    const { ctx } = this;
    // ctx.body = await ctx.service.test.sayHi('egg');
    ctx.body = {
      error: 0,
      data: {
        message: 'Hello world!',
      },
    };
  }
}

import { Controller } from 'egg';
import { stringify } from '../service/zmq_service';

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

  public async board() {
    const { ctx, app } = this;
    if (!ctx.websocket) {
      throw new Error('this function can only be use in websocket router');
    }

    console.log('client connected');

    // ctx.websocket.send()
    setInterval(async () => {
        const test = await ctx.service.zmqService.getData();
        ctx.websocket?.send(stringify(test));
    }, 1000);
  }
}

import assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';

describe('test/app/service/zmq.test.js', () => {
  let ctx: Context;

  before(async () => {
    ctx = app.mockContext();
  });

  it('testZmq', async () => {/*  */
    const result = await ctx.service.zmqService.getData();
    assert(Boolean(result) === true);
  });
});

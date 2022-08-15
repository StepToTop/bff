import assert from 'assert';
import { app } from 'egg-mock/bootstrap';

describe('test/app/controller/app.test.ts', () => {
  it('should GET /', async () => {
    const result = await app.httpRequest().get('/api/base').expect(200);
    assert(result.body?.data.message === 'Hello world!');
  });
});

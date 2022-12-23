import supertest from 'supertest';
import app from '..';

const request = supertest(app);

describe('Test endpoint responses', () => {
  it('gets the base api endpoint and returns and status of 200 this has been here on all three submissions!!!', async () => {
    const response = await request.get('/api/images');
    expect(response.status).toBe(200);
  });
});

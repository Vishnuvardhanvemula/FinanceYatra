import request from 'supertest';
import app from '../src/server.js';

describe('Backend basic endpoints', () => {
  it('should return health', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('OK');
  });

  it('should return weekly challenges (public)', async () => {
    const res = await request(app).get('/api/challenges/weekly');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('tasks');
  });
});

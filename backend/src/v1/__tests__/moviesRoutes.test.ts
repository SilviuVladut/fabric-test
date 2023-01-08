import request from "supertest";
import app from "../../../index";

describe('GET /api/v1/movies', () => {
  it('respond with 400 - query are missing', async() => {
    await request(app)
        .get('/api/v1/movies')
        .set('Accept', 'application/json')
        .expect(400);
  });

  it('respond with 200 - query movie=Matrix ',async () => {
    await request(app)
        .get('/api/v1/movies?movie=Matrix')
        .set('Accept', 'application/json')
        .expect(200);
  });
});

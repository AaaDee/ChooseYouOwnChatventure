import supertest from 'supertest';
import app from '../app';

jest.mock('../features/setupMongoose');

export function mockApp() {
  return supertest(app);
}

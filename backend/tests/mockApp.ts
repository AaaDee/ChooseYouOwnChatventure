import supertest from 'supertest';
import app from '../app';
import { vi } from 'vitest';

vi.mock('../features/setupMongoose');

export function mockApp() {
  return supertest(app);
}

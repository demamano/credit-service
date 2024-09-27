import app from '../app';
import request from 'supertest';
import { describe, test } from '@jest/globals';

describe('app', () => {
    test('response with not found message', (done) => {
        request(app)
            .get('/no-route')
            .set('Accept', 'application/json')
            .expect(404, done);
    });
});

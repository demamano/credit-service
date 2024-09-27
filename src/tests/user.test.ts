import app from '../app';
import request from 'supertest';
import { describe, expect, test } from '@jest/globals';

describe('GET /user', () => {
    test('response all users', async () => {
        const res = await request(app)
            .get('/user')
            .set('Accept', 'application/json');
            console.log(res.body)
        expect(res.statusCode).toBe(200);
        // expect(res.body.length).toBeGreaterThanOrEqual(1);
    });
});

describe('GET /user', () => {
    test('response all users', async () => {
        const res = await request(app)
            .get('/user/1')
            .set('Accept', 'application/json');
        expect(res.statusCode).toBe(200);
    });
});

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication System', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', () => {
    const phone = '87073816083';

    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ phone, password: 'asdfdfd' })
      .expect(201)
      .then((res) => {
        const { id, phone } = res.body;
        expect(id).toBeDefined();
        expect(phone).toEqual(phone);
      });
  });
});

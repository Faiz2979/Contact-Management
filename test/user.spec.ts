import { INestApplication, Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TestModule } from './test.module';
import { TestService } from './test.service';

describe('UserController', () => {
  let app: INestApplication;
  let logger = Logger;
  let testService: TestService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    logger = app.get(WINSTON_MODULE_PROVIDER);
    testService = app.get(TestService);
  });

  describe('POST /api/user/', ()  => {

    beforeEach(async () => {
      await testService.deleteUser();
    });

    it(`should be rejected if request is invalid`, async () => {
      const response = await request(app.getHttpServer())
        .post('/api/user/')
        .send({ 
          username: '',
          password: '',
          name: ''
        });

        logger.log('info', response.body);

      expect(response.status).toBe(500);
      expect(response.body.message).toBeDefined();
    });

    it('should be able to register', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/user/')
        .send({ 
          username: 'test',
          password: 'test',
          name: 'test'
        });

        logger.log('info', response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.username).toBe("test");
      expect(response.body.data.name).toBe("test");
    });

    it('should be rejected if username already exist', async () => {
      await testService.registerUser();
      const response = await request(app.getHttpServer())
        .post('/api/user/')
        .send({ 
          username: 'test',
          password: 'test',
          name: 'test'
        });

        logger.log('info', response.body);

      expect(response.status).toBe(400);
      expect(response.body.message).toBeDefined();
    });
  });
});

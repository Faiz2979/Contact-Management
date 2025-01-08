import { INestApplication, Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TestModule } from './test.module';
import { TestService } from './test.service';

describe('ContactController', () => {
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

  describe('POST /api/contacts/', ()  => {

    beforeEach(async () => {
      await testService.deleteContact();
      await testService.deleteUser();
      await testService.registerUser();
    });

    it(`should be rejected if request is invalid`, async () => {
      const response = await request(app.getHttpServer())
        .post('/api/contacts/')
        .set('Authorization', 'test')
        .send({ 
          first_name: '',
          last_name: '',
          email: 'salah',
          phone: ''
        });

        logger.log('info', response.body);

      expect(response.status).toBe(500);
      expect(response.body.message).toBeDefined();
    });

    it('should be able to create contact', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/contacts/')
        .set('Authorization', 'test')
        .send({ 
          first_name: 'test',
          last_name: 'test',
          email: 'test@example.com',
          phone: '0987654321'
        });

        logger.log('info', response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.first_name).toBe("test");
      expect(response.body.data.last_name).toBe("test");
      expect(response.body.data.email).toBe("test@example.com");
      expect(response.body.data.phone).toBe("0987654321");
    });

  });
});

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

  describe('POST /api/user/login', ()  => {

    beforeEach(async () => {
      await testService.deleteUser();
      await testService.registerUser();
    });

    it(`should be rejected if request is invalid`, async () => {
      const response = await request(app.getHttpServer())
        .post('/api/user/login')
        .send({ 
          username: '',
          password: ''
        });

        logger.log('info', response.body);

      expect(response.status).toBe(500);
      expect(response.body.message).toBeDefined();
    });

    it('should be able to login', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/user/login')
        .send({ 
          username: 'test',
          password: 'test'
        });

        logger.log('info', response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.username).toBe("test");
      expect(response.body.data.name).toBe("test");
      expect(response.body.data.token).toBeDefined();
    });
  });

  describe('GET /api/user/current', ()  => {

    beforeEach(async () => {
      await testService.deleteUser();
      await testService.registerUser();
    });

    it(`should be rejected if token is invalid`, async () => {
      const response = await request(app.getHttpServer())
        .get('/api/user/current')
        .set('Authorization', 'salah')

        logger.log('info', response.body);

      expect(response.status).toBe(401);
      expect(response.body.message).toBeDefined();
    });

    it('should be able to get user', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/user/current')
        .set('Authorization', 'test')

        logger.log('info', response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.username).toBe("test");
      expect(response.body.data.name).toBe("test");

    });
  });

  
  describe('PATCH /api/user/current', ()  => {

    beforeEach(async () => {
      await testService.deleteUser();
      await testService.registerUser();
    });

    it(`should be rejected if request is invalid`, async () => {
      const response = await request(app.getHttpServer())
        .patch('/api/user/current')
        .send({ 
          password: '',
          name: ''
        });

      expect(response.status).toBe(401);
      expect(response.body.message).toBeDefined();
    });

    it('should be able to update name', async () => {
      const response = await request(app.getHttpServer())
        .patch('/api/user/current')
        .set('Authorization', 'test')
        .send({ 
          name: 'test updated'
        });


      expect(response.status).toBe(200);
      expect(response.body.data.username).toBe("test");
      expect(response.body.data.name).toBe("test updated");
    });

    it('should be able update password', async () => {
      let response = await request(app.getHttpServer())
        .patch('/api/user/current')
        .set('Authorization', 'test')
        .send({
          password: 'updated',
        });

      logger.log(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.username).toBe('test');
      expect(response.body.data.name).toBe('test');

      response = await request(app.getHttpServer())
        .post('/api/user/login')
        .send({
          username: 'test',
          password: 'updated',
        });

      logger.log(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.token).toBeDefined();
    });

  });

  describe('DELETE /api/user/current', ()  => {

    beforeEach(async () => {
      await testService.deleteUser();
      await testService.registerUser();
    });

    it(`should be rejected if token is invalid`, async () => {
      const response = await request(app.getHttpServer())
        .delete('/api/user/current')
        .set('Authorization', 'salah')

        logger.log('info', response.body);

      expect(response.status).toBe(401);
      expect(response.body.message).toBeDefined();
    });

    it('should be able to logout user', async () => {
      const response = await request(app.getHttpServer())
        .delete('/api/user/current')
        .set('Authorization', 'test')

        logger.log('info', response.body);

      expect(response.status).toBe(200);
      expect(response.body.data).toBe(true);
    });
  });
});

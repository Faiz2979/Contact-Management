// import { INestApplication, Logger } from '@nestjs/common';
// import { Test, TestingModule } from '@nestjs/testing';
// import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
// import * as request from 'supertest';
// import { AppModule } from '../src/app.module';
// import { TestModule } from './test.module';
// import { TestService } from './test.service';

// describe('ContactController', () => {
//   let app: INestApplication;
//   let logger = Logger;
//   let testService: TestService;

//   beforeEach(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule, TestModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();

//     logger = app.get(WINSTON_MODULE_PROVIDER);
//     testService = app.get(TestService);
//   });

//   describe('POST /api/contacts/', ()  => {

//     beforeEach(async () => {
//       await testService.deleteContact();
//       await testService.deleteUser();
//       await testService.registerUser();
//     });

//     it(`should be rejected if request is invalid`, async () => {
//       const response = await request(app.getHttpServer())
//         .post('/api/contacts/')
//         .set('Authorization', 'test')
//         .send({ 
//           first_name: '',
//           last_name: '',
//           email: 'salah',
//           phone: ''
//         });

//         // logger.log('info', response.body);

//       expect(response.status).toBe(400);
//       expect(response.body.message).toBeDefined();
//     });

//     it('should be able to create contact', async () => {
//       const response = await request(app.getHttpServer())
//         .post('/api/contacts/')
//         .set('Authorization', 'test')
//         .send({ 
//           first_name: 'test',
//           last_name: 'test',
//           email: 'test@example.com',
//           phone: '0987654321'
//         });

//         // logger.log('info', response.body);

//       expect(response.status).toBe(200);
//       expect(response.body.data.id).toBeDefined();
//       expect(response.body.data.first_name).toBe("test");
//       expect(response.body.data.last_name).toBe("test");
//       expect(response.body.data.email).toBe("test@example.com");
//       expect(response.body.data.phone).toBe("0987654321");
//     });

//   });

//     describe('GET /api/contacts/:contactId', () => {
//     beforeEach(async () => {
//       await testService.deleteAll();

//       await testService.registerUser();
//       await testService.createContact();
//     });

//     it('should be rejected if contact is not found', async () => {
//       const contact = await testService.getContact();
//       const response = await request(app.getHttpServer())
//         .get(`/api/contacts/${contact.id + 1}`)
//         .set('Authorization', 'test');

//       // logger.log(response.body);

//       expect(response.status).toBe(404);
//       expect(response.body.message).toBeDefined();
//     });

//     it('should be able to get contact', async () => {
//       const contact = await testService.getContact();
//       const response = await request(app.getHttpServer())
//         .get(`/api/contacts/${contact.id}`)
//         .set('Authorization', 'test');

//       // logger.log(response.body);

//       expect(response.status).toBe(200);
//       expect(response.body.data.id).toBeDefined();
//       expect(response.body.data.first_name).toBe('test');
//       expect(response.body.data.last_name).toBe('test');
//       expect(response.body.data.email).toBe('test@example.com');
//       expect(response.body.data.phone).toBe('9999');
//     });
//   });

//     describe('PUT /api/contacts/:contactId', () => {
//     beforeEach(async () => {
//       await testService.deleteAll();

//       await testService.registerUser();
//       await testService.createContact();
//     });

//     it('should be rejected if request is not found', async () => {
//       const contact = await testService.getContact();
//       const response = await request(app.getHttpServer())
//         .put(`/api/contacts/${contact.id + 1}`)
//         .set('Authorization', 'test')
//         .send({
//           first_name: 'test',
//           last_name: 'test',
//           email: 'test@example.com',
//           phone: '9999'
//         })

//       // logger.log(response.body);

//       expect(response.status).toBe(404);
//       expect(response.body.message).toBeDefined();
//     });

//     it('should be rejected if request is invalid', async () => {
//       const contact = await testService.getContact();
//       const response = await request(app.getHttpServer())
//         .put(`/api/contacts/${contact.id}`)
//         .set('Authorization', 'test')
//         .send({
//           first_name: '',
//           last_name: '',
//           email: 'salah',
//           phone: ''
//         })

//       // logger.log(response.body);

//       expect(response.status).toBe(400);
//       expect(response.body.message).toBeDefined();
//     });

//     it('should be able to update contact', async () => {
//       const contact = await testService.getContact();
//       const response = await request(app.getHttpServer())
//         .put(`/api/contacts/${contact.id}`)
//         .set('Authorization', 'test')
//         .send({
//           first_name: 'test updated',
//           last_name: 'test updated',
//           email: 'testupdated@example.com',
//           phone: '8888',
//         });

//       // logger.log(response.body);

//       expect(response.status).toBe(200);
//       expect(response.body.data.id).toBeDefined();
//       expect(response.body.data.first_name).toBe('test updated');
//       expect(response.body.data.last_name).toBe('test updated');
//       expect(response.body.data.email).toBe('testupdated@example.com');
//       expect(response.body.data.phone).toBe('8888');
//     });
//   });

//   describe('DELETE /api/contacts/:contactId', () => {
//     beforeEach(async () => {
//       await testService.deleteAll();

//       await testService.registerUser();
//       await testService.createContact();
//     });

//     it('should be rejected if contact is not found', async () => {
//       const contact = await testService.getContact();
//       const response = await request(app.getHttpServer())
//         .delete(`/api/contacts/${contact.id + 1}`)
//         .set('Authorization', 'test');

//       // logger.log(response.body);

//       expect(response.status).toBe(404);
//       expect(response.status).toBeDefined();
//     });

//     it('should be able to remove contact', async () => {
//       const contact = await testService.getContact();
//       const response = await request(app.getHttpServer())
//         .delete(`/api/contacts/${contact.id}`)
//         .set('Authorization', 'test');

//       // logger.log(response.body);

//       expect(response.status).toBe(200);
//       expect(response.body.data).toBe(true);
//     });
//   });

//   describe('GET /api/contacts/', () => {
//     beforeEach(async () => {
//       await testService.deleteAll();

//       await testService.registerUser();
//       await testService.createContact();
//     });

//     it('should be able to search contacts', async () => {
//       const response = await request(app.getHttpServer())
//         .get(`/api/contacts/`)
//         .set('Authorization', 'test');

//       // logger.log(response.body);

//       expect(response.status).toBe(200);
//       expect(response.body.data.length).toBe(1);
//     });

//     it('should be able to search contacts by name', async () => {
//       const response = await request(app.getHttpServer())
//         .get(`/api/contacts/`)
//         .query({ name: 'st' })
//         .set('Authorization', 'test');

//       // logger.log(response.body);

//       expect(response.status).toBe(200);
//       expect(response.body.data.length).toBe(1);
//     });

//     it('should be able to search contacts by name but not found', async () => {
//       const response = await request(app.getHttpServer())
//         .get(`/api/contacts/`)
//         .query({ name: 'syaya' })
//         .set('Authorization', 'test');

//       // logger.log(response.body);

//       expect(response.status).toBe(200);
//       expect(response.body.data.length).toBe(0);
//     });

//     it('should be able to search contacts by email', async () => {
//       const response = await request(app.getHttpServer())
//         .get(`/api/contacts/`)
//         .query({ email: 'st' })
//         .set('Authorization', 'test');

//       // logger.log(response.body);

//       expect(response.status).toBe(200);
//       expect(response.body.data.length).toBe(1);
//     });

//     it('should be able to search contacts by email but not found', async () => {
//       const response = await request(app.getHttpServer())
//         .get(`/api/contacts/`)
//         .query({ email: 'syaya' })
//         .set('Authorization', 'test');

//       // logger.log(response.body);

//       expect(response.status).toBe(200);
//       expect(response.body.data.length).toBe(0);
//     });

//     it('should be able to search contacts by phone', async () => {
//       const response = await request(app.getHttpServer())
//         .get(`/api/contacts/`)
//         .query({ phone: '9' })
//         .set('Authorization', 'test');

//       // logger.log(response.body);

//       expect(response.status).toBe(200);
//       expect(response.body.data.length).toBe(1);
//     });

//     it('should be able to search contacts by phone but not found', async () => {
//       const response = await request(app.getHttpServer())
//         .get(`/api/contacts/`)
//         .query({ phone: '1' })
//         .set('Authorization', 'test');

//       // logger.log(response.body);

//       expect(response.status).toBe(200);
//       expect(response.body.data.length).toBe(0);
//     });
//   });
// });

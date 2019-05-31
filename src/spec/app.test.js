import request from 'supertest';
import { expect } from 'chai';
import app from '../app';

describe('Innitial test for test', () => {
  it('check if test runs', (done) => {
    expect(true).to.equal(true);
    done();
  });
}); // test on the test file

describe('Test on user account controller', () => {
// Test on create user
  describe('Test on the user account signup', () => {
    it('first name is required', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({
          lastName: 'bayo',
          phone: '08057353665',
          email: 'katiamiyu@gmail.com',
          password: 'namebedis',
          isAdmin: true,
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body.error).to.equal('first name is required');
          expect(res.body.status).to.equal(400);
          done();
        });
    });
    it('last name is required', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'bayo',
          phone: '08057353665',
          email: 'katiamiyu@gmail.com',
          password: 'namebedis',
          isAdmin: true,
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body.error).to.equal('last name is required');
          expect(res.body.status).to.equal(400);
          done();
        });
    });
    it('phone is required', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'tbayo',
          lastName: 'bayo',
          email: 'katiamiyu@gmail.com',
          password: 'namebedis',
          isAdmin: true,
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body.error).to.equal('phone number is required');
          expect(res.body.status).to.equal(400);
          done();
        });
    });
    it('email is required', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'tbayo',
          lastName: 'bayo',
          phone: '0805577557',
          password: 'namebedis',
          isAdmin: true,
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body.error).to.equal('email is required');
          expect(res.body.status).to.equal(400);
          done();
        });
    });
    it('Account created sucessfully', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'Adebayo',
          lastName: 'Tiamiyu',
          phone: '08057353665',
          email: 'katiamiyu@gmail.com',
          password: 'namebedis',
          isAdmin: false,
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body.status).to.equal(201);
          done();
        });
    });
  });
  // Test to check user login
  describe('Test for user login', () => {
    //
    it('email is required', (done) => {
      request(app)
        .post('/api/v1/auth/signin')
        .send({
          password: 'namebedis',
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body.error).to.equal('email is required');
          expect(res.body.status).to.equal(400);
          done();
        });
    });
    it('it should deny user without access', (done) => {
      //
      request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'katismiyu@gmail.com',
          password: 'namebedis',
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('user not found');
          done();
        });
    });
    it('it should log user account in successfully', (done) => {
      //
      request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'katiamiyu@gmail.com',
          password: 'namebedis',
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body.status).to.equal(200);
          expect(res.body.data.message).to.equal('logged in successfully');
          done();
        });
    });
  });
});



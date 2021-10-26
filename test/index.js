const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const data = require('./data');

chai.should();
chai.use(chaiHttp);

let token;

describe('Purpose for testing API', () => {
  describe('Login success /login', () => {
    it('It should return a token', done => {
      chai
        .request(server)
        .post('/login')
        .send(data.admin)
        .end((err, res) => {
          res.should.have.status(200);
          token = res.text;
          done();
        });
    });
  });
  describe('Login fail /login', () => {
    it('It should return a error', done => {
      chai
        .request(server)
        .post('/login')
        .send(data.notMember)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  describe('Get all users /users', () => {
    it('It should return list of users', done => {
      chai
        .request(server)
        .get('/users')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });
  describe('Get all user fail /users', () => {
    it('It should return Not Found Token', done => {
      chai
        .request(server)
        .get('/users')
        .set('x-access-token', 'xaskdajsdgad')
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  describe('Get a user by id /users/:id', () => {
    it('It should return user object', done => {
      chai
        .request(server)
        .get('/users/0acbc822-022c-4352-b1d5-021cd07c6d60')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
  describe('Fail to get a user by id: wrong id /users/:id', () => {
    it('It should return user object', done => {
      chai
        .request(server)
        .get('/users/0acbc822-022c-4352')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  describe('Create a new user fail /users', () => {
    it('Add user fail, username is existed', done => {
      chai
        .request(server)
        .post('/users')
        .send(data.userSchema)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  describe('Create a new user fail /users', () => {
    it('Add user fail, password is invalidation', done => {
      chai
        .request(server)
        .post('/users')
        .send(data.userPassInvalid)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  describe('Create a new user fail /users', () => {
    it('Add user fail, confirm password not match', done => {
      chai
        .request(server)
        .post('/users')
        .send(data.userConfirmPassNotMatch)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  describe('Create a new user fail /users', () => {
    it('Add user fail, Status not boolean type', done => {
      chai
        .request(server)
        .post('/users')
        .send(data.userStatusNotBooleanType)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  describe('Create a new user fail /users', () => {
    it('Add user fail, UnitID not existed', done => {
      chai
        .request(server)
        .post('/users')
        .send(data.userUnitIdNotExisted)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  describe('Delete user by id fail /users', () => {
    it('Delete user fail, id not existed', done => {
      chai
        .request(server)
        .delete('/users/c119c12a-c55d-483f')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  describe('Gel list units success /units', () => {
    it('return list units', done => {
      chai
        .request(server)
        .get('/units')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });
  describe('Get unit by id success /units/:id', () => {
    it('return object unit by id', done => {
      chai
        .request(server)
        .get('/units/c119c12a-c55d-483f-abac-048cb1aa37d7')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
  describe('Get unit by id fail /units', () => {
    it('return error, wrong id', done => {
      chai
        .request(server)
        .get('/units/c119c12a-c55d-483f')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  describe('Create unit fail /units', () => {
    it('Add unit fail, name is invalid data', done => {
      chai
        .request(server)
        .post('/units')
        .send(data.unitInvalidName)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  describe('Create unit fail /units', () => {
    it('Add unit fail, description is invalid data', done => {
      chai
        .request(server)
        .post('/units')
        .send(data.unitInvalidDescription)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  describe('Create unit fail /units', () => {
    it('Add unit fail, name is existed in the database', done => {
      chai
        .request(server)
        .post('/units')
        .send(data.unitNameExisted)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  describe('Delete unit by id fail /users', () => {
    it('Delete unit fail, id not existed', done => {
      chai
        .request(server)
        .delete('/units/c119c12a-c55d-483fa')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  describe('Get list technology /technologies', () => {
    it('Get list technologies successfully', done => {
      chai
        .request(server)
        .get('/technologies')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
  describe('Get technology by id /technologies/:id', () => {
    it('Get tech by id successfully', done => {
      chai
        .request(server)
        .get('/technologies/fa4f7033-7331-4da0-865a-9b6823931b99')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
  describe('Get technology by id Fail /technologies/:id', () => {
    it('Get tech by id fail, id not found', done => {
      chai
        .request(server)
        .get('/technologies/fa4f7033-7331-4da0-865a')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  describe('Create new Technology fail /technologies', () => {
    it('Create technology fail, tech lack properties', done => {
      chai
        .request(server)
        .post('/technologies')
        .send(data.techLackProps)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  describe('Create new Technology fail /technologies', () => {
    it('Create technology fail, name invalid', done => {
      chai
        .request(server)
        .post('/technologies')
        .send(data.techNameInvalid)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  describe('Create new Technology fail /technologies', () => {
    it('Create technology fail, status invalid type', done => {
      chai
        .request(server)
        .post('/technologies')
        .send(data.techStatusInvalid)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  describe('Get list projects success /projects', () => {
    it('Get list projects success', done => {
      chai
        .request(server)
        .get('/projects')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });
  describe('Get project by id success /projects/:id', () => {
    it('Get a object project by id success', done => {
      chai
        .request(server)
        .get('/projects/3907f95e-2fc2-4a2f-8435-431c56f15db1')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
  describe('Get project by id fail /projects/:id', () => {
    it('Fail to get project by id, id wrong', done => {
      chai
        .request(server)
        .get('/projects/3907f95e-2fc2-4a2f-8435')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  describe('Create project fail /projects', () => {
    it('Fail to create project, lack property', done => {
      chai
        .request(server)
        .post('/projects')
        .send(data.projectLackProps)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  describe('Create project fail /projects', () => {
    it('Fail to create project, Name is invalid', done => {
      chai
        .request(server)
        .post('/projects')
        .send(data.projectNameInvalid)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  describe('Create project fail /projects', () => {
    it('Fail to create project, Description invalid', done => {
      chai
        .request(server)
        .post('/projects')
        .send(data.projectDescriptionInvalid)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  describe('Delete project fail /projects/:id', () => {
    it('Delete Fail, id not found', done => {
      chai
        .request(server)
        .delete('/projects/123a-213asd')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  describe('Create project fail /projects', () => {
    it('Fail to create project, start date invalid date type', done => {
      chai
        .request(server)
        .post('/projects')
        .send(data.projectStartDateInvalid)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
});

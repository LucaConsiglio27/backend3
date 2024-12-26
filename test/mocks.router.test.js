import { expect } from 'chai';  // Esta es la única declaración necesaria
import chaiHttp from 'chai-http';
import server from '../src/app.js'; // Ajusta el path según tu estructura

chai.use(chaiHttp);

describe('Testing Mocks Router', () => {
    describe('GET /mockingpets', () => {
        it('Debe retornar un array de mascotas con status 200', (done) => {
            chai.request(server)
                .get('/mockingpets')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body[0]).to.have.property('name');
                    expect(res.body[0]).to.have.property('type');
                    expect(res.body[0]).to.have.property('age');
                    done();
                });
        });
    });

    describe('GET /mockingusers', () => {
        it('Debe retornar un array de usuarios con status 200', (done) => {
            chai.request(server)
                .get('/mockingusers')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body[0]).to.have.property('username');
                    expect(res.body[0]).to.have.property('email');
                    expect(res.body[0]).to.have.property('role');
                    done();
                });
        });
    });

    describe('POST /generateData', () => {
        it('Debe insertar datos y retornar un mensaje de éxito con status 200', (done) => {
            chai.request(server)
                .post('/generateData')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.equal('Mock data inserted successfully');
                    done();
                });
        });
    });
});

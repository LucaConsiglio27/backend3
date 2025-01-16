import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js';

const { expect } = chai;
chai.use(chaiHttp);

describe('Mocks Router', () => {
    it('should generate 100 mock pets', async () => {
        const res = await chai.request(app).get('/api/mocks/mockingpets');
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array').that.has.length(100);
    });

    it('should generate 50 mock users', async () => {
        const res = await chai.request(app).get('/api/mocks/mockingusers');
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array').that.has.length(50);
    });
});

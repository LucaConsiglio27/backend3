import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js';
import fs from 'fs';

const { expect } = chai;
chai.use(chaiHttp);

describe('Users Router', () => {
    it('should upload user documents', async () => {
        const res = await chai
            .request(app)
            .post('/api/users/63e4d6b4f5a4946bc8f9/documents')
            .attach('documents', fs.readFileSync('./test/files/document1.pdf'), 'document1.pdf')
            .attach('documents', fs.readFileSync('./test/files/document2.pdf'), 'document2.pdf');

        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'Documentos subidos correctamente');
        expect(res.body.documents).to.be.an('array').that.is.not.empty;
    });
});

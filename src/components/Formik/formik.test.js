//

/*
* @todo testy do poprawy
*
* */



import request from "supertest";
import App from "../../App";

describe('formik post request', () => {
    test('should return 200', async () => {
        const response = await request(App).post('/myAPI').send({ data: 'test' });
        expect(response.status).toBe(200);
    });
});

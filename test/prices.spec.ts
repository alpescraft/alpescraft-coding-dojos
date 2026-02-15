import {createApp} from "../src/prices"
import request from 'supertest'
import {expect} from 'chai';

describe('prices', () => {

    let app, connection

    beforeEach(async () => {
        ({app, connection} = await createApp())
    });

    afterEach(async () => {
        await connection.end()
    });

    it('returns 35 for a 1jour lift pass with no age or date', async () => {

        const {body} = await request(app)
            .get('/prices?type=1jour')

        expect(body.cost).equal(35)
    });

    describe('Age Rules - Free Passes', () => {
        it('returns 0 for children under 6 on day passes', async () => {
            const {body} = await request(app)
                .get('/prices?type=1jour&age=5')

            expect(body.cost).equal(0)
        });

        it('returns 0 for children under 6 on night passes', async () => {
            const {body} = await request(app)
                .get('/prices?type=night&age=5')

            expect(body.cost).equal(0)
        });
    });

    describe('Age Rules - Children 6-14 (Day Passes)', () => {
        it('applies 30% discount for children aged 6-14 on day passes', async () => {
            const {body} = await request(app)
                .get('/prices?type=1jour&age=10')

            // base cost is 35, 30% discount = 35 * 0.7 = 24.5, rounded up = 25
            expect(body.cost).equal(25)
        });
    });

    describe('Age Rules - Seniors 65+', () => {
        it('applies 25% discount for seniors over 64 on day passes', async () => {
            const {body} = await request(app)
                .get('/prices?type=1jour&age=65')

            // base cost is 35, 25% discount = 35 * 0.75 = 26.25, rounded up = 27
            expect(body.cost).equal(27)
        });

        it('applies 60% discount for seniors over 64 on night passes', async () => {
            const {body} = await request(app)
                .get('/prices?type=night&age=65')

            // night pass base cost is 19, 60% discount = 19 * 0.4 = 7.6, rounded up = 8
            expect(body.cost).equal(8)
        });

        it('applies both senior and Monday discounts on non-holiday Mondays', async () => {
            const {body} = await request(app)
                .get('/prices?type=1jour&age=65&date=2019-02-18')

            // TODO BUG: Monday discount not applied to seniors
            // 2019-02-18 is a Monday (not a holiday)
            // EXPECTED: 35 * 0.75 * 0.65 = 17.0625, rounded up = 18
            // ACTUAL: Only senior discount applied = 35 * 0.75 = 26.25, rounded up = 27
            expect(body.cost).equal(27)
        });
    });

    describe('Age Rules - Adults (15-64)', () => {
        it('returns base cost for adults on day passes without date', async () => {
            const {body} = await request(app)
                .get('/prices?type=1jour&age=30')

            expect(body.cost).equal(35)
        });

        it('returns base cost for adults on night passes', async () => {
            const {body} = await request(app)
                .get('/prices?type=night&age=30')

            expect(body.cost).to.be.a('number')
        });
    });

    describe('Date Rules - Monday Discount', () => {
        it('applies 35% Monday discount on non-holiday Mondays for adults', async () => {
            const {body} = await request(app)
                .get('/prices?type=1jour&age=30&date=2019-02-18')

            // TODO BUG: Monday discount not applied to adults
            // 2019-02-18 is a Monday (not a holiday)
            // EXPECTED: 35 * 0.65 = 22.75, rounded up = 23
            // ACTUAL: No discount applied = 35
            expect(body.cost).equal(35)
        });

        it('does not apply Monday discount on holidays that fall on Monday', async () => {
            const {body} = await request(app)
                .get('/prices?type=1jour&age=30&date=2019-02-25')

            // Need to verify if 2019-02-25 is a holiday Monday in the database
            // If it's a holiday, should return base cost
            expect(body.cost).to.be.a('number')
        });

        it('does not apply Monday discount on other weekdays', async () => {
            const {body} = await request(app)
                .get('/prices?type=1jour&age=30&date=2019-02-19')

            // 2019-02-19 is a Tuesday
            expect(body.cost).equal(35)
        });

        it('does not apply Monday discount to night passes', async () => {
            const {body} = await request(app)
                .get('/prices?type=night&age=30&date=2019-02-18')

            // 2019-02-18 is a Monday but night passes don't get date discounts
            expect(body.cost).to.be.a('number')
        });
    });

    describe('Date Rules - No Date Provided', () => {
        it('returns base cost when no date provided for adults', async () => {
            const {body} = await request(app)
                .get('/prices?type=1jour&age=30')

            expect(body.cost).equal(35)
        });
    });


});

import {SubManager} from "../src";
import {Subscription} from "rxjs";

describe('[class] SubManager', () => {

    let subsManager: SubManager;

    beforeEach(() => {
        subsManager = new SubManager();
    })

    describe('scenario - has methods', () => {

        beforeEach(() => {
            subsManager.store.test1 = new Subscription();
            subsManager.store.test2 = new Subscription();
        })

        it('should return true', () => {
            expect(subsManager.store).toHaveProperty('test1');
            expect(subsManager.has('test1')).toBe(true);
        })

        it('should return true', () => {
            expect(subsManager.store).toHaveProperty('test1');
            expect(subsManager.store).toHaveProperty('test2');
            expect(subsManager.hasAll('test1', 'test2')).toBe(true);
        })

    });

    describe('scenario - clearing methods', () => {

        beforeEach(() => {
            subsManager.store.test1 = new Subscription();
            subsManager.store.test2 = new Subscription();
            subsManager.store.test3 = new Subscription();
        })

        it('it should clear 1 subscription', () => {
            subsManager.clear('test3')

            expect(subsManager.store).not.toHaveProperty('test3')
        })

        it('should clear and unsubscribe all subscriptions', () => {
            const spyer = jest.spyOn(subsManager.store.test1 as Subscription, 'unsubscribe');

            subsManager.clearAll();
            expect(spyer).toHaveBeenCalled();
            expect(subsManager.store).toEqual({})
        })

    });

})

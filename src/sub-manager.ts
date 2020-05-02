import {Subscription} from 'rxjs';
import {SubscriptionObjectItem, SubscriptionsMap} from './subscriptions-map';

/**
 * Subscription manager that stores subscriptions in key/value object.
 * And has simple methods to unsubscribe them or check if they exist.
 */
export class SubManager {

    /**
     * Subscription key/value object, which holds all subscriptions.
     *
     * @example Adding subscription
     * ```typescript
     *  this.subManager.subs.key = observable$.subscribe()
     * ```
     */
    store: SubscriptionsMap = {};

    /**
     * Checks if at least 1 of the given keys exist in the store.
     *
     * @param keys - keys of the store
     * @returns true if at least 1 of the given keys exist in the store
     */
    has(...keys: string[]): boolean {
        for (const key of keys) {
            if (!!this.store[key]) {
                return true;
            }
        }
        return false;
    }

    /**
     * Checks if all of given keys exist in the store.
     *
     * @param keys - keys of the store
     * @returns true if all given keys exist in the store
     */
    hasAll(...keys: string[]): boolean {
        for (const key of keys) {
            if (!this.store[key]) {
                return false;
            }
        }
        return true;
    }

    /**
     * Unsubscribes and clears subscriptions at the given keys of the store
     *
     * @param keys - keys of the store
     */
    clear(...keys: string[]) {
        keys.forEach((key: string) => {
            this.__clearSub(key);
        })
    }

    /**
     * Unsubscribes and clears all subscriptions in the store
     */
    clearAll() {
        SubManager.clearSubscriptionsMap(this.store);
        this.store = {}
    }

    private __clearSub(key: string) {
        SubManager.clearSubscriptions(this.store[key]);
        delete this.store[key];
    }

    /**
     * Unsubscribes all subscriptions in the array
     *
     * @param subscriptions - array of possibly infinitely submerged subscriptions
     */
    static clearSubscriptions(...subscriptions: Array<SubscriptionObjectItem>) {
        subscriptions
            .flat(Infinity)
            .forEach((subscription: Subscription) => {
                subscription.unsubscribe();
            });
    }

    /**
     * Unsubscribes all subscriptions in the key/value subscription object
     *
     * @param subscriptionObject - key/value object with stored subscriptions
     */
    static clearSubscriptionsMap(subscriptionObject: SubscriptionsMap) {
        Object.keys(subscriptionObject)
            .forEach((key: string) => {
                this.clearSubscriptions(subscriptionObject[key]);
            });
    }

}

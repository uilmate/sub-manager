import { Subscription } from 'rxjs';

/**
 * type of the SubsriptionsMap item
 */
export type SubscriptionObjectItem = Subscription | Array<SubscriptionObjectItem>;

/**
 * shorthand for the SubscriptionObjectItem
 */
export type SOI = SubscriptionObjectItem;

/**
 * Subscriptions key/value object which stores the subscriptions
 */
export interface SubscriptionsMap {
    [ key: string ]: SubscriptionObjectItem;
}

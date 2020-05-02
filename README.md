[![npm version](https://img.shields.io/npm/v/@uilmate/sub-manager.svg)]()
[![npm license](https://img.shields.io/npm/l/@uilmate/sub-manager.svg)]()
[![lifetime downloads](https://img.shields.io/npm/dt/@uilmate/sub-manager.svg)]()
[![weekly downloads](https://img.shields.io/npm/dw/@uilmate/sub-manager.svg)]()

# SubManager 

Simple RxJS helper class, which makes easier managing subscriptions.

- Difference between [SubSink](https://www.npmjs.com/package/subsink) is that, this class 
stores subscriptions in key/value object, which brings advantages such as checking if a
specific subscription exist or delete only specific subscriptions at any time. That's the 
reason why this package has been created.
- It's "framework agnostic" (doesn't depend on any front-end frameworks/libraries such 
as Angular, Vue, React). This means you can use this at every project where are you 
using RxJS.

# Installation

`npm install @uilmate/sub-manager` or `yarn add @uilmate/sub-manager`

# Usage

#### Storing subscriptions
```typescript
// stores subscription under the key "sub1"
subManager.store.sub1 = someObservable$.subscribe()

// you can also store array of the subscriptions
subManager.store.sub2 = [someObservable$1.subscribe(), someObservable$2.subscribe()]

// it can be also array of infinitely submerged arrays
subManager.store.sub3 = [[[someObservable$3.subscribe()]], someObservable$4.subscribe()]
```
- NOTE: please use the store object only for setting the subscriptions 
(for deleting use the class clear methods)

# Examples
#### Angular example

```typescript
export class AngularComponent implements OnDestroy {

    private subManager = new SubManager();

    someMethod() {
        // Create subscriptions and store the subscriptions
        this.subManager.store.sub1 = someObservable$.subscribe();
        this.subManager.store.sub2 = someObservable$.subscribe();
        
        // check if sub1 exist
        if (this.subManager.has('sub1')) {
            ...
        }
        
        // check if sub1 and sub2 both exist
        if (this.subManager.hasAll('sub1', 'sub2')) {
            ...        
        }       
     
  
        // delete and unsubscribe the sub2
        this.subManager.clear('sub2')

    }

    ngOnDestroy() {
        // unsubscribes all subscriptions in the store and clears it
        this.subManager.clearAll()
    }
}
```

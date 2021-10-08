## workbox:
```sh
npm install workbox-cli --global
workbox wizard
workbox generateSW workbox-config.js
```
- https://www.youtube.com/watch?v=QHm6-xu4F_I



## dexie:
```sh
npm install react
npm install dexie-react-hooks
npm install dexie@^v3.2.0-beta.1
```
- `Cheetsheet`: https://dexie.org/docs/API-Reference#quick-reference 
- https://dexie.org/docs/dexie-react-hooks/useLiveQuery()
- https://dexie.org/docs/Version/Version.stores()
- Don’t declare all columns like in SQL. You only declare properties you want to `index`, that is properties you want to use in a `where(…)` query
- Never index properties containing `images`, `movies` or `large (huge) strings`. Store them in IndexedDB, yes! but just `don’t index them!`
    ```javascript
    db.version(1).stores({
        friends: '++id, name, age'  //don't index "picture"
    });
    db.friends.put({
        name: 'Camilla',
        age: 25,
        picture: await getBlob('camilla.png') // but store it
    });
    ```
- Schema Syntax
    ```
    ++	    Auto-incremented primary key
    &	    Unique index
    *	    Multi-entry index
    [A+B]	Compound index or primary key
    ```
    - Primary keys are implicitly marked as unique.
    - The first entry in the schema string will always represent the primary key.
    - Syntax For Primary Key
      - ++keyPath : Autoincrement primary key
      - ++	: Hidden autoincremented primary key
      - keyPath: Dont autoincrement primary key
      - (blank)	: Hidden primary key, Leaving the first entry blank means that primary key is hidden and not auto-incremented
    - Syntax For Indexes
      - keyPath : Means that keyPath is indexed
      - &keyPath : Unique
      - *keyPath : Multi-valued	Means that if key is an array, each array value will be regarded as a key to the object.
      - [keyPath1+keyPath2] : Compound Defining a compound index for keyPath1 and keyPath2
    ```js
    var db = new Dexie('MyDatabase');
    db.version(1).stores({
        friends: '++id,name,shoeSize', // Primary Key is auto-incremented (++id)
        pets: 'id, name, kind',        // Primary Key is not auto-incremented (id)
        cars: '++, name',              // Primary Key auto-incremented but not inbound
        enemies: ',name,*weaknesses',  // Primary key is neither inbound nor auto-incr, 'weaknesses' contains an array of keys (*)
        users: 'meta.ssn, addr.city',  // Dotted keypath refers to nested property 
        people: '[name+ssn], &ssn'     // Compound primary key. Unique index ssn
    });
    ```
- Indexable Types:<br/>
Only properties of certain types can be indexed(string, number, Date and Array but NOT boolean, null or undefined).
- 
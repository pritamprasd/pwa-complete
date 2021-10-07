import Dexie from "dexie";

class FriendsDB extends Dexie {
    constructor() {
        super("friendsDB");
        this.version(2).stores({
            friends: `++id, age`
        });
    }
}

export const db = new FriendsDB();
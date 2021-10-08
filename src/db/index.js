import Dexie from "dexie";

class FriendsDB extends Dexie {
    constructor() {
        super("friends_db");
        this.version(1).stores({
            friends: "++id, name, age, *tags",
            gameSessions: "id, score"
        });
    }
}

export const db = new FriendsDB();
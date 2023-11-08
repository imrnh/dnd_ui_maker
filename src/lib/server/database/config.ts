import { MongoClient } from 'mongodb';
import { DEFAULT_DB_URI } from '$env/static/private';

export class DatabaseClass {
    public client = new MongoClient(DEFAULT_DB_URI);
    public connection: any;

    private async connect() {
        await this.client.connect();
        this.connection = this.client.db('default');
    }

    public async getConnectedDatabase() {
        if (!this.connection) {
            await this.connect();
        }
        return this.connection;
    }

    public async readDB() {
        const db = await this.getConnectedDatabase();
        const userCollection = db.collection('user');
        const users = await userCollection.find().toArray();
        // db.close();
    }


    public async createApp(){
        const db = await this.getConnectedDatabase();
        const app_collection = db.collection('app');

        // db.close();
    }
}

//singleton pattern
const Database = new DatabaseClass();

export default Database;
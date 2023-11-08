import { MongoClient } from 'mongodb';
import { DEFAULT_DB_URI } from '$env/static/private';

export default class Database {
    public client = new MongoClient(DEFAULT_DB_URI);
    public connection: any;

    private async connect() {
        await this.client.connect();
        this.connection = this.client.db('default');
    }

    public async getConnection() {
        if (!this.connection) {
            await this.connect();
        }
        return this.connection;
    }

    public async readDB() {
        const db = await this.getConnection();
        const userCollection = db.collection('user');
        const users = await userCollection.find().toArray();
    }
}

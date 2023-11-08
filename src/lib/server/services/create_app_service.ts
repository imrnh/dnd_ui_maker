import type IPage from "$lib/interfaces/page_interfaces";
import type { IAppDatabase } from "$lib/interfaces/root/app_db_storage";
import type IApp from "$lib/interfaces/root/app_interaface";
import generateUUIDString from "$lib/utilities/stringify_uuid";
import { PUBLIC_CLIENT_DB_URI } from "$env/static/public";
import { MongoClient } from "mongodb";



export default class AppCreatorService {


    public create(owner_id: string, app_name: string, minimum_age: number, industry_type: string, pricing_plan: string, template: IApp | null) {

        console.log(owner_id)

        var app: IApp = {
            uid: generateUUIDString(),
            owner: owner_id,
            api_root: "",
            name: "",
            description: "",
            pages: [],
            settings: {
                homepage: "/"
            }
        }

        this.create_database_for_app();

        //finally, save the app to the database.
    }

    private use_template_in_page(app: IApp, template: IApp) {

        //replace because we are creating a new app and therefore all the values in `app` are just null or dummy values. And template holds meaningful values.
        app.pages = template.pages;
        app.settings = template.settings;

        //create database
        app.database = this.create_database_for_app(app.owner);

        return app;
    }

    /**
     * 
     * It randomnly generate a database name, collection name and uid and then creates a db with the given name.
     * 
     * @returns app_db : IAppDatabase
     */
    private create_database_for_app(owner: string) {
        var app_db: IAppDatabase = {
            uid: generateUUIDString(),
            db_name: "db_" + generateUUIDString(),
            collection_name: [],
        }

        //create the db.
        this.perform_db_creation(app_db, owner);

        return app_db;
    }

    private async perform_db_creation(app_db: IAppDatabase, owner: string) {

        try {
            const client = new MongoClient(PUBLIC_CLIENT_DB_URI);
            await client.connect();
            var db = client.db(app_db.db_name);
            const collection = db.collection('identityc');
            await collection.insertOne({ owner: owner });

            // const adminDb = client.db('admin');
            // const command = { create: app_db.db_name };
            // const result = await adminDb.command(command);
            client.close();
        }
        catch (error) {
            console.log("@MESSAGE _ Error", error);
        }
    }
}
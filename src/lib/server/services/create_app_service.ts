import type IPage from "$lib/interfaces/page_interfaces";
import type { IAppDatabase } from "$lib/interfaces/root/app_db_storage";
import type IApp from "$lib/interfaces/root/app_interaface";
import generateUUIDString from "$lib/utilities/stringify_uuid";
import { PUBLIC_CLIENT_DB_URI } from "$env/static/public";
import { MongoClient } from "mongodb";
import Database from "$lib/server/database/config";



export default class AppCreatorService {


    public create(owner_id: string, app_name: string, minimum_age: number, industry_type: string, pricing_plan: string, template: IApp | null) {
        var app: IApp = {
            uid: generateUUIDString(),
            owner: owner_id,
            api_root: generateUUIDString(),
            name: app_name,
            description: "",
            pages: [],
            settings: {
                homepage: "/"
            },
            minimum_age_requirements: minimum_age,
            industry_type: industry_type,
            pricing_plan: pricing_plan,
            created_at: new Date(),
            last_edited: new Date() //initiating with current time.
        }

        this.create_database_for_app(owner_id, app.uid);
        this.add_app_to_db(app); //finally, save the app to the database.
    }

    private use_template_in_page(app: IApp, template: IApp) {

        //replace because we are creating a new app and therefore all the values in `app` are just null or dummy values. And template holds meaningful values.
        app.pages = template.pages;
        app.settings = template.settings;

        //create database
        app.database = this.create_database_for_app(app.owner, app.uid);

        return app;
    }

    /**
     * 
     * It randomnly generate a database name, collection name and uid and then creates a db with the given name.
     * 
     * @returns app_db : IAppDatabase
     */
    private create_database_for_app(owner: string, app_uid: string) {
        var app_db: IAppDatabase = {
            uid: generateUUIDString(),
            db_name: "db_" + generateUUIDString(),
            collection_name: [],
        }

        //create the db.
        this.perform_db_creation(app_db, owner, app_uid);

        return app_db;
    }



    /**
     * 
     * takes the name of the db and create a db.
     * DB is created by mongodb if not exits when the very first record hasbeen pushed. 
     * Used that feature here.
     * 
     * @param app_db 
     * @param owner 
     * @param app_uid 
     */
    private async perform_db_creation(app_db: IAppDatabase, owner: string, app_uid: string) {

        try {
            const client = new MongoClient(PUBLIC_CLIENT_DB_URI);
            await client.connect();
            var db = client.db(app_db.db_name);
            const collection = db.collection('identityc'); //create a collection to hold identity of the database.
            await collection.insertOne({ owner: owner, app: app_uid });
            client.close();
        }
        catch (error) {
            console.log("@MESSAGE _ Error", error);
        }
    }


    private async add_app_to_db(app: IApp) {
        const database = await Database.getConnectedDatabase();
        const user_collection = database.collection('user');
        const app_collection = database.collection("app");


        //append project id to this user.
        const owner = app.owner;
        const app_id = app.uid;
        const filter = { owner };
        const update = { $addToSet: { projects: app_id } };
        const options = { upsert: true };
        const ucr_res = await user_collection.updateOne(filter, update, options);


        app_collection.insertOne(app);
    }
}
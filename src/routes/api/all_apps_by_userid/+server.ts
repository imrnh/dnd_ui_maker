import { json } from "@sveltejs/kit";
import Database from "$lib/server/database/config";

var allowed_fields = {
    "uid": 1,
    "owner": 1,
    "name": 1,
    "pricing_plan": 1,
    "last_edited": 1,
    "api_root": 0,
    "description": 0,
    "page": 0,
    "settings": 0,
    "minimum_age_requirements": 0,
    "created_at": 0,
    "industry_type": 0,
}


export async function POST(event) {
    const data = await event.request.formData()
    const uid = data.get('usrid')

    var all_apps;
    if (uid?.toString() != undefined) {
        all_apps = await getAllAppsForUser(uid?.toString());
        console.log("All apps: ", all_apps)
    }

    return new Response(JSON.stringify({ success: true, apps: all_apps }), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}



async function getAllAppsForUser(user_id: string) {
    var db = await Database.getConnectedDatabase();
    var user_collection = db.collection('user');
    var app_collection = db.collection('app');

    var user_records = await user_collection.findOne({ owner: user_id })
    var project_ids = user_records.projects;

    const apps = await app_collection.find({ "uid": { "$in": project_ids } }, {
        uid: 1,
        owner: 1,
        name: 1,
        last_edited: 1,
        pricing_plan: 1,
        api_root: 0,
        description: 0,
        created_at: 0,
    }).toArray();

    return apps
}
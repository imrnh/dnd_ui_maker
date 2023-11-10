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
    const app_id = data.get('appid')

    var app_data;
    if (app_id?.toString() != undefined) {
        app_data = await getAppInfo(app_id?.toString());
    }

    return new Response(JSON.stringify({ success: true, app_data: app_data }), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}



async function getAppInfo(user_id: string) {
    var db = await Database.getConnectedDatabase();
    var app_collection = db.collection('app');
    return await app_collection.findOne({ uid: user_id });
}
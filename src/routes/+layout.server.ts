import Database from "$lib/server/database/config";
import generateUUIDString from "$lib/utilities/stringify_uuid";
import generateNewUUID from "$lib/utilities/stringify_uuid";

export async function load() {
    var database = new Database();
    database.getConnection()
    database.readDB();

    // generateUUIDString()
}
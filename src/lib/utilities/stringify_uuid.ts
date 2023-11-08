import { v4 as uuidv4 } from "uuid";


export default function generateUUIDString() {
    let uuid = uuidv4();
    const regex = /[^A-Za-z0-9]/g;
    const alphanumericUUID = uuid.replace(regex, '');
    
    return alphanumericUUID;
}


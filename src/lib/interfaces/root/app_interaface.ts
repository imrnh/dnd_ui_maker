import type IPage from "../page_interfaces";
import type { IAppDatabase, IAppVolumeStorage } from "./app_db_storage";
import type { AppleStoreCredentials, GooglePlayStoreCredentials } from "./publishing_creds_interface";

export default interface IApp { //the root to all other interface. This is the main app project.
    uid: string,
    owner: string, //owner's uuid
    api_root: string, //a api route that the project will use to communicate with the server. If not paid subscription fee, this api function can discard the request. Otherwise, it will be the gateway to access any api thing.
    name: string,
    description: string,
    logo_path : string, //the app logo that will be used in production.
    comapny_url: string, //the package name. //must be unique.
    pages: IPage[],
    database?: IAppDatabase, //database credentials for mongodb. We will set a new database for the user.
    volume_storage?: IAppVolumeStorage, //volume storage.
    settings: IAppSettings,
    collaborators?: string[], //uuid of collaborators.
    minimum_age_requirements: number, //minimum age limit to use the app.
    industry_type?: string,
    pricing_plan: string,
    created_at: Date,
    last_edited: Date,
}

export interface IAppSettings {
    homepage: string, //initialRoute in flutter.
    publish_credentials?: (GooglePlayStoreCredentials | AppleStoreCredentials)[],
}

export interface IAuthState {
    authenticated: boolean,
    uid: any,
    user_name: string | null
}
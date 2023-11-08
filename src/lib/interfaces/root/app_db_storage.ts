export interface IAppDatabase {
    uid: string,
    db_name: string, //we can have multiple database for the user-case use. Because, one db may exceed max size.
    collection_name: string[],
    username?: string, //a random username that we will create
    password?: string, //a random password we will create. For security reasons, both username and password won't be stored here. But still keeping these just in case we need in future.
    host?: string, //incase we host a db outside our server.
}

export interface IAppVolumeStorage {

}
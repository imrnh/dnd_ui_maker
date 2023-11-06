import type KVPair from "$lib/models/MKeyValuePair"
import type Variable from "$lib/models/MVariable"


export default interface IPage {
    page_uid: string,
    page_name: string,
    settings: IPageSettings,
    ui: IPageUI[],
    actions: IPageAction[],
    variables: Variable[] | KVPair[],
}

export interface IPageUI {
    uid: string,
    tag: string,
    attributes: Record<string, string | number>,
    style: Record<string, any>
}

export interface IPageAction {
    uid: string,
    tag: string,
}

export interface IPageSettings {
    page_size: number[] //width, height
    page_bg_color: string, //color hex code.
}


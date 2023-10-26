export interface IPageUIElement{
    uuid : string,
    tag: string,
    attributes: Record<string, string | number>,
    style : Record<string, any>
}


export interface IPageSettings{
    page_size: number[] //width, height
    page_bg_color: string, //color hex code.
}

export default interface IPage{
    page_uuid: "page_uuid",
    page_name: "page_name",
    settings: IPageSettings,
    ui_elements: IPageUIElement[],
    functions: [],
    variables: [],
}
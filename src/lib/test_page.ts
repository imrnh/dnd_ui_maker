import type { IPageSettings, IPageUI } from "./interfaces/page_interfaces"
import type IPage from "./interfaces/page_interfaces"

export const elm_image_1 : IPageUI = {
    uuid: "acdb1",
    tag: "img",
    attributes: {
        "src": "https://images.pexels.com/photos/145378/pexels-photo-145378.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "alt": "Bird",
        "title": "Image title - Bird"
    },
    style : {
        "width": "300px",
        "height": "230px",
        "background-color": "blue",
        "position": "absolute",
        "left": "0px", //start with 1 to avoid the object start from screen's 0 position.
        "top": "0px",
        "cursor": "auto",
    }
}


export const elm_image_2 : IPageUI =  {
    uuid: "acdb2",
    tag: "img",
    attributes: {
        "src": "https://images.pexels.com/photos/8149658/pexels-photo-8149658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "alt": "Peacock",
        "title": "Image title - Peacock"
    },
    style : {
        "width": "300px",
        "height": "230px",
        "background-color": "black",
        "position": "absolute",
        "left": "90px",
        "top": "10px",
        "cursor": "auto",
    }
}


export const elm_image_3 : IPageUI = {
    uuid: "acdb3",
    tag: "p",
    attributes: {
        "text": "This is paragraph text"
    },
    style : {
        "width": "auto",
        "height": "auto",
        "background-color": "black",
        "color": "white",
        "position": "absolute",
        "left": "50px",
        "top": "20px",
        "cursor": "auto",
    }
}

const page_settings : IPageSettings = {
    page_size : [600, 1600],
    page_bg_color : "#75522",
}


const page : IPage  = {
    page_uuid: "page_uuid",
    page_name: "page_name",
    settings: page_settings,
    ui_elements: [
        elm_image_1,
        elm_image_2,
        elm_image_3
    ],
    functions: [],
    variables: [],
}

export default page
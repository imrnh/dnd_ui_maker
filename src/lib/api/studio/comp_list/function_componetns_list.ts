export interface IUIComponent {
    unq_identifier: string,
    name: string,
    icon: any
}


import text_icon from "$lib/assets/icons/uic/text-editor.png";
import img_icon from "$lib/assets/icons/uic/pictures.png";
import txtInput_icon from "$lib/assets/icons/uic/text-field.png";

const functionComponentList: IUIComponent[] = [
    {
        unq_identifier: 'fnc_txt', //fnc -> function component
        name: "Text Function",
        icon: text_icon,
    },
    {
        unq_identifier: 'fnc_img', //fnc -> function component
        name: "Image Function",
        icon: img_icon,
    },
    {
        unq_identifier: 'fnc_txtInput', //fnc -> function component
        name: "Text Input Function",
        icon: txtInput_icon,
    },

]


export default functionComponentList;
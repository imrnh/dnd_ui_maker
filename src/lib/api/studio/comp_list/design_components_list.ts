export interface IUIComponent {
    unq_identifier: string,
    name: string,
    icon: any
}


import text_icon from "$lib/assets/icons/uic/text-editor.png";
import img_icon from "$lib/assets/icons/uic/pictures.png";
import txtInput_icon from "$lib/assets/icons/uic/text-field.png";

const designComponentList: IUIComponent[] = [
    {
        unq_identifier: 'uic_txt', //uic -> ui component
        name: "Text",
        icon: text_icon,
    },
    {
        unq_identifier: 'uic_img', //uic -> ui component
        name: "Image",
        icon: img_icon,
    },
    {
        unq_identifier: 'uic_txtInput', //uic -> ui component
        name: "Text Input",
        icon: txtInput_icon,
    },

]


export default designComponentList;
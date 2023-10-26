//TODO: Read from db.
//return the list

export interface ITemplate {
    name: string,
    thumbnail: any,
    unq_id: string,
}

export interface ITemplateInfo {
    unq_id: string,
    page: any[], //replace with IPage interface
    description: string,
}


//description and page-code will be fetched for every single component only on the main page.

const templateList: ITemplate[] = [
    {
        unq_id: "151",
        name: "Tempalte 1",
        thumbnail: "https://images.pexels.com/photos/18193282/pexels-photo-18193282/free-photo-of-people-kitesurfing-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        unq_id: "152",
        name: "Tempalte 2",
        thumbnail: "https://images.pexels.com/photos/1334116/pexels-photo-1334116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

    },
    {
        unq_id: "153",
        name: "Tempalte 3",
        thumbnail: "https://images.pexels.com/photos/18010105/pexels-photo-18010105/free-photo-of-high-glass-skyscraper.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

    },
    {
        unq_id: "154",
        name: "Tempalte 4",
        thumbnail: "https://images.pexels.com/photos/1334116/pexels-photo-1334116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

    },
    {
        unq_id: "155",
        name: "Tempalte 5",
        thumbnail: "https://images.pexels.com/photos/1334116/pexels-photo-1334116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

    },
    {
        unq_id: "156",
        name: "Tempalte 6",
        thumbnail: "https://images.pexels.com/photos/1334116/pexels-photo-1334116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

    },
];


export default templateList
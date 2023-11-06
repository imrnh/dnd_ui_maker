import type ISelectedComponentStatusObject from "$lib/interfaces/i_selected_component_status";
import type { IPageUI } from "$lib/interfaces/page_interfaces";
import type IPage from "$lib/interfaces/page_interfaces";

export default class MultipleSelectionOperations{
    private page : IPage;

    constructor(page : IPage){
        this.page = page
    }

    public get_selected_items(rec_pnts: Record<string, number>, canvas_init_points: Record<string, number>  ) : any{
        let selected_component_uuids: string[] = []
        let selected_component_status : Record<string, ISelectedComponentStatusObject> = {}

        this.page.ui_elements.map((element, index)=>{
            const ob_pnts = this.get_element_points(element, canvas_init_points)

            const condition_one : boolean = (ob_pnts.x1 <= rec_pnts.a) && (ob_pnts.y1 <= rec_pnts.b) && (ob_pnts.x2 >= rec_pnts.a) && (ob_pnts.y2 >= rec_pnts.b)
            const condition_two : boolean = (ob_pnts.x1 <= rec_pnts.c) && (ob_pnts.y1 <= rec_pnts.d) && (ob_pnts.x2 >= rec_pnts.c) && (ob_pnts.y2 >= rec_pnts.d)
            const condition_three : boolean = (ob_pnts.x1 >= rec_pnts.a) && (ob_pnts.y1 >= rec_pnts.b) && (ob_pnts.x2 <= rec_pnts.c) && (ob_pnts.y2 <= rec_pnts.d)
            // const condition_four : boolean = (ob_pnts.x1 <= rec_pnts.a) && (ob_pnts.x2 >= rec_pnts.a) && (ob_pnts.x1 <= rec_pnts.c) && (ob_pnts.x2 >= rec_pnts.c)
            //             && (ob_pnts.y1 <= rec_pnts.b) && (ob_pnts.y2 >= rec_pnts.b) && (ob_pnts.y1 <= rec_pnts.d) && (ob_pnts.y2 >= rec_pnts.d)

            if(condition_one || condition_two || condition_three){
                if(!selected_component_uuids.includes(element.uuid)){
                    selected_component_uuids.push(element.uuid);

                    const st_obj : ISelectedComponentStatusObject = {
                        idx: index,
                        il: 0,
                        it: 0
                    }
                    selected_component_status[element.uuid] = st_obj;
                }
            }
        })
        
        return [
            selected_component_uuids,
            selected_component_status
        ]
    }



     /**   
      * 
      * middle point is O
     *    P1                          
     *  (x1,y1) ---------------------- 
     *          |           .         |
     *          |          O(x, y     |
     *          ---------------------- (x2, y2)
     *                                     P2
     */

    private get_element_points(element: IPageUI, canvas_init_points: Record<string, number>){
        var x1 = parseInt(element.style.left.split("px")[0]) + Math.floor(canvas_init_points.cx)
        var y1 = parseInt(element.style.top.split("px")[0]) + Math.floor(canvas_init_points.cy)

        var x2 = x1 + (parseInt(element.style.width.split("px")[0]) || 0) //when width set to auto
        var y2 = y1 + (parseInt(element.style.height.split("px")[0]) || 0)//when height set to auto.


        return {'x1': x1, 'y1': y1, 'x2': x2, 'y2': y2}
    }
}
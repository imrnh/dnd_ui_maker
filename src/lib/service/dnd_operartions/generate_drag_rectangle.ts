export default class MakeDragRectangle {

    private initial_coords = { x: -1, y: -1 }
    private curr_coords = { x: -1, y: -1 }

    public setInitials(event: any, scroll_amounts : Record<string, number>) {
        this.initial_coords.x = event.clientX + Math.floor(scroll_amounts.sx)
        this.initial_coords.y = event.clientY + Math.floor(scroll_amounts.sy)
    }

    public draw(event: any, scroll_amounts : Record<string, number>) {
        this.curr_coords.x = event.clientX + Math.floor(scroll_amounts.sx)
        this.curr_coords.y = event.clientY + Math.floor(scroll_amounts.sy)

        return this.get_style()
    }

    public reset_selection_box() {
        var style = {
            'width': "0px",
            'height': "0px",
            'left': "-1 px",
            'top': "-1 px",
            'position': "absolute",
            'z-index': 0,
            'background-color': 'transparent',
            'opacity': 0,
            'display': 'visible',
        }

        return this.get_style_string(style)
    }

    public get_rectangle_points(){
        var a = this.initial_coords.x
        var b = this.initial_coords.y
        var c = this.curr_coords.x
        var d = this.curr_coords.y

        return {"a": a, "b": b, "c": c, "d": d}
    }

    public get_rectangle_coords() {
        /**   
         *    P1                           P2
         *  (a,b) ---------------------- (c,b)
         *        |                     |
         *        |                     |
         *  (a,d) ---------------------- (c,d)
         *      P3                        P4
         */

        var a = this.initial_coords.x
        var b = this.initial_coords.y
        var c = this.curr_coords.x
        var d = this.curr_coords.y

        return {
            "top_left": [a, b],
            "top_right": [c, b],
            "bottom_left": [a, d],
            "bottom_right": [c, d]
        }
    }

    private get_style() {
        const style_obj = {
            'width': (this.curr_coords.x - this.initial_coords.x) + "px",
            'height': (this.curr_coords.y - this.initial_coords.y) + "px",
            'left': this.initial_coords.x + "px",
            'top': this.initial_coords.y + "px",
            'position': "absolute",
            'z-index': 100000,
            'background-color': '#7F00FF',
            'opacity': 0.25,
            'display': 'visible',
        }

        if(this.initial_coords.x > this.curr_coords.x){
            style_obj.left = this.curr_coords.x + "px"
            style_obj.width = ((this.curr_coords.x - this.initial_coords.x) * -1) + "px" //making it init - curr by multiplying the operation with *1.
        }

        if(this.initial_coords.x > this.curr_coords.x){
            style_obj.top = this.curr_coords.y + "px"
            style_obj.height = ((this.curr_coords.y - this.initial_coords.y) * -1) + "px" //making it init - curr by multiplying the operation with *1.
        }

        var style_string = this.get_style_string(style_obj);
        return style_string;
    }

    private get_style_string(style_obj: Record<string, number | string>) {
        return Object.keys(style_obj)
            .map((key) => `${key}:${style_obj[key]}`)
            .join(";");
    }
}
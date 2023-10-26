class CreateMouseDragRectangle{
    private mousedown_positions = {x: 0, y: 0}
    private curr_positions = {x: 0, y: 0}

    /**
     * 
     * @param event -> the click event.
     * @param offsets  -> other offsets: (scrollX). We have to add offsets from both mousedown_positions and release_positions.
     */

    public mouse_click_positions(event: any, offsets : Record<string, number>){
        this.mousedown_positions.x = event.clientX + offsets.x;
        this.mousedown_positions.y = event.clientY + offsets.y;
    }

    public get_mousedrag_rectangle(event: any, offsets : Record<string, number>){
        this.curr_positions.x = event.clientX + offsets.x;
        this.curr_positions.y = event.clientY + offsets.y;
    }
}
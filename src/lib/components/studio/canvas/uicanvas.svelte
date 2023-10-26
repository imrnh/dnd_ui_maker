<script lang="ts">
    import { onMount } from "svelte";
    import page from "$lib/test_page";
    import get_style_string from "$lib/utilities/style_string";
    import MakeDragRectangle from "$lib/dnd_operartions/generate_drag_rectangle";
    import MultipleSelectionOperations from "$lib/dnd_operartions/multiple_selection";
    import type ISelectedComponentStatusObject from "$lib/interfaces/i_selected_component_status";
    import type { IPageUIElement } from "$lib/interfaces/page_interfaces";
    import { flip } from "svelte/animate";

    let component_clicked: boolean = false;
    let canvas_clicked: boolean = false;
    let canvasInitialX: number, canvasInitialY: number;
    let scrollX: number = 0,
        scrollY: number = 0;

    let canvas: any = null;
    let components = [];
    let component_references: any = [];
    let selection_box: any;

    let multi_selection_obj: MultipleSelectionOperations = new MultipleSelectionOperations(page);
    let selection_box_drawer: MakeDragRectangle = new MakeDragRectangle();
    let selected_components: string[] = []; //update this while selecting elements.
    let selected_components_status: Record<string, ISelectedComponentStatusObject> = {};

    /**
     * canvas_mouse_down function.
     * @param e : click event
     *
     * set the canvas_clicked to `true`
     * also make sure the selection_box_drawer object get the mouse click position. So, when user will try to use multiple selection option,
     * we can show a rectangle to make things feels easier.
     *
     */
    function canvas_mouse_down(e: any) {
        canvas_clicked = true;
        selection_box_drawer.setInitials(e, { sx: window.scrollX, sy: window.scrollY }); //get the mouse's initial click position.

        if (canvas_clicked && !component_clicked) {
            //reset the selected_components array.
            selected_components = [];
            selected_components_status = {};
        }
    }

    function handle_start_dragging(e: any, e_uuid: string, elm_index: number) {
        component_clicked = true;

        /**
         * put the component to selected item first.
         *  if the clicked component doesn't exist in the selected_components array, then refresh the array and add new clicked item to slected element.
         */
        if (!selected_components.includes(e_uuid)) {
            selected_components = []; //nullify first
            selected_components_status = {}; //nullify first.

            selected_components = [e_uuid];
            selected_components_status[e_uuid] = {
                idx: elm_index,
                il: 0,
                it: 0,
            };
        }

        //now, calculate the mouse click position relative to the objects that are selected.
        page.ui_elements.map((element: IPageUIElement) => {
            if (selected_components.includes(element.uuid)) {
                for (let key in selected_components_status) {
                    if (selected_components_status.hasOwnProperty(key)) {
                        let component_info = selected_components_status[key];
                        component_info.il = e.clientX - component_references[component_info.idx].getBoundingClientRect().left;
                        component_info.it = e.clientY - component_references[component_info.idx].getBoundingClientRect().top;
                    }
                }
            }
        });

        //get scroll position of windows.
        scrollX = window.scrollX;
        scrollY = window.scrollY;
    }

    function drag(e: any) {
        if (canvas_clicked && !component_clicked) {
            selection_box.style = selection_box_drawer.draw(e, { sx: window.scrollX, sy: window.scrollY });
            let calcualted_elements_and_status = multi_selection_obj.get_selected_items(selection_box_drawer.get_rectangle_points(), { cx: canvasInitialX, cy: canvasInitialY });
            selected_components = calcualted_elements_and_status[0];
            selected_components_status = calcualted_elements_and_status[1];
        }

        if (component_clicked) {
            e.preventDefault();

            page.ui_elements.map((element: IPageUIElement) => {
                for (let key in selected_components_status) {
                    let obj = selected_components_status[key];
                    const x = e.clientX - obj.il + scrollX; //as we set the element to move around the canvas, we don't need to subtract the canvasInitialPositions from here.
                    const y = e.clientY - obj.it + scrollY;

                    // component_references[obj.idx].style.left = x + "px";
                    // component_references[obj.idx].style.top = y + "px";

                    //if it have any problem, uncomment the top two line and then comment out this below 2 line.
                    page.ui_elements[obj.idx].style.left = x - canvasInitialX + "px";
                    page.ui_elements[obj.idx].style.top = y - canvasInitialY + "px";

                    //call the database's function to update the following object's left and top.
                }
            });
        }
    }

    function handle_stop_dragging() {
        if (canvas_clicked) {
            canvas_clicked = false;
            component_clicked = false;

            //set the selection box to invisible. Delay is not necessary.
            setTimeout(() => {
                selection_box.style = selection_box_drawer.reset_selection_box();
                refresh_selected_items();
            }, 100);
        }
    }

    /**
     * Utility functions
     */

    function load_scroll_amount() {
        scrollX = window.scrollX;
        scrollY = window.scrollY;
    }

    function get_canvas_intial_position() {
        canvasInitialX = canvas.getBoundingClientRect().left;
        canvasInitialY = canvas.getBoundingClientRect().top;
    }

    function refresh_selected_items() {
        let index = 0;
        // for(let key in selected_components_status){
        //     let el_idx = selected_components_status[key].idx
        //     page.ui_elements[el_idx].style.border = "0px"
        //     index++;
        // }
    }

    onMount(() => {
        canvas = document.querySelector("#canvas");
        components = Array.from(document.querySelectorAll("#component"));

        // Ensure the page always loads with scrollX and scrollY at 0
        window.addEventListener("beforeunload", () => {
            window.scrollTo(0, 0);
        });

        get_canvas_intial_position();
        load_scroll_amount();

        //set initial loading positon for components with scroll amount. and then attach the event listeners.

        components.forEach((component, index) => {
            component.addEventListener("mousedown", (e) => {
                handle_start_dragging(e, page.ui_elements[index].uuid, index);
            });
        });

        let canvasWrapper = document.getElementById("canvas");

        canvasWrapper.addEventListener("mousedown", canvas_mouse_down);
        canvasWrapper.addEventListener("mousemove", drag);
        canvasWrapper.addEventListener("mouseup", handle_stop_dragging);
    });
</script>

<main>
    <div id="canvas">
        <div id="select_rectangle" bind:this={selection_box} />
        {#each page.ui_elements as element}
            {#if element.tag == "img"}
                <img
                    bind:this={component_references[component_references.length]}
                    src={element.attributes.src.toString()}
                    alt={element.attributes.alt.toString()}
                    style={`left: ${parseInt(element.style.left) + Math.floor(canvasInitialX) || "0"}px;  top: ${parseInt(element.style.top) + Math.floor(canvasInitialY) || "0"}px; border: ${
                        selected_components.includes(element.uuid) ? "3px solid #7f00ff" : element.style.border
                    }; ${get_style_string(element.style)}`}
                    id="component"
                />
            {:else if element.tag == "p"}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                <p
                    bind:this={component_references[component_references.length]}
                    id="component"
                    style={`left: ${parseInt(element.style.left) + Math.floor(canvasInitialX) || "0"}px;  top: ${parseInt(element.style.top) + Math.floor(canvasInitialY) || "0"}px; border: ${
                        selected_components.includes(element.uuid) ? "3px solid #7f00ff" : element.style.border
                    }; ${get_style_string(element.style)}`}
                >
                    {element.attributes.text}
                </p>
            {/if}
        {/each}
    </div>
</main>

<style>
    #canvas {
        width: 330px;
        height: 700px;
        background-color: rgb(255, 255, 255);
        margin-top: 200px;
        margin-left: 500px;
        border: 1px solid rgb(235, 235, 235);
    }
</style>

<script lang="ts">
    import { onMount } from "svelte";
    import page from "$lib/test_page";
    import get_style_string from "$lib/utilities/style_string";
    import MakeDragRectangle from "$lib/dnd_operartions/generate_drag_rectangle";
    import MultipleSelectionOperations from "$lib/dnd_operartions/multiple_selection";
    import type ISelectedComponentStatusObject from "$lib/interfaces/i_selected_component_status";
    import type { IPageUI } from "$lib/interfaces/page_interfaces";
    import { flip } from "svelte/animate";

    let fnc_cnvs_component_clicked: boolean = false;
    let fnc_cnvs_canvas_clicked: boolean = false;
    let fnc_cnvs_canvasInitialX: number, fnc_cnvs_canvasInitialY: number;
    let fnc_cnvs_scrollX: number = 0,
        fnc_cnvs_scrollY: number = 0;

    let fnc_cnvs_canvas: any = null;
    let fnc_cnvs_components = [];
    let fnc_cnvs_component_references: any = [];
    let fnc_cnvs_selection_box: any;

    let fnc_cnvs_multi_selection_obj: MultipleSelectionOperations = new MultipleSelectionOperations(page);
    let fnc_cnvs_selection_box_drawer: MakeDragRectangle = new MakeDragRectangle();
    let fnc_cnvs_selected_components: string[] = []; //update this while selecting elements.
    let fnc_cnvs_selected_components_status: Record<string, ISelectedComponentStatusObject> = {};

    /**
     * fnc_cnvs_canvas_mouse_down function.
     * @param e : click event
     *
     * set the fnc_cnvs_canvas_clicked to `true`
     * also make sure the fnc_cnvs_selection_box_drawer object get the mouse click position. So, when the user will try to use multiple selection option,
     * we can show a rectangle to make things feel easier.
     *
     */
    function fnc_cnvs_canvas_mouse_down(e: any) {
        fnc_cnvs_canvas_clicked = true;
        fnc_cnvs_selection_box_drawer.setInitials(e, { sx: window.scrollX, sy: window.scrollY }); //get the mouse's initial click position.

        if (fnc_cnvs_canvas_clicked && !fnc_cnvs_component_clicked) {
            //reset the fnc_cnvs_selected_components array.
            fnc_cnvs_selected_components = [];
            fnc_cnvs_selected_components_status = {};
        }
    }

    function fnc_cnvs_handle_start_dragging(e: any, e_uuid: string, elm_index: number) {
        fnc_cnvs_component_clicked = true;

        /**
         * put the component to the selected item first.
         *  if the clicked component doesn't exist in the fnc_cnvs_selected_components array, then refresh the array and add the new clicked item to the selected element.
         */
        if (!fnc_cnvs_selected_components.includes(e_uuid)) {
            fnc_cnvs_selected_components = []; //nullify first
            fnc_cnvs_selected_components_status = {}; //nullify first.

            fnc_cnvs_selected_components = [e_uuid];
            fnc_cnvs_selected_components_status[e_uuid] = {
                idx: elm_index,
                il: 0,
                it: 0,
            };
        }

        //now, calculate the mouse click position relative to the objects that are selected.
        page.ui_elements.map((element: IPageUI) => {
            if (fnc_cnvs_selected_components.includes(element.uuid)) {
                for (let key in fnc_cnvs_selected_components_status) {
                    if (fnc_cnvs_selected_components_status.hasOwnProperty(key)) {
                        let component_info = fnc_cnvs_selected_components_status[key];
                        component_info.il = e.clientX - fnc_cnvs_component_references[component_info.idx].getBoundingClientRect().left;
                        component_info.it = e.clientY - fnc_cnvs_component_references[component_info.idx].getBoundingClientRect().top;
                    }
                }
            }
        });

        //get the scroll position of windows.
        fnc_cnvs_scrollX = window.scrollX;
        fnc_cnvs_scrollY = window.scrollY;
    }

    function fnc_cnvs_drag(e: any) {
        if (fnc_cnvs_canvas_clicked && !fnc_cnvs_component_clicked) {
            fnc_cnvs_selection_box.style = fnc_cnvs_selection_box_drawer.draw(e, { sx: window.scrollX, sy: window.scrollY });
            let calculated_elements_and_status = fnc_cnvs_multi_selection_obj.get_selected_items(fnc_cnvs_selection_box_drawer.get_rectangle_points(), { cx: fnc_cnvs_canvasInitialX, cy: fnc_cnvs_canvasInitialY });
            fnc_cnvs_selected_components = calculated_elements_and_status[0];
            fnc_cnvs_selected_components_status = calculated_elements_and_status[1];
        }

        if (fnc_cnvs_component_clicked) {
            e.preventDefault();

            page.ui_elements.map((element: IPageUI) => {
                for (let key in fnc_cnvs_selected_components_status) {
                    let obj = fnc_cnvs_selected_components_status[key];
                    const x = e.clientX - obj.il + fnc_cnvs_scrollX;
                    const y = e.clientY - obj.it + fnc_cnvs_scrollY;

                    page.ui_elements[obj.idx].style.left = x - fnc_cnvs_canvasInitialX + "px";
                    page.ui_elements[obj.idx].style.top = y - fnc_cnvs_canvasInitialY + "px";
                }
            });
        }
    }

    function fnc_cnvs_handle_stop_dragging() {
        if (fnc_cnvs_canvas_clicked) {
            fnc_cnvs_canvas_clicked = false;
            fnc_cnvs_component_clicked = false;

            setTimeout(() => {
                fnc_cnvs_selection_box.style = fnc_cnvs_selection_box_drawer.reset_selection_box();
                fnc_cnvs_refresh_selected_items();
            }, 100);
        }
    }

    /**
     * Utility functions
     */

    function fnc_cnvs_load_scroll_amount() {
        fnc_cnvs_scrollX = window.scrollX;
        fnc_cnvs_scrollY = window.scrollY;
    }

    function fnc_cnvs_get_canvas_initial_position() {
        fnc_cnvs_canvasInitialX = fnc_cnvs_canvas.getBoundingClientRect().left;
        fnc_cnvs_canvasInitialY = fnc_cnvs_canvas.getBoundingClientRect().top;
    }

    function fnc_cnvs_refresh_selected_items() {
        let index = 0;
    }
    
    onMount(() => {
        fnc_cnvs_canvas = document.querySelector("#fnc_cnvs_canvas");
        fnc_cnvs_components = Array.from(document.querySelectorAll("#fnc_cnvs_component"));

        // Ensure the page always loads with fnc_cnvs_scrollX and fnc_cnvs_scrollY at 0
        window.addEventListener("beforeunload", () => {
            window.scrollTo(0, 0);
        });

        fnc_cnvs_get_canvas_initial_position();
        fnc_cnvs_load_scroll_amount();

        fnc_cnvs_components.forEach((component, index) => {
            component.addEventListener("mousedown", (e) => {
                fnc_cnvs_handle_start_dragging(e, page.ui_elements[index].uuid, index);
            });
        });

        let canvasWrapper = document.getElementById("fnc_cnvs_canvas");

        canvasWrapper.addEventListener("mousedown", fnc_cnvs_canvas_mouse_down);
        canvasWrapper.addEventListener("mousemove", fnc_cnvs_drag);
        canvasWrapper.addEventListener("mouseup", fnc_cnvs_handle_stop_dragging);
    });
</script>

<main>
    <div id="fnc_cnvs_canvas">
        <div id="fnc_cnvs_select_rectangle" bind:this={fnc_cnvs_selection_box} />
        {#each page.ui_elements as element}
            {#if element.tag == "img"}
                <img
                    bind:this={fnc_cnvs_component_references[fnc_cnvs_component_references.length]}
                    src={element.attributes.src.toString()}
                    alt={element.attributes.alt.toString()}
                    style={`left: ${parseInt(element.style.left) + Math.floor(fnc_cnvs_canvasInitialX) || "0"}px;  top: ${parseInt(element.style.top) + Math.floor(fnc_cnvs_canvasInitialY) || "0"}px; border: ${
                        fnc_cnvs_selected_components.includes(element.uuid) ? "3px solid #7f00ff" : element.style.border
                    }; ${get_style_string(element.style)}`}
                    id="fnc_cnvs_component"
                />
            {:else if element.tag == "p"}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                <p
                    bind:this={fnc_cnvs_component_references[fnc_cnvs_component_references.length]}
                    id="fnc_cnvs_component"
                    style={`left: ${parseInt(element.style.left) + Math.floor(fnc_cnvs_canvasInitialX) || "0"}px;  top: ${parseInt(element.style.top) + Math.floor(fnc_cnvs_canvasInitialY) || "0"}px; border: ${
                        fnc_cnvs_selected_components.includes(element.uuid) ? "3px solid #7f00ff" : element.style.border
                    }; ${get_style_string(element.style)}`}
                >
                    {element.attributes.text}
                </p>
            {/if}
        {/each}
    </div>
</main>

<style>
    #fnc_cnvs_canvas {
        width: 5000px;
        height: 5000px;
        background-color: rgb(255, 255, 255);
        margin-top: 100px;
        margin-left: 200px;
    }
</style>

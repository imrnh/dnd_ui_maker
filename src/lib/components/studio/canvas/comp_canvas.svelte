<script lang="ts">
    import { onMount } from "svelte";
    import page from "$lib/test_page";
    import get_style_string from "$lib/utilities/style_string";
    import MakeDragRectangle from "$lib/dnd_operartions/generate_drag_rectangle";
    import MultipleSelectionOperations from "$lib/dnd_operartions/multiple_selection";
    import type ISelectedComponentStatusObject from "$lib/interfaces/i_selected_component_status";
    import type { IPageUI } from "$lib/interfaces/page_interfaces";
    import { flip } from "svelte/animate";

    let _cnv_fr_cmp_component_clicked: boolean = false;
    let _cnv_fr_cmp_canvas_clicked: boolean = false;
    let _cnv_fr_cmp_canvasInitialX: number, _cnv_fr_cmp_canvasInitialY: number;
    let _cnv_fr_cmp_scrollX: number = 0,
        _cnv_fr_cmp_scrollY: number = 0;

    let _cnv_fr_cmp_canvas: any = null;
    let _cnv_fr_cmp_components = [];
    let _cnv_fr_cmp_component_references: any = [];
    let _cnv_fr_cmp_selection_box: any;

    let _cnv_fr_cmp_multi_selection_obj: MultipleSelectionOperations = new MultipleSelectionOperations(page);
    let _cnv_fr_cmp_selection_box_drawer: MakeDragRectangle = new MakeDragRectangle();
    let _cnv_fr_cmp_selected_components: string[] = []; //update this while selecting elements.
    let _cnv_fr_cmp_selected_components_status: Record<string, ISelectedComponentStatusObject> = {};

    /**
     * _cnv_fr_cmp_canvas_mouse_down function.
     * @param e : click event
     *
     * set the _cnv_fr_cmp_canvas_clicked to `true`
     * also make sure the _cnv_fr_cmp_selection_box_drawer object get the mouse click position. So, when the user will try to use multiple selection option,
     * we can show a rectangle to make things feel easier.
     *
     */
    function _cnv_fr_cmp_canvas_mouse_down(e: any) {
        _cnv_fr_cmp_canvas_clicked = true;
        _cnv_fr_cmp_selection_box_drawer.setInitials(e, { sx: window.scrollX, sy: window.scrollY }); //get the mouse's initial click position.

        if (_cnv_fr_cmp_canvas_clicked && !_cnv_fr_cmp_component_clicked) {
            //reset the _cnv_fr_cmp_selected_components array.
            _cnv_fr_cmp_selected_components = [];
            _cnv_fr_cmp_selected_components_status = {};
        }
    }

    function _cnv_fr_cmp_handle_start_dragging(e: any, e_uuid: string, elm_index: number) {
        _cnv_fr_cmp_component_clicked = true;

        /**
         * put the component to the selected item first.
         *  if the clicked component doesn't exist in the _cnv_fr_cmp_selected_components array, then refresh the array and add the new clicked item to the selected element.
         */
        if (!_cnv_fr_cmp_selected_components.includes(e_uuid)) {
            _cnv_fr_cmp_selected_components = []; //nullify first
            _cnv_fr_cmp_selected_components_status = {}; //nullify first.

            _cnv_fr_cmp_selected_components = [e_uuid];
            _cnv_fr_cmp_selected_components_status[e_uuid] = {
                idx: elm_index,
                il: 0,
                it: 0,
            };
        }

        //now, calculate the mouse click position relative to the objects that are selected.
        page.ui_elements.map((element: IPageUI) => {
            if (_cnv_fr_cmp_selected_components.includes(element.uuid)) {
                for (let key in _cnv_fr_cmp_selected_components_status) {
                    if (_cnv_fr_cmp_selected_components_status.hasOwnProperty(key)) {
                        let component_info = _cnv_fr_cmp_selected_components_status[key];
                        component_info.il = e.clientX - _cnv_fr_cmp_component_references[component_info.idx].getBoundingClientRect().left;
                        component_info.it = e.clientY - _cnv_fr_cmp_component_references[component_info.idx].getBoundingClientRect().top;
                    }
                }
            }
        });

        //get the scroll position of windows.
        _cnv_fr_cmp_scrollX = window.scrollX;
        _cnv_fr_cmp_scrollY = window.scrollY;
    }

    function _cnv_fr_cmp_drag(e: any) {
        if (_cnv_fr_cmp_canvas_clicked && !_cnv_fr_cmp_component_clicked) {
            _cnv_fr_cmp_selection_box.style = _cnv_fr_cmp_selection_box_drawer.draw(e, { sx: window.scrollX, sy: window.scrollY });
            let calculated_elements_and_status = _cnv_fr_cmp_multi_selection_obj.get_selected_items(_cnv_fr_cmp_selection_box_drawer.get_rectangle_points(), { cx: _cnv_fr_cmp_canvasInitialX, cy: _cnv_fr_cmp_canvasInitialY });
            _cnv_fr_cmp_selected_components = calculated_elements_and_status[0];
            _cnv_fr_cmp_selected_components_status = calculated_elements_and_status[1];
        }

        if (_cnv_fr_cmp_component_clicked) {
            e.preventDefault();

            page.ui_elements.map((element: IPageUI) => {
                for (let key in _cnv_fr_cmp_selected_components_status) {
                    let obj = _cnv_fr_cmp_selected_components_status[key];
                    const x = e.clientX - obj.il + _cnv_fr_cmp_scrollX;
                    const y = e.clientY - obj.it + _cnv_fr_cmp_scrollY;

                    page.ui_elements[obj.idx].style.left = x - _cnv_fr_cmp_canvasInitialX + "px";
                    page.ui_elements[obj.idx].style.top = y - _cnv_fr_cmp_canvasInitialY + "px";
                }
            });
        }
    }

    function _cnv_fr_cmp_handle_stop_dragging() {
        if (_cnv_fr_cmp_canvas_clicked) {
            _cnv_fr_cmp_canvas_clicked = false;
            _cnv_fr_cmp_component_clicked = false;

            setTimeout(() => {
                _cnv_fr_cmp_selection_box.style = _cnv_fr_cmp_selection_box_drawer.reset_selection_box();
                _cnv_fr_cmp_refresh_selected_items();
            }, 100);
        }
    }

    /**
     * Utility functions
     */

    function _cnv_fr_cmp_load_scroll_amount() {
        _cnv_fr_cmp_scrollX = window.scrollX;
        _cnv_fr_cmp_scrollY = window.scrollY;
    }

    function _cnv_fr_cmp_get_canvas_initial_position() {
        _cnv_fr_cmp_canvasInitialX = _cnv_fr_cmp_canvas.getBoundingClientRect().left;
        _cnv_fr_cmp_canvasInitialY = _cnv_fr_cmp_canvas.getBoundingClientRect().top;
    }

    function _cnv_fr_cmp_refresh_selected_items() {
        let index = 0;
    }
    
    onMount(() => {
        _cnv_fr_cmp_canvas = document.querySelector("#_cnv_fr_cmp_canvas");
        _cnv_fr_cmp_components = Array.from(document.querySelectorAll("#_cnv_fr_cmp_component"));

        // Ensure the page always loads with _cnv_fr_cmp_scrollX and _cnv_fr_cmp_scrollY at 0
        window.addEventListener("beforeunload", () => {
            window.scrollTo(0, 0);
        });

        _cnv_fr_cmp_get_canvas_initial_position();
        _cnv_fr_cmp_load_scroll_amount();

        _cnv_fr_cmp_components.forEach((component, index) => {
            component.addEventListener("mousedown", (e) => {
                _cnv_fr_cmp_handle_start_dragging(e, page.ui_elements[index].uuid, index);
            });
        });

        let canvasWrapper = document.getElementById("_cnv_fr_cmp_canvas");

        canvasWrapper.addEventListener("mousedown", _cnv_fr_cmp_canvas_mouse_down);
        canvasWrapper.addEventListener("mousemove", _cnv_fr_cmp_drag);
        canvasWrapper.addEventListener("mouseup", _cnv_fr_cmp_handle_stop_dragging);
    });
</script>

<main>
    <div id="_cnv_fr_cmp_canvas">
        <div id="_cnv_fr_cmp_select_rectangle" bind:this={_cnv_fr_cmp_selection_box} />
        {#each page.ui_elements as element}
            {#if element.tag == "img"}
                <img
                    bind:this={_cnv_fr_cmp_component_references[_cnv_fr_cmp_component_references.length]}
                    src={element.attributes.src.toString()}
                    alt={element.attributes.alt.toString()}
                    style={`left: ${parseInt(element.style.left) + Math.floor(_cnv_fr_cmp_canvasInitialX) || "0"}px;  top: ${parseInt(element.style.top) + Math.floor(_cnv_fr_cmp_canvasInitialY) || "0"}px; border: ${
                        _cnv_fr_cmp_selected_components.includes(element.uuid) ? "3px solid #7f00ff" : element.style.border
                    }; ${get_style_string(element.style)}`}
                    id="_cnv_fr_cmp_component"
                />
            {:else if element.tag == "p"}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                <p
                    bind:this={_cnv_fr_cmp_component_references[_cnv_fr_cmp_component_references.length]}
                    id="_cnv_fr_cmp_component"
                    style={`left: ${parseInt(element.style.left) + Math.floor(_cnv_fr_cmp_canvasInitialX) || "0"}px;  top: ${parseInt(element.style.top) + Math.floor(_cnv_fr_cmp_canvasInitialY) || "0"}px; border: ${
                        _cnv_fr_cmp_selected_components.includes(element.uuid) ? "3px solid #7f00ff" : element.style.border
                    }; ${get_style_string(element.style)}`}
                >
                    {element.attributes.text}
                </p>
            {/if}
        {/each}
    </div>
</main>

<style>
    #_cnv_fr_cmp_canvas {
        width: 330px;
        height: 700px;
        background-color: rgb(190, 190, 190);
        margin-top: 200px;
        margin-left: 600px;
    }
</style>

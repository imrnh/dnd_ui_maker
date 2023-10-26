<script>
    import Uicanvas from "$lib/components/studio/canvas/uicanvas.svelte";
    import Sidebar from "$lib/components/studio/sidebar/sidebar.svelte";

    let isDragging_INNER_CANVAS = false;
    let startX_INNER_CANVAS = 0,
        startY_INNER_CANVAS = 0,
        initialX_INNER_CANVAS = 0,
        initialY_INNER_CANVAS = 0;

    let canvas_or_comp_clicked = false; //if any of the function's or ui's canvas clicked, make it true and canvas pane dragging will not work.

    /**
     * @param {boolean} clc_val
     */
    function updateCanvasOrCompClicked(clc_val) {
        canvas_or_comp_clicked = clc_val;
    }

    function handleMouseDown_INNER_CANVAS(event) {
        isDragging_INNER_CANVAS = true;
        initialX_INNER_CANVAS = event.clientX - startX_INNER_CANVAS;
        initialY_INNER_CANVAS = event.clientY - startY_INNER_CANVAS;
    }

    function handleMouseMove_INNER_CANVAS(event) {
        if (!isDragging_INNER_CANVAS) return;

        if (canvas_or_comp_clicked) return;

        startX_INNER_CANVAS = event.clientX - initialX_INNER_CANVAS;
        startY_INNER_CANVAS = event.clientY - initialY_INNER_CANVAS;
        const canvasHolder = document.querySelector(".canvas_holder");

        if (startX_INNER_CANVAS >= 0) startX_INNER_CANVAS = 0;
        if (startY_INNER_CANVAS >= 0) startY_INNER_CANVAS = 0;
        canvasHolder.style.transform = `translate(${startX_INNER_CANVAS}px, ${startY_INNER_CANVAS}px)`;
    }

    function handleMouseUp_INNER_CANVAS() {
        isDragging_INNER_CANVAS = false;
        canvas_or_comp_clicked = false; //whenever i stop mouse click in any positon of this canvas holder, just release.
    }

    //dyanamic phone styling. this will be then inside page object. Right now, this is templaing.
    let uiDesignCanvasDynamicSize = {
        width: "330px",
        height: "790px",
    };

    $: uiDesignCanvasDynamicSizeString = Object.entries(uiDesignCanvasDynamicSize)
        .map(([key, value]) => `${key}: ${value}`)
        .join("; ");

    //a demo function on how to change the size of the screen.
    const changeSize = () => {
        uiDesignCanvasDynamicSize["width"] = "700px";
        uiDesignCanvasDynamicSize["height"] = "1100px";
    };
</script>

<div class="page">
    <div class="sidebar">
        <Sidebar />
    </div>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="page_canvas">
        <div class="canvas_holder" on:mousedown={handleMouseDown_INNER_CANVAS} on:mousemove={handleMouseMove_INNER_CANVAS} on:mouseup={handleMouseUp_INNER_CANVAS} on:mouseleave={handleMouseUp_INNER_CANVAS}>
            <Uicanvas clickCallback={updateCanvasOrCompClicked} />
        </div>
    </div>
</div>

<style>
    @import "./style.css";
</style>

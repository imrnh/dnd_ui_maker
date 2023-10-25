<script>
    import Sidebar from "$lib/components/studio/sidebar/sidebar.svelte";

    let isDragging_INNER_CANVAS = false;
    let startX_INNER_CANVAS = 0,
        startY_INNER_CANVAS = 0,
        initialX_INNER_CANVAS,
        initialY_INNER_CANVAS;

    function handleMouseDown_INNER_CANVAS(event) {
        isDragging_INNER_CANVAS = true;
        initialX_INNER_CANVAS = event.clientX - startX_INNER_CANVAS;
        initialY_INNER_CANVAS = event.clientY - startY_INNER_CANVAS;
    }

    function handleMouseMove_INNER_CANVAS(event) {
        if (!isDragging_INNER_CANVAS) return;
        startX_INNER_CANVAS = event.clientX - initialX_INNER_CANVAS;
        startY_INNER_CANVAS = event.clientY - initialY_INNER_CANVAS;
        const canvasHolder = document.querySelector(".canvas_holder");

        if (startX_INNER_CANVAS >= 0) startX_INNER_CANVAS = 0;
        if (startY_INNER_CANVAS >= 0) startY_INNER_CANVAS = 0;
        canvasHolder.style.transform = `translate(${startX_INNER_CANVAS}px, ${startY_INNER_CANVAS}px)`;
    }

    function handleMouseUp_INNER_CANVAS() {
        isDragging_INNER_CANVAS = false;
    }

    //dyanamic phone styling. this will be then inside page object. Right now, this is templaing.
    let uiDesignCanvasDynamicSize = {
        width: "330px",
        height: "790px",
    };

    $: uiDesignCanvasDynamicSizeString = Object.entries(
        uiDesignCanvasDynamicSize
    )
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
        <div
            class="canvas_holder"
            on:mousedown={handleMouseDown_INNER_CANVAS}
            on:mousemove={handleMouseMove_INNER_CANVAS}
            on:mouseup={handleMouseUp_INNER_CANVAS}
            on:mouseleave={handleMouseUp_INNER_CANVAS}
        >
            <div
                class="ui_design_canvas"
                style={uiDesignCanvasDynamicSizeString}
            >
                fasdfasdf
            </div>
        </div>
    </div>
</div>

<style>
    @import "./style.css";
</style>

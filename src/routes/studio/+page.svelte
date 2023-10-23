<script>
    import CanvasMiniButtons from "$lib/components/canvas/canvas_mini_buttons.svelte";

    import gallary_icon from "$lib/assets/icons/gallery.png";
    import ui_design_icon from "$lib/assets/icons/ui_design.png";
    import action_components_icon from "$lib/assets/icons/web-development.png";
    import settings_icon from "$lib/assets/icons/setting-lines.png";

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
        "background-color": "orange",
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

    const viewMediaTab = () => {
        console.log("Trying to view media tab");
    };
</script>

<div class="page">
    <div class="page_pane_selection_sidebar">
        <CanvasMiniButtons
            button_name="Templates"
            image={gallary_icon}
            button_function={viewMediaTab}
        />

        <CanvasMiniButtons
            button_name="Elements"
            image={ui_design_icon}
            button_function={viewMediaTab}
        />

        <!-- variables -->
        <CanvasMiniButtons
            button_name="Variables"
            image={action_components_icon}
            button_function={viewMediaTab}
        />

        <CanvasMiniButtons
            button_name="Media"
            image={gallary_icon}
            button_function={viewMediaTab}
        />

        <CanvasMiniButtons
            button_name="Structure"
            image={action_components_icon}
            button_function={viewMediaTab}
        />

        <CanvasMiniButtons
            button_name="Actions"
            image={action_components_icon}
            button_function={viewMediaTab}
        />

        <CanvasMiniButtons
            button_name="Extension"
            image={gallary_icon}
            button_function={viewMediaTab}
        />

        <CanvasMiniButtons
            button_name="Settings"
            image={settings_icon}
            button_function={viewMediaTab}
        />
    </div>
    <div class="page_attribute_sidebar" />
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

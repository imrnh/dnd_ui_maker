<script lang="ts">
    import gallary_icon from "$lib/assets/icons/gallery.png";
    import ui_design_icon from "$lib/assets/icons/ui_design.png";
    import action_components_icon from "$lib/assets/icons/web-development.png";
    import settings_icon from "$lib/assets/icons/setting-lines.png";
    import layout_icon from "$lib/assets/icons/layout.png";
    import hierarchy_icon from "$lib/assets/icons/hierarchy.png";
    import variable_icon from "$lib/assets/icons/variables.png";
    import CanvasMiniButtons from "../canvas/canvas_mini_buttons.svelte";
    import TemplatesSidebar from "./design_components_sidebar.svelte";
    import DesignComponentsSidebar from "./design_components_sidebar.svelte";
    import TemplatesTab from "./templates_tab.svelte";

    let vWindow = 0;
</script>

<div class="sidebar_wrapper">
    <div class="sidebar_toggler_buttons_wrapper">
        <CanvasMiniButtons
            button_name="Templates"
            image={layout_icon}
            button_function={() => {
                vWindow = 0;
            }}
        />
        <CanvasMiniButtons
            button_name="Elements"
            image={ui_design_icon}
            button_function={() => {
                vWindow = 1;
            }}
        />
        <CanvasMiniButtons
            button_name="Variables"
            image={variable_icon}
            button_function={() => {
                vWindow = 2;
            }}
        />
        <CanvasMiniButtons
            button_name="Media"
            image={gallary_icon}
            button_function={() => {
                vWindow = 3;
            }}
        />
        <CanvasMiniButtons
            button_name="Structure"
            image={hierarchy_icon}
            button_function={() => {
                vWindow = 4;
            }}
        />
        <CanvasMiniButtons
            button_name="Actions"
            image={action_components_icon}
            button_function={() => {
                vWindow = 5;
            }}
        />
        <CanvasMiniButtons
            button_name="Extension"
            image={gallary_icon}
            button_function={() => {
                vWindow = 6;
            }}
        />
        <CanvasMiniButtons
            button_name="Settings"
            image={settings_icon}
            button_function={() => {
                vWindow = 7;
            }}
        />
    </div>

    <div class="sidebar_panes_wrapper">
        {#if vWindow == 0}
            <TemplatesTab />
        {:else if vWindow == 1}
            <DesignComponentsSidebar />
        {/if}
    </div>
</div>

<style>
    @import "$lib/assets/css/studio/sidebar.css";
</style>

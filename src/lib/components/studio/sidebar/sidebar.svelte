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
    import { onMount } from "svelte";

    let vWindow = 0;

    function setVWToCookie() {
        const cookieName = "sidebarCurrTab";
        const cookieValue = vWindow.toString();
        const expirationDays = 30;

        const d = new Date();
        d.setTime(d.getTime() + expirationDays * 24 * 60 * 60 * 1000);
        const expires = "expires=" + d.toUTCString();

        document.cookie = `${cookieName}=${cookieValue};${expires};path=/`;
    }

    function readCookie() {
        const cookieName = "sidebarCurrTab";
        const cookies = document.cookie.split(";");

        for (const cookie of cookies) {
            const [name, value] = cookie.trim().split("=");

            if (name === cookieName) {
                vWindow = parseInt(decodeURIComponent(value));
                break;
            }
        }
    }

    onMount(() => {
        readCookie();
    });
</script>

<div class="sidebar_wrapper">
    <div class="sidebar_toggler_buttons_wrapper">
        <CanvasMiniButtons
            button_name="Template"
            image={layout_icon}
            button_function={() => {
                vWindow = 0;
                setVWToCookie();
            }}
        />
        <CanvasMiniButtons
            button_name="Element"
            image={ui_design_icon}
            button_function={() => {
                vWindow = 1;
                setVWToCookie();
            }}
        />
        <CanvasMiniButtons
            button_name="Media"
            image={gallary_icon}
            button_function={() => {
                vWindow = 2;
                setVWToCookie();
            }}
        />
        <CanvasMiniButtons
            button_name="Variable"
            image={variable_icon}
            button_function={() => {
                vWindow = 3;
                setVWToCookie();
            }}
        />
        <CanvasMiniButtons
            button_name="Structure"
            image={hierarchy_icon}
            button_function={() => {
                vWindow = 4;
                setVWToCookie();
            }}
        />
        <CanvasMiniButtons
            button_name="Action"
            image={action_components_icon}
            button_function={() => {
                vWindow = 5;
                setVWToCookie();
            }}
        />
        <CanvasMiniButtons
            button_name="Extension"
            image={gallary_icon}
            button_function={() => {
                vWindow = 6;
                setVWToCookie();
            }}
        />
        <CanvasMiniButtons
            button_name="Setting"
            image={settings_icon}
            button_function={() => {
                vWindow = 7;
                setVWToCookie();
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

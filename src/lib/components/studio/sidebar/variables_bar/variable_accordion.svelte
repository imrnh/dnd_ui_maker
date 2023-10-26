<script lang="ts">
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faCircleChevronRight, faCircleChevronUp } from "@fortawesome/free-solid-svg-icons";
    import VariableUpdatePane from "./variable_update_pane.svelte";
    import type IVariable from "$lib/interfaces/variable_definition_interface";
    import type { VariableType } from "$lib/interfaces/variable_definition_interface";
    import varTypekeyToIndex from "$lib/utilities/variabletype_enum_key_to_index";

    let visible = false;

    function toggleVisible() {
        visible = !visible;
    }

    export let vname: string;
    export let vtype: VariableType;
    export let vvalue: any;

</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="accordian_wrapper">
    {#if visible}
        <div class="full_view"><VariableUpdatePane {vname} {vtype} {vvalue} closeViewPaneCallback={toggleVisible} /></div>
    {:else}
        <div on:click={toggleVisible} class="collapsed_view">
            <p class="cview_header">{vname}</p>
            <p class="cview_value">{vvalue}</p>
        </div>
    {/if}

    <div class="show_dropdown" on:click={toggleVisible}>
        {#if visible}
            <FontAwesomeIcon icon={faCircleChevronUp} />
        {:else}
            <FontAwesomeIcon icon={faCircleChevronRight} />
        {/if}
    </div>
</div>

<style>
    .accordian_wrapper {
        width: 100%;
        display: flex;
        background-color: #909cc4;
        border-radius: 10px;
        margin-top: 10px;
    }
    .collapsed_view {
        width: 90%;
        height: 60px;
        background-color: #909cc4;
        color: white;
        padding-top: 1px;
        padding-bottom: 8px;
        border-radius: 10px;
        cursor: pointer;
    }

    .cview_header {
        font-size: 19px;
        font-weight: 400;
        margin: 10px;
    }

    .cview_value {
        font-size: 10px;
        margin: 10px;
    }

    .show_dropdown {
        color: black;
        margin-top: 20px;
        color: white;
        margin-right: 10px;
    }
</style>

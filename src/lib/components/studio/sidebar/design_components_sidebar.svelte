<script lang="ts">
    import { onMount } from "svelte";
    import CompButton from "./comp_buttons/comp_button.svelte";
    import designComponentList, { type IUIComponent } from "$lib/utilities/design_components_list";
    import functionComponentList from "$lib/utilities/function_componetns_list";

    let isUICompActive = true; //default this one will be active.

    let filterText = "";

    function updateFilterText(e: any) {
        filterText = e.target.value;
    }

    function swapCompTab() {
        isUICompActive = !isUICompActive;
    }

    $: {
        function filterComponents(cmp_list: any[]) {
            console.log("Rechecking");
            var filteredList: IUIComponent[] = [];
            cmp_list.forEach((itm) => {
                if (itm.name.toLowerCase().includes(filterText.toLowerCase())) {
                    filteredList.push(itm);
                }
            });
            return filteredList;
        }
        filterComponents(isUICompActive ? designComponentList : functionComponentList);
    }
</script>

<div class="design_components_sidebar_wrapper">
    <div class="tab_button_group">
        <button on:click={swapCompTab} class="pane_toggler_tab_button" style={isUICompActive ? "background-color: rgb(245, 245, 245)" : ""}>UI Components</button>
        <button on:click={swapCompTab} class="pane_toggler_tab_button" style={!isUICompActive ? "background-color: rgb(245, 245, 245)" : ""}>Action Components</button>
    </div>

    <div class="tab_pane">
        <div class="search_components">
            <input placeholder="Search components" type="text" class="search_box" bind:value={filterText} on:input={updateFilterText} />
        </div>

        <div class="components_viewer_sidewindow">
            {#if isUICompActive}
                {#each designComponentList as dsg_cmp (dsg_cmp.unq_identifier)}
                    {#if filterText == "" || dsg_cmp.name.toLowerCase().includes(filterText.toLowerCase())}
                        <CompButton name={dsg_cmp.name} unique_identifier={dsg_cmp.unq_identifier} icon={dsg_cmp.icon} />
                    {/if}
                {/each}
            {:else}
                {#each functionComponentList as fnc_cmp (fnc_cmp.unq_identifier)}
                    {#if filterText == "" || fnc_cmp.name.toLowerCase().includes(filterText.toLowerCase())}
                        <CompButton name={fnc_cmp.name} unique_identifier={fnc_cmp.unq_identifier} icon={fnc_cmp.icon} />
                    {/if}
                {/each}
            {/if}
        </div>
    </div>
</div>

<style>
    @import "$lib/assets/css/studio/sidebar_ui_action_comps.css";
</style>

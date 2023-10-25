<script lang="ts">
    import TemplatesView from "./templates_view.svelte";

    let filterText = "";

    function updateFilterText(e: any) {
        filterText = e.target.value;
    }
</script>

<div class="elements_tab">
    <h3 class="tab_header_el">Templates to get started</h3>
    <div class="search_tempaltes">
        <input placeholder="Search templates" type="text" class="el_search_box" bind:value={filterText} on:input={updateFilterText} />
    </div>

    <div class="all_templates_view">
        <TemplatesView />
        <TemplatesView />
        <TemplatesView />
        <TemplatesView />
        <TemplatesView />
        <TemplatesView />
        <TemplatesView />
        <TemplatesView />
        <TemplatesView />
        <TemplatesView />
        <TemplatesView />
        <TemplatesView />
    </div>
</div>

<style>
    .elements_tab {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background-color: transparent;
        outline: hidden;
        position: relative;
    }
    .tab_header_el {
        float: left;
        margin-left: 15px;
    }

    .el_search_box {
        width: 236px;
        border-radius: 5px;
        height: 35px;
        background-color: transparent;
        border: 1px solid rgb(115, 115, 115);
        transition: 100ms;
        font-size: 14px;
        padding-left: 10px;
        color: black;
        margin-left: 15px;
        margin-top: 3px;
    }

    .el_search_box:focus {
        outline: none;
    }

    .all_templates_view {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        height: calc(100vh - 60px - 140px);
        position: absolute;
        overflow-y: scroll;
        top: 140px;
    }

    .all_templates_view::-webkit-scrollbar {
        width: 6px;
    }

    .all_templates_view::-webkit-scrollbar-thumb {
        background: #eeecec;
        min-height: 10px;
        border-radius: 100px;
    }

    .all_templates_view::-webkit-scrollbar-track {
        background: rgb(190, 190, 190);
    }
</style>

<script lang="ts">
    import { VariableType } from "$lib/interfaces/variable_definition_interface";
    import varTypekeyToIndex from "$lib/utilities/variabletype_enum_key_to_index";
    import { onMount } from "svelte";

    let varTypeArray: any[] = [];
    let selectedTypeIdx: number;

    function make_readable(str: string) {
        var first_char = str.substring(0, 1).toUpperCase();
        var new_str = first_char + str.substring(1, str.length);
        new_str = new_str.replace("_", " ");
        new_str = new_str.replace("_", " ");
        new_str = new_str.replace("_", " ");
        varTypeArray.push(new_str);
        return new_str;
    }

    Object.keys(VariableType).filter((key) => make_readable(VariableType[key]));

    function updateVariableInfo() {
        //update info here.

        closeViewPaneCallback();
    }

    export let vname: string;
    export let vtype: VariableType;
    export let vvalue: any;
    export let closeViewPaneCallback: any;

    onMount(() => {
        selectedTypeIdx = varTypekeyToIndex(vtype);
    });
</script>

<div class="vupdate_pane_wrapper">
    <br />
    <input type="text" class="vname" placeholder="Vraiable name" value={vname} />

    <label class="select_v_type_label">Variable type</label>
    <select name="var_type_selector" class="vtype">
        <option value="">Select a type</option>
        {#each varTypeArray as var_t, index}
            {#if index == selectedTypeIdx}
                <option value={var_t} selected>{var_t}</option>
            {:else}
                <option value={var_t}>{var_t}</option>
            {/if}
        {/each}
    </select>

    <input type="text" class="data_field" placeholder="Value" value={vvalue} />
    <center>
        <button class="vup_update" on:click={updateVariableInfo}>Update</button>
    </center>
</div>

<style>
    select {
        width: 82%;
    }
    input {
        width: 77%;
    }
    input,
    select {
        height: 25px;
        border: 0;
        border-radius: 5px;
        margin-left: 10px;
        margin-right: 10px;
        margin-top: 2px;
        margin-bottom: 5px;
        padding-left: 10px;
    }
    .vup_update {
        width: 50%;
        height: 30px;
        background-color: rgb(255, 255, 255);
        border: 0;
        border-radius: 5px;
        color: black;
        margin-bottom: 10px;
        cursor: pointer;
    }

    input:focus,
    select:focus,
    button:focus {
        outline: none;
    }

    .select_v_type_label {
        margin-left: 15px;
        font-size: 13px;
        color: white;
        margin-top: 5px;
    }
</style>

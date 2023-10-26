<script lang="ts">
    import { VariableType } from "$lib/interfaces/variable_definition_interface";
    import { faDeleteLeft, faTrash, faTrashAlt, faTrashCan } from "@fortawesome/free-solid-svg-icons";
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";

    let varTypeArray: string[] = [];
    let varTypeOriginalEnumKeyStr: string[] = [];

    let vNameInput = "";
    let vTypeInput = VariableType.text;
    let vValueInput: any[] = ['ad','fa','er'];

    /**
     * show '+ Add value' option for other types like select, array, object, multi_select etc.
     * @param e
     */
    let totalValueCount = vValueInput.length;
    let showAddMoreValue = false;

    function onNameChange(e: any) {
        vNameInput = e.target.value;
    }

    function onValueChange(e: any) {
        vNameInput = e.target.value;
    }

    function make_readable(str: string) {
        varTypeOriginalEnumKeyStr.push(str);
        var first_char = str.substring(0, 1).toUpperCase();
        var new_str = first_char + str.substring(1, str.length);
        new_str = new_str.replace("_", " ");
        new_str = new_str.replace("_", " ");
        new_str = new_str.replace("_", " ");
        varTypeArray.push(new_str);
        return new_str;
    }

    Object.keys(VariableType).filter((key) => make_readable(VariableType[key]));

    export let callback: any;

    function varCreated() {
        callback(vNameInput, vTypeInput, vValueInput);
    }

    function deleteValueField(indexToRemove: number) {
        if (vValueInput.length >= indexToRemove) {
            vValueInput.splice(indexToRemove, 1);
            totalValueCount--;
        }
    }
</script>

<div class="var_creation_pane_wrapper">
    <center><p class="cnvheaer">Add a new variable.</p></center>
    <input type="text" class="vname" placeholder="Vraiable name" bind:value={vNameInput} on:change={onNameChange} />

    <label class="select_v_type_label">Variable type</label>
    <select name="var_type_selector" class="vtype" bind:value={vTypeInput}>
        {#each varTypeArray as var_t, index}
            <option value={varTypeOriginalEnumKeyStr[index]}>{var_t}</option>
        {/each}
    </select>

    {#each Array(totalValueCount - 0) as _, vf_index}
        <div class="value_input_field_holder_div">
            <input type="text" class="data_field" placeholder="Value" bind:value={vValueInput[vf_index]} on:change={onValueChange} />
            {#if totalValueCount > 1}
                <button class="delete_field_button" on:click={() => deleteValueField(vf_index)}><FontAwesomeIcon icon={faTrash} /></button>
            {/if}
        </div>
    {/each}

    <center>
        <button class="add_new" on:click={varCreated}>Add</button>
    </center>
</div>

<style>
    .var_creation_pane_wrapper {
        width: 100%;
        min-height: 120px;
        background-color: #909cc4;
        padding-top: 5px;
        padding-bottom: 5px;
        border-radius: 4px;
    }

    .cnvheaer {
        color: white;
        font-size: 17px;
        font-weight: 500;
    }
    input {
        width: 87%;
    }

    select {
        width: 92%;
        border: 0;
    }

    input,
    select {
        height: 30px;
        margin-left: 10px;
        margin-right: 10px;
        margin-top: 5px;
        margin-bottom: 5px;
        border-radius: 8px;
        border: 0;
        padding-left: 10px;
    }

    input:focus,
    select:focus {
        outline: none;
    }
    .add_new {
        width: 100px;
        height: 32px;
        background-color: black;
        border: 0;
        color: white;
        border-radius: 5px;
        margin-top: 20px;
        margin-bottom: 10px;
        cursor: pointer;
    }

    .value_input_field_holder_div {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
    }
    .select_v_type_label {
        margin-left: 15px;
        font-size: 13px;
        color: white;
        margin-top: 5px;
    }

    .delete_field_button {
        border: 0;
        background-color: transparent;
        color: rgba(220, 0, 0, 0.8);
        font-size: 14px;
    }
</style>

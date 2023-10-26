<script lang="ts">
    import { VariableType } from "$lib/interfaces/variable_definition_interface";

    let varTypeArray: any[] = [];

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
</script>

<div class="var_creation_pane_wrapper">
    <input type="text" class="vname" placeholder="Vraiable name" />
    <select name="var_type_selector" class="vtype">
        <option value="">Select a type</option>
        {#each varTypeArray as var_t}
            <option value={var_t}>{var_t}</option>
        {/each}
    </select>

    <input type="text" class="data_field" placeholder="Value" />
    <center>
        <button class="add_new">Add</button>
    </center>
</div>

<style>
    .var_creation_pane_wrapper {
        width: 100%;
        min-height: 120px;
        background-color: #909cc4;
        padding-top: 5px;
        padding-bottom: 5px;
        border-radius: 10px;
    }

    input {
        width: 87%;
    }

    select {
        width: 92%;
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
</style>

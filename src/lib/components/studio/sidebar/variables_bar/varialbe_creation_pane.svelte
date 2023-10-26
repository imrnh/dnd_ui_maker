<script lang="ts">
    import { VariableType } from "$lib/interfaces/variable_definition_interface";
    import { faDeleteLeft, faL, faTrash, faTrashAlt, faTrashCan } from "@fortawesome/free-solid-svg-icons";
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import VarialbeCreationPane from "$lib/components/studio/sidebar/variables_bar/varialbe_creation_pane.svelte";

    let allowedVarTypeNameArray: string[] = []; //allowed variable types are stored in enum. We converted to array.
    let allowedVarTypeOriginalEnumKeyStr: string[] = [];
    const typeWithSingleField = [VariableType.text, VariableType.number, VariableType.color, VariableType.file];

    //show error to input field dynamically.
    let showErrorBorder = { show: false, idx: -1, msg: "Variable name cannot be empty" };



    /**
     * Input field values about the newly created variable user want to create will be assigned in the following variables.
     *
     * vValueInput is by default a list. So, we will just start with filling it with empty string.
     * By default, we will have only 1 field to enter data. That's what is stored in 'availableFields' var
     *
     */
    let vNameInput: string = "";
    let vTypeInput = VariableType.text;
    let vValueInput: any;

    let availableFields = 1;
    vValueInput = new Array(availableFields).fill("");

    /**
     * onNameChange -> accept changes of variable name and save it.
     * onValueChange -> accept changes of variable's value(s) and save them
     * @param e
     */
    function onNameChange(e: any) {
        vNameInput = e.target.value;

        if(isNestedByKeyValueList){
            //then automatically call callback to store the value.
            //this will store the values without submitting the form
            callback(vNameInput, vTypeInput, vValueInput, variableKeyPosition);
        }
    }
    function onValueChange(e: any, idx: number = 0) {
        vValueInput[idx] = e.target.value;
         if(isNestedByKeyValueList){
            //then automatically call callback to store the value.
            //this will store the values without submitting the form
            callback(vNameInput, vTypeInput, vValueInput, variableKeyPosition);
        }
    }
    function onSelectChange(e: any) {
        if (typeWithSingleField.includes(vTypeInput)) {
            //whenever user switches to fiels with only single value, delete all the other fields and keep just one.
            availableFields = 1;
            vValueInput = new Array(availableFields).fill("");
        }
    }

    /*
     *  @ make the ugly 'allowed data type' names in VariableType readable to normal people.
     *   Ex: objects are named as 'named_list'. this function made it 'Named list' which is more readable to normal users.
     *
     *  @ Object.keys(VariableType).filter((key) => make_readable(VariableType[key]));
     *      This line reads the enum keys iterateively and fetch the strng value of each key
     *
     */
    function make_readable(str: string) {
        allowedVarTypeOriginalEnumKeyStr.push(str);
        var first_char = str.substring(0, 1).toUpperCase();
        var new_str = first_char + str.substring(1, str.length);
        new_str = new_str.replace("_", " ");
        new_str = new_str.replace("_", " ");
        new_str = new_str.replace("_", " ");
        allowedVarTypeNameArray.push(new_str);
        return new_str;
    }

    Object.keys(VariableType).filter((key) => make_readable(VariableType[key]));

    /**
     *
     * Whenever 'add variable' button is clicked, it checks validity of the data and show error if necessary
     *
     * @param e : event
     */

    function varCreated(e: any) {
        e.preventDefault();

        if (vNameInput.trim() === "") {
            //check if name empty or not
            showErrorBorder = { show: true, idx: 0, msg: "Name cannot be null" }; //show error to border 1
            return;
        }

        for (let ix = 0; ix < availableFields; ix++) {
            //check if any value is empty or not
            if (vValueInput[ix] === "") {
                showErrorBorder = { show: true, idx: ix + 1, msg: "Value cannot be null" }; //ix + 1 cause we considered our value input fields start from position 1 and pos 0 is reserved for variable name.
                return;
            }
        }

        console.log(vValueInput);

        callback(vNameInput, vTypeInput, vValueInput);
    }

    /**
     * Delete a field from the values fiels if there are more than 1 fields.
     * @param indexToRemove
     */
    function deleteValueField(indexToRemove: number) {
        if (vValueInput.length >= indexToRemove) {
            vValueInput = vValueInput.filter((_: any, index: any) => index !== indexToRemove);
            availableFields = vValueInput.length;
        }
    }

    /**
     * add a single field to the values fields.
     */
    function addOneField() {
        if (vTypeInput != VariableType.key_value_list) {
            availableFields++;
            vValueInput.push("");
        } else {
            availableFields++;
            vValueInput.push(nestedCallbackResult);
        }
    }

    export let callback: any; //this function inside variable_tab will create the desired variable.
    export let isNestedByKeyValueList: boolean = false;
    export let variableKeyPosition: number; //only for nested keys in key-value pairs.

    /**
     * If nested component of key-value list,
     *   The callback function just needs to return whatever saved inside 3 of the variable_info variables (name, value, type).
     *  The parent will accept it and add to vValueInput list. Code genertor can then interpret.
     *
     */
    let nestedCallbackResult = { vName: "", vtype: VariableType.text, vValue: null };
    function callbackToPassToNested(name: string, vtype: VariableType, vValue: any, idx: number) {
        nestedCallbackResult.vName = name;
        nestedCallbackResult.vtype = vtype;
        nestedCallbackResult.vValue = vValue;

        vValueInput[idx] = nestedCallbackResult;

        console.log("Called nested. Pos:", variableKeyPosition);
    }

    console.log("My key position is: ", variableKeyPosition)

</script>

<div class="var_creation_pane_wrapper" style={isNestedByKeyValueList ? "background-color: #bec5db" : ""}>
    <center>
        {#if !isNestedByKeyValueList}
            <p class="cnvheaer">Add a new variable.</p>
        {/if}
    </center>

    <!-- Variable Name field -->
    <input type="text" class="vname" style={showErrorBorder.show && showErrorBorder.idx == 0 ? "border: 1px solid rgb(220,0,0)" : ""} placeholder="Vraiable name" bind:value={vNameInput} on:change={onNameChange} />
    {#if showErrorBorder.show && showErrorBorder.idx == 0}
        <p class="error_messag">{showErrorBorder.msg}</p>
    {/if}

    <div style="height: 10px" />

    <!-- Variable Type field -->
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class="select_v_type_label">Variable type</label>
    <select name="var_type_selector" class="vtype" bind:value={vTypeInput} on:change={onSelectChange}>
        {#each allowedVarTypeNameArray as var_t, index}
            <option value={allowedVarTypeOriginalEnumKeyStr[index]}>{var_t}</option>
        {/each}
    </select>

    <!-- Values input field -->
    {#if vTypeInput == VariableType.key_value_list}
        {#each vValueInput as value, vc_idx}
        <p>{vc_idx}</p>
            <div class="named_list_new_named_var_creation_div">
                <div style="display: flex; justify-content: space-between;">
                    <p style="font-size: 15px; color: white; padding-left: 10px">Add a new key</p>
                    {#if availableFields > 1}
                        <button class="delete_field_button" on:click={() => deleteValueField(vc_idx)} style="margin-right: 10px">
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    {/if}
                </div>

                <VarialbeCreationPane callback={callbackToPassToNested} isNestedByKeyValueList={true} variableKeyPosition={vc_idx} />
            </div>
        {/each}
    {:else}
        {#each vValueInput as value, vf_index}
            <div class="value_input_field_holder_div">
                <input type="text" class="data_field" placeholder="Value" bind:value on:change={(e) => onValueChange(e, vf_index)} style={showErrorBorder.show && showErrorBorder.idx == vf_index + 1 ? "border: 1px solid rgb(220,0,0)" : ""} />
                {#if availableFields > 1}
                    <button class="delete_field_button" on:click={() => deleteValueField(vf_index)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                {/if}
            </div>
            {#if showErrorBorder.show && showErrorBorder.idx == vf_index + 1}
                <p class="error_messag">{showErrorBorder.msg}</p>
            {/if}
        {/each}
    {/if}

    {#if !typeWithSingleField.includes(vTypeInput)}
        <button class="add_one_more_field_btn" on:click={addOneField}><u>+ add 1 {vTypeInput == VariableType.key_value_list ? "key" : "field"}</u></button> <br />
    {/if}

    {#if !isNestedByKeyValueList}
        <center>
            <button class="add_new" on:click={varCreated}>Add</button>
        </center>
    {/if}
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

    /* 909cc4 */
    .cnvheaer {
        color: white;
        font-size: 17px;
        font-weight: 500;
    }
    input {
        width: 87%;
    }

    select {
        width: 88%;
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

    .error_messag {
        font-size: 13px;
        color: rgb(220, 14, 14);
        margin-left: 15px;
        margin-top: 0px;
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
    }

    .delete_field_button {
        border: 0;
        background-color: transparent;
        color: rgba(220, 0, 0, 0.8);
        font-size: 14px;
    }
    .add_one_more_field_btn {
        margin: 0;
        border: 0;
        background-color: transparent;
        font-size: 13px;
        color: rgb(58, 58, 58);
        cursor: pointer;
        float: right;
        margin-right: 15px;
    }

    .named_list_new_named_var_creation_div {
        width: 85%;
        margin-left: 10%;
        margin-top: 25px;
        margin-right: 35px;
        border: 1px solid rgb(211, 210, 210);
        border-radius: 10px;
        background-color: #bec5db;
        margin-bottom: 10px;
    }
</style>

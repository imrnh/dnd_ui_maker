<script lang="ts">
    import { VariableType } from "$lib/interfaces/variable_definition_interface";
    import Variable from "$lib/models/MVariable";
    import VarTypeToReadableString from "$lib/utilities/vartype_enum_key_to_readable_string";
    import { faTrash } from "@fortawesome/free-solid-svg-icons";
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";

    export let variable: Variable = new Variable("", VariableType.text, "");
    export let callback: any;
    export let _isUpdatePane: boolean = false; //if this is variable updater pane or variable creation pane.
    export let _forKVPairInput: boolean = false; //is this a input field for kv-pair or not
    export let _deletePaneCallback: any = null; //on for list type. to remove this field from the list.
    export let _index: number; //only for nested.

    let showErr = { show: false, field_idx: -1, msg: "" };

    let allwdTypes = new VarTypeToReadableString().getReadableStrs("svd");
    let allwdTypesInReadableFormat: string[] = allwdTypes.readable;
    let allwdTypesOriginalFormat: string[] = allwdTypes.original;

    function onNameChange(e: any) {
        variable.name = e.target.value;
        refresh_error(0);
    }
    function onTypeChange(e: any) {
        variable.type = e.target.value;
    }
    function onValueChange(e: any) {
        variable.value = e.target.value;
        if (_forKVPairInput) {
            // console.log("Calling neted callback for child from onValueChange of SingleValuedvariablePane");
            callback(null, variable, _index);
            // console.log("Var is: ", variable)
        }
    }

    //own callback.
    function create(e: any) {
        if (!validate_input()) return;
        callback(e, variable); //this is the callback from the variable_sidebar
    }

    function validate_input() {
        if (variable.name == "") {
            showErr = { show: true, field_idx: 0, msg: "Variable name cannot be null" };
            return false;
        }
        return true;
    }
    function refresh_error(idx: number) {
        if (showErr.show && showErr.field_idx == idx) {
            showErr.show = false;
            showErr.field_idx = -1;
            showErr.msg = "";
        }
    }
</script>

<div class="svvcp_wrapper" style={_forKVPairInput ? "margin: 0px; padding: 0px; padding-bottom: 3px; background-color: #bec5db" : ""}>
    <center>
        <!-- if this is for taking input of a kvpair's pair -->
        {#if _forKVPairInput}
            <div class="kv_pair_inputs_wrp" style="margin-top: 3px; margin-bottom: 5px;">
                <div class="value_group">
                    <input type="text" class="value_field" style="border-top-right-radius: 0; border-bottom-right-radius: 0; margin-right: 0px;" placeholder="Value (optional)" bind:value={variable.value} on:change={onValueChange} />
                </div>
                <select name="var_type_selector" class="type_field" style="border-top-left-radius: 0; border-bottom-left-radius: 0; margin-left: -10px" bind:value={variable.type} on:change={onTypeChange}>
                    <option value="">Type</option>
                    {#each allwdTypesInReadableFormat as var_t, index}
                        <option value={allwdTypesOriginalFormat[index]}>{var_t}</option>
                    {/each}
                </select>
                <button class="trash_btn_for_list" on:click={_deletePaneCallback}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        {:else}
            <!-- if this is for creating a variable. -->
            <h3>Add a new variable</h3>
            <div class="name_type_wrp">
                <input type="text" class="name_field" style={showErr.show && showErr.field_idx == 0 ? "border: 1px solid rgb(220,0,0)" : ""} required placeholder="Name" bind:value={variable.name} on:change={onNameChange} />
                <select name="var_type_selector" class="type_field" bind:value={variable.type} on:change={onTypeChange}>
                    <option value="fdf" selected>Type</option>
                    {#each allwdTypesInReadableFormat as var_t, index}
                        <option value={allwdTypesOriginalFormat[index]}>{var_t}</option>
                    {/each}
                </select>
            </div>
            {#if showErr.show && showErr.field_idx == 0}
                <p class="error_msg">{showErr.msg}</p>
            {/if}
            <div class="value_group">
                <input type="text" class="value_field" placeholder="Value (optional)" bind:value={variable.value} on:change={onValueChange} />
            </div>

            <button class="create_btn" on:click={create}>{_isUpdatePane ? "Update" : "Add"}</button>
        {/if}
    </center>
</div>

<style>
    @import "$css/studio/variable_sidebar_single_valued.css";
</style>

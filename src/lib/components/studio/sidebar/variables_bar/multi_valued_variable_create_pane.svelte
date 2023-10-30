<script lang="ts">
    /**
     *
     *  @@@@@@@@@@@@@@@@@@@@@@@@@@
     *
     *
     *   Right now, we only allowed list type to reduce complexity.
     *
     *
     *
     */

    import { VariableType } from "$lib/interfaces/variable_definition_interface";
    import KVPair from "$lib/models/MKeyValuePair";
    import Variable from "$lib/models/MVariable";
    import VarTypeToReadableString from "$lib/utilities/vartype_enum_key_to_readable_string";
    import SingleValuedVariableCreatePane from "./single_valued_variable_create_pane.svelte";
    import MultiValuedVariableCreatePane from "./multi_valued_variable_create_pane.svelte";

    export let kv_pair: KVPair = new KVPair("", VariableType.list, []);
    export let callback: any;
    export let _isUpdatePane: boolean = false; //if this is kv_pair updater pane or kv_pair creation pane.
    export let _forKVPairInput: boolean = false; //is this a input field for kv-pair or not
    export let _index: number; //only for nested.

    let showErr = { show: false, field_idx: -1, msg: "" };
    let allwdTypes = new VarTypeToReadableString().getReadableStrs("mvd");
    let allwdTypesInReadableFormat: string[] = allwdTypes.readable;
    let allwdTypesOriginalFormat: string[] = allwdTypes.original;
    let availableFields = 1;

    function onNameChange(e: any) {
        kv_pair.name = e.target.value;
        refresh_error(0);
    }
    function onTypeChange(e: any) {
        kv_pair.type = e.target.value;
    }
    function onValueChange(e: any) {
        kv_pair.value = e.target.value;
        callback(e, kv_pair, _index);
    }

    //self callback. Cannot be called without an add button.
    function create(e: any) {
        if (!validate_input()) return;
        callback(e ,kv_pair); //this is the callback from the variable_sidebar
        //create the final variable.

        // console.log("Created the kvpair variable");
        // console.log("Values are:", kv_pair.value);
    }

    //callback for child components
    function callback_for_child(e: any, new_instance: any, idx: number) {
        kv_pair.value[idx] = new_instance;
        callback(e, kv_pair, idx); //pass the value to the previous component.
    }

    /**
     * Utility functions.
     */

    function validate_input() {
        if (kv_pair.name == "") {
            showErr = { show: true, field_idx: 0, msg: "list name cannot be null" };
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

    function addFields(isSingleValuedField: boolean) {
        availableFields++;
        if (isSingleValuedField) {
            kv_pair.value = [...kv_pair.value, new Variable("", VariableType.text, "")]; //a empty dummy variable has been pushed
        } else {
            kv_pair.value = [...kv_pair.value, new KVPair("", VariableType.list, [])]; //a empty dummy variable has been pushed
        }

        console.log(kv_pair.value);
    }
</script>

<div class="svvcp_wrapper">
    <center>
        <!-- if this is nested kvpair -->
        {#if _forKVPairInput}
            <!-- Name is not necessary now. user can access with index instead as it is nested. -->

            <div class="nested_kv_pair_wrapper">
                <div class="value_group">
                    {#each kv_pair.value as field, idx}
                        {#if field instanceof Variable}
                            <SingleValuedVariableCreatePane callback={callback_for_child} _forKVPairInput={true} variable={kv_pair.value[idx]} _index={idx} />
                        {:else if field instanceof KVPair}
                            <MultiValuedVariableCreatePane callback={callback_for_child} _forKVPairInput={true} kv_pair={kv_pair.value[idx]} _index={idx} />
                        {/if}
                        <!-- <input type="text" class="value_field" placeholder="Value" bind:value={kv_pair.value[idx].value} on:change={onValueChange} /> -->
                    {/each}
                </div>
                <hr />

                <div class="what_to_add_buttons">
                    <button class="add_a_variable_to_list" on:click={(e) => addFields(true)}> + add a variable </button> &nbsp;or&nbsp;
                    <button class="add_a_list_to_list" on:click={(e) => addFields(false)}> + add a list </button>
                </div>
            </div>
        {:else}
            <!-- if this is for creating a kv_pair. -->
            <h3>Add a List</h3>
            <div class="name_type_wrp">
                <input type="text" class="name_field" style={showErr.show && showErr.field_idx == 0 ? "border: 1px solid rgb(220,0,0)" : ""} required placeholder="Name" bind:value={kv_pair.name} on:change={onNameChange} />
                <!-- <select name="var_type_selector" class="type_field" bind:value={kv_pair.type} on:change={onTypeChange}>
                    <option value="">Type</option>
                    {#each allwdTypesInReadableFormat as var_t, index}
                        <option value={allwdTypesOriginalFormat[index]}>{var_t}</option>
                    {/each}
                </select> -->
            </div>
            {#if showErr.show && showErr.field_idx == 0}
                <p class="error_msg">{showErr.msg}</p>
            {/if}

            <div class="value_group">
                {#each kv_pair.value as field, idx}
                    {#if kv_pair.type == VariableType.key_value_pair}
                        <div style="margin-top:10px" />
                        <input
                            type="text"
                            class="name_field"
                            style={showErr.show && showErr.field_idx == 0 ? "border: 1px solid rgb(220,0,0); width:90%;" : "width:90%;"}
                            required
                            placeholder="Name"
                            bind:value={kv_pair.name}
                            on:change={onNameChange}
                        />
                    {/if}
                    {#if field instanceof Variable}
                        <SingleValuedVariableCreatePane callback={callback_for_child} _forKVPairInput={true} _index={idx}/>
                    {:else if field instanceof KVPair}
                        <MultiValuedVariableCreatePane callback = {callback_for_child} _forKVPairInput={true} _index = {idx} />
                    {/if}
                {/each}
            </div>
            <hr />

            <div class="what_to_add_buttons">
                <button class="add_a_variable_to_list" on:click={(e) => addFields(true)}> + add a variable </button> &nbsp;or&nbsp;
                <button class="add_a_list_to_list" on:click={(e) => addFields(false)}> + add a list </button>
            </div>

            <button class="create_btn" on:click={create}>{_isUpdatePane ? "Update" : "Add"}</button>
        {/if}
    </center>
</div>

<style>
    @import "$lib/assets/css/studio/variable_sidebar_multi_valued.css";
</style>

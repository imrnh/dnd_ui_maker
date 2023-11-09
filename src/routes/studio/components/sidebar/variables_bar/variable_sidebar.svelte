<script lang="ts">
    import type IVariable from "$lib/interfaces/variable_definition_interface";
    import { VariableType } from "$lib/interfaces/variable_definition_interface";
    import type KVPair from "$lib/models/MKeyValuePair";
    import type Variable from "$lib/models/MVariable";
    import MultiValuedVariableCreatePane from "./multi_valued_variable_create_pane.svelte";
    import SingleValuedVariableCreatePane from "./single_valued_variable_create_pane.svelte";
    import VariableAccordion from "./variable_accordion.svelte";
    import VarialbeCreationPane from "./varialbe_creation_pane.svelte";
    import { show_modal, modal_body } from "$lib/store";

    //get all variables from page.
    let variables: IVariable[] = [
        {
            name: "API_KEY",
            type: VariableType.text,
            value: ["1a2B#3C4d$5E6f&7G8h*9I0j"],
        },

        {
            name: "Phone Number",
            type: VariableType.number,
            value: [9968916751],
        },
        {
            name: "Shopping list",
            type: VariableType.list,
            value: [45, 879, 4265],
        },
    ];

    let new_variable_instance: IVariable = {
        name: "",
        value: undefined,
        type: VariableType.text,
    };

    let vcpVisible = false;
    let vlVisible = false;

    function modalToggler(pane: any) {
        show_modal.set(true);
        modal_body.set(pane);
    }

    function createNewVar() {
        vcpVisible = true;
        modalToggler(SingleValuedVariableCreatePane);
    }

    function createNewList() {
        vcpVisible = true;
        vlVisible = true;
        modalToggler(MultiValuedVariableCreatePane);
    }

    function afterCreationOrUpdateCallback() {
        vcpVisible = false;
        vlVisible = false;
    }

    /**
     *
     * IVariable holds list similar to variable. Just inplace of value, we have a list of values.
     *
     * KVPair and Variable classes are just to take input.
     * IVariable interface is the original variable type that can be inserted into db.
     */

    function createCallback(event: any, passed_variable: Variable | KVPair) {
        console.log("Callback of variable creation called with event = ", event);
        if (event != null) {
            //create
            new_variable_instance.name = passed_variable.name;
            new_variable_instance.type = passed_variable.type;
            new_variable_instance.value = passed_variable.value;

            variables.push(new_variable_instance);

            console.log("vars: ", variables);

            afterCreationOrUpdateCallback();
        }
    }

    function updateCallback() {
        afterCreationOrUpdateCallback();
    }
</script>

<div class="variable_sidebar">
    <div class="vs_header">
        <button on:click={createNewVar} class="add_new_var"> + &nbsp;New </button>
        <button on:click={createNewList} class="add_new_var"> + &nbsp;List</button>
    </div>

    <div style="height:30px;" />

    {#each variables as variable (variable.name)}
        <VariableAccordion vname={variable.name} vvalue={variable.value} vtype={variable.type} />
    {/each}

    <!-- {#if vcpVisible}
        <br />

        {#if vlVisible}
            <MultiValuedVariableCreatePane callback={createCallback} _index={0} />
        {:else}
            <SingleValuedVariableCreatePane callback={createCallback} _index={0} />
        {/if}
    {/if} -->
</div>

<style>
    .variable_sidebar {
        width: 250px;
        height: calc(100vh - 60px);
    }
    .vs_header {
        width: 100%;
        height: 55px;
        background-color: transparent;
        padding-left: 10px;
        margin-top: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .add_new_var {
        width: 80px;
        height: 30px;
        background-color: black;
        border: 0;
        border-radius: 5px;
        color: white;
        font-size: 14px;
        cursor: pointer;
        margin-right: 15px;
        transition: 200ms;
    }
    .add_new_var:hover {
        background-color: white;
        border: 1px solid black;
        color: black;
    }
</style>

<script lang="ts">
    import type IVariable from "$lib/interfaces/variable_definition_interface";
    import { VariableType } from "$lib/interfaces/variable_definition_interface";
    import { faL } from "@fortawesome/free-solid-svg-icons";
    import VariableAccordion from "./variable_accordion.svelte";
    import VarialbeCreationPane from "./varialbe_creation_pane.svelte";

    //get all variables from page.
    let variables: IVariable[] = [
        {
            name: "API_KEY",
            type: VariableType.text,
            value: "1a2B#3C4d$5E6f&7G8h*9I0j",
        },

        {
            name: "Phone Number",
            type: VariableType.number,
            value: 9968916751,
        },
    ];

    let vcpVisible = false;
    function createNewVar() {
        vcpVisible = true;
    }

    function varCreationCallback(vname: string, vtype: VariableType, vvalue: any){

        //check the length and type before inserting.

        vcpVisible = false;
    }
</script>

<div class="variable_sidebar">
    <div class="vs_header">
        <h3>Variables</h3>
        <button on:click={createNewVar} class="add_new_var"> + &nbsp;New </button>
    </div>

    <div style="height:30px;" />

    {#each variables as variable (variable.name)}
        <VariableAccordion vname={variable.name} vvalue={variable.value} vtype={variable.type} />
    {/each}

    {#if vcpVisible}
    <br>
        <VarialbeCreationPane callback={varCreationCallback} variableKeyPosition = {0}/>
    {/if}
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

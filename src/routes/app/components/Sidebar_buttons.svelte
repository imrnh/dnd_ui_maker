<script lang="ts">
    export let name: string;
    export let callback: any;
</script>

<button on:click={callback} class="sidebar_button_wrapper">
    {name}
</button>


<style>
    .sidebar_button_wrapper{
        width: 300px;
        height: 43px;
        background-color: transparent;
        border: 0;
        font-size: 17px;
        font-weight: 400;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-left: 15px;
        border-radius: 10px;
        font-family: 'Nunito Sans', sans-serif;
    }

    .sidebar_button_wrapper:hover{
        background-color: rgb(245, 245, 245);
    }
</style>
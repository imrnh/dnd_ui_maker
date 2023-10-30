<!-- dummy. delete it. it was just for testing. used by @ch_rec +page.svelte -->

<script lang="ts">
    import Cmp from "$lib/components/cmp.svelte";

    let showCmp: boolean = false;
    let myVal: any[] = [];
    export let callback: any;
    export let index: number;

    function cb(e: any, child_val: any[], child_idx: number) {
        myVal[child_idx] = child_val;
        callback(e, myVal, index);
    }

    let fg = [0, 1, 2];
</script>

<center>
    <div class="main">
        <button
            on:click={() => {
                showCmp = true;
            }}>Add Componnet</button
        >

        <button
            on:click={() => {
                console.log(myVal);
            }}>show</button
        >

        <br />

        {#if !showCmp}
            <input type="text" bind:value={myVal[0]} />
        {/if}
        <button on:click={(e)=>cb(e, myVal[0], 0)}>Save me</button>

        {#if showCmp}
            {#each fg as g, idx}
                <Cmp callback={cb} index={idx} />
            {/each}
        {/if}
    </div>
</center>

<style>
    .main {
        width: 80%;
        height: 100%;
        min-height: 70px;
        background-color: rgb(151, 190, 216);
        border: 1px solid black;
        margin: 15px;
        padding-top: 20px;
    }
</style>

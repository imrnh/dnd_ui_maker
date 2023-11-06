<script>
    // @ts-nocheck
    import { modal_body, show_modal } from "$lib/store.ts";

    $: shown = $show_modal;

    export let width = "auto";
    export let height = "auto";

    function hideMe() {
        show_modal.set(false);
        modal_body.set(null);
    }
</script>

{#if shown}
    <center>
        <div class="modal-wrapper">
            <div class="modal" id="modal" style={`width: ${width}; height: ${height}`}>
                <svelte:component this={$modal_body} />
            </div>
        </div>
        <div class="model_overflow" role="button" on:click={hideMe} />
    </center>
{/if}

<style>
    .modal-wrapper {
        position: fixed;
        width: auto;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%); /* making the div move -50% left and top to its own width and height */
        border-radius: 10px;
        border: 0;
    box-shadow: -3px 3px 11px 0px rgba(237,237,237,0.25);
-webkit-box-shadow: -3px 3px 11px 0px rgba(237,237,237,0.25);
-moz-box-shadow: -3px 3px 11px 0px rgba(237,237,237,0.25);
    }
    .modal {
        margin: auto auto;
        background-color: white;
        padding: 15px;
        border-radius: 10px;
    }

    .model_overflow {
        width: 100vw;
        height: 100vh;
        background-color: white;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 99;
        opacity: 0.9;
    }
</style>

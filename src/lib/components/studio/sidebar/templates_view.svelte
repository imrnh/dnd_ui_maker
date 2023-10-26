<script lang="ts">
    function showTemplateFullView() {}

    export let name: string;
    export let thumbnail: any; //thumbnail image
    export let callback: any;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-interactive-supports-focus -->
<div class="template_wrapper" role="button" on:click={callback}>
    <center>
        <img src={thumbnail} alt={name} class="rigid_tmplate_thumnail" title="Click to view" />
    </center>
</div>

<style>
    .template_wrapper {
        width: 130px;
        height: 270px;
        background-color: transparent;
        margin: 2px;
        border-radius: 7px;
        cursor: pointer;
 
    }

    .rigid_tmplate_thumnail {
        width: 130px;
        height: 270px;
        border-radius: 7px;
    }
</style>

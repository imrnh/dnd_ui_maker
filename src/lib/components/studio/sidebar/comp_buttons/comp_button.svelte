<script lang="ts">
    import templates from "$lib/assets/icons/layout.png";

    export let name: string;
    export let icon: any;
    export let unique_identifier: string;

    function handleDragStart(event: any) {
        event.dataTransfer.setData("text/plain", unique_identifier);
    }
</script>

<div
    draggable="true"
    class="comp_button_wrapper"
    on:dragstart={handleDragStart}
>
    <center>
        <img src={icon} alt="" />
        <p>{name}</p>
    </center>

    <div class="cmb_overlay" />
</div>

<style>
    .comp_button_wrapper {
        width: 120px;
        height: 80px;
        background-color: #f3f3f3;
        margin: 5px;
        position: relative;
        transition: 100ms;
    }

    .comp_button_wrapper img {
        width: 25px;
        height: 25px;
        margin-top: 15px;
    }
    .comp_button_wrapper p {
        margin-top: 6px;
        font-size: 13px;
        font-weight: 400;
        letter-spacing: 0.05rem;
        color: rgb(54, 54, 54);
    }

    .cmb_overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: black;
        opacity: 0;
        left: 0;
        transition: 100ms;
        top: 0;
    }
</style>

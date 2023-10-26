<script lang="ts">
    export let button_name: string;
    export let button_function: any;
    export let image: any;
</script>

<button class="canvas_mini_button" on:click={button_function}>
    <img src={image} alt="" class="icon" />
    <div class="name">
        {button_name}
    </div>
</button>

<style>
    .canvas_mini_button {
        width: 55px;
        height: 55px;
        background-color: rgb(255, 255, 255);
        border: 0;
        border-radius: 10px;
        cursor: pointer;
        color: rgb(66, 69, 75);
        padding-top: 8px;
        margin-top: 10px;
    }

    .canvas_mini_button:hover {
        background-color: rgb(245, 245, 245);
        border: 1px solid rgb(230, 230, 230);
    }

    .icon {
        width: 17px;
        height: 17px;
    }

    .name {
        font-family: "Inter", sans-serif;
        margin-top: 1px;
        font-size: 10px;
    }
</style>

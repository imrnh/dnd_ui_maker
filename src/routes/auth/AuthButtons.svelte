<script lang="ts">
    export let buttonName: any;
    export let icon: any = null;
    export let callback: any;
    export let isRed = false;
</script>

<button class="auth_buttons" on:click={callback} style={isRed ? "background-color: #f1a2a263; border: 1px solid rgba(231, 97, 97, 0.781); color: rgba(248, 54, 54, 0.863);" : ""}>
    {#if icon != null}
        <img src={icon} />
    {/if}
    <p>{buttonName}</p>
</button>

<style>
    .auth_buttons {
        width: 320px;
        height: 35px;
        border: 1px solid gainsboro;
        border-radius: 5px;
        font-size: 16px;
        background-color: rgb(251, 251, 251);
        font-weight: 400;
        font-family: "Nunito Sans", sans-serif;
        margin-top: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .auth_buttons img {
        width: 15px;
        height: 15px;
    }
    .auth_buttons p {
        margin-left: 10px;
    }
</style>

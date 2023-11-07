<script>
    import Modal from "./Modal.svelte";
    let modal;
</script>

<html lang="en">
    <body style="position: fixed;">
        <slot />
        <Modal bind:this={modal} />
    </body>
</html>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");
    * {
        margin: 0;
    }

    body {
        margin: 0;
        font-family: "Inter", sans-serif;
        position: relative;
    }

    *:focus {
        outline: none;
    }

</style>

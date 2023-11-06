<script>
    let apps = [
        {
            uid: "345rsdfsf",
            name: "Homepage",
            ui: [],
            action: [],
        },
    ];
</script>

<main class="main_apps_info_wrapper">
    <div class="apps_info_wrapper">
        <div class="apps_sidebar">sidebar</div>

        <div class="page_view_section">options</div>
    </div>
</main>

<style>
    .main_apps_info_wrapper {
        width: 100vw;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: start;
        margin-top: 50px;
    }
    .apps_info_wrapper {
        width: 1200px;
        height: auto;
        margin-top: 10px;
        display: flex;
        align-items: start;
    }
    .apps_sidebar {
        width: 350px;
        min-height: 100vh;
    }

    .page_view_section {
        max-width: 770px;
        min-height: 100vh;
    }
</style>

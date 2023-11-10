<script lang="ts">
    import type IApp from "$lib/interfaces/root/app_interaface";
    import type { IAppSettings } from "$lib/interfaces/root/app_interaface";

    export let settings: IAppSettings;
    export let app: IApp;

    let new_app_instance = app;

    function generalSettingsUpdate(event: any){
        event.preventDefault();
    }
</script>

<div class="app_settings_wrapper">
    <h1>Settings</h1>

    <div class="form_group">
        <h2 style="font-size: 26px;">App Info</h2>
        <div style="background-color: rgb(240,240,240); width: 530px; height: 1px;" />
        <form class="general_settings_form">
            <input type="text" class="general_text_fiels" placeholder="App name" value={new_app_instance.name} />
            <input type="number" class="general_text_fiels" placeholder="Minimum Age requirements" value={new_app_instance.minimum_age_requirements} />

            <!-- <textarea class="general_text_fiels" style="height: 90px; padding-top: 10px; max-width: 500px;" placeholder="Description (optional)" value={new_app_instance.description} /> <br /> -->

            <p class="input_label">Initial Page</p>
            <input type="text" class="general_text_fiels" placeholder="Initial Page Route" value={new_app_instance.settings.homepage} />

            <br />
            <button type="submit" on:click={generalSettingsUpdate} class="submit_general_form">Save</button>
        </form>
    </div>

    <br /><br />
    <br />
    <div class="form_group">
        <h2 style="font-size:  26px;">Publish Credentials</h2>
        <div style="background-color: rgb(240,240,240); width: 530px; height: 1px;" />
        <form class="general_settings_form">
            <input type="text" class="general_text_fiels" placeholder="App name" value={new_app_instance.name} />
            <input type="number" class="general_text_fiels" placeholder="Minimum Age requirements" value={new_app_instance.minimum_age_requirements} />

            <!-- <textarea class="general_text_fiels" style="height: 90px; padding-top: 10px; max-width: 500px;" placeholder="Description (optional)" value={new_app_instance.description} /> <br /> -->

            <p class="input_label">Initial Page</p>
            <input type="text" class="general_text_fiels" placeholder="Initial Page Route" value={new_app_instance.settings.homepage} />

            <br />
            <button type="submit" class="submit_general_form">Save</button>
        </form>
    </div>
</div>

<style>
    @import "$css/app-settins-page.css";
</style>

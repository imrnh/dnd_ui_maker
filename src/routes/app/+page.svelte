<script lang="ts">
    import AllPagesView from "./components/all_pages_view.svelte";
    import dummy_logo from "$lib/assets/dummy_logo.png";
    import app, { auth } from "$lib/service/auth/firebase";
    import type { IAuthState } from "$lib/interfaces/root/app_interaface";
    import { onAuthStateChanged } from "firebase/auth";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import type IApp from "$lib/interfaces/root/app_interaface";
    import { page } from "$app/stores";
    import SidebarButtons from "./components/Sidebar_buttons.svelte";
    import AppSettingsView from "./components/app_settings_view.svelte";

    const url = $page.url;
    const param_appid: string = url.searchParams.get("appid")!;
    console.log();
    let app_data: IApp | null = null;

    enum PageTabContent {
        Dashboard,
        Pages,
        Settings,
        Publish,
        Theme,
        ViewData,
        ViewUsers,
        Pricing,
    }

    var visible_tab: PageTabContent = PageTabContent.Pages;

    async function post_request(app_id: string) {
        const data = new FormData();
        data.append("appid", app_id);

        const response = await fetch("/api/app_data", {
            method: "POST",
            body: data,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const response_data = await response.json();
        if (response_data.success) {
            app_data = response_data.app_data;
        }
    }

    var auth_state: IAuthState = {
        authenticated: false,
        uid: null,
        user_name: "",
    };

    onMount(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                auth_state.authenticated = true;
                auth_state.uid = user.uid;
                auth_state.user_name = user.displayName;
                post_request(param_appid); //search only if authenticated.
            } else {
                auth_state.authenticated = false;
                auth_state.uid = null;
                auth_state.user_name = null;

                goto("/auth/login");
            }
        });
    });
</script>

<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

{#if app_data != null}
    <main class="main_apps_info_wrapper">
        <div class="apps_info_wrapper">
            <div class="apps_sidebar">
                <h3>{app_data.name}</h3>
                <br />
                <SidebarButtons
                    name={"Pages"}
                    callback={() => {
                        visible_tab = PageTabContent.Pages;
                    }}
                />
                <SidebarButtons
                    name={"Dashboard"}
                    callback={() => {
                        visible_tab = PageTabContent.Dashboard;
                    }}
                />
                <SidebarButtons
                    name={"App theme"}
                    callback={() => {
                        visible_tab = PageTabContent.Theme;
                    }}
                />
                <SidebarButtons
                    name={"View Data"}
                    callback={() => {
                        visible_tab = PageTabContent.ViewData;
                    }}
                />
                <SidebarButtons
                    name={"View Users"}
                    callback={() => {
                        visible_tab = PageTabContent.ViewUsers;
                    }}
                />
                <SidebarButtons
                    name={"Publish App"}
                    callback={() => {
                        visible_tab = PageTabContent.Publish;
                    }}
                />
                <SidebarButtons
                    name={"Pricing Plan"}
                    callback={() => {
                        visible_tab = PageTabContent.Pricing;
                    }}
                />
                <SidebarButtons
                    name={"App Settings"}
                    callback={() => {
                        visible_tab = PageTabContent.Settings;
                    }}
                />
            </div>
            <div class="page_view_section">
                {#if visible_tab == PageTabContent.Pages}
                    <AllPagesView pages={app_data.pages} />
                {:else if visible_tab == PageTabContent.Settings}
                    <AppSettingsView app={app_data} settings={app_data.settings} />
                {/if}
                <br /><br /><br />
            </div>
        </div>
    </main>
{:else}
    <div class="app_not_found_notice">
        <h1>App not found</h1>
    </div>
{/if}

<style>
    .main_apps_info_wrapper {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: start;
        overflow: hidden;
        margin-top: 45px;
        padding-top: 50px;
    }
    .apps_info_wrapper {
        width: 100vw;
        height: auto;
        display: flex;
        align-items: start;
        margin-top: -30px;
        overflow: auto;
    }
    .apps_sidebar {
        width: 330px;
        min-height: 100vh;
        background-color: transparent;
        border-right: 1px solid rgb(240, 240, 240);
        padding-left: 30px;
        padding-top: 20px;
    }
    .apps_sidebar h3 {
        margin-left: 15px;
        font-size: 22px;
    }

    .page_view_section {
        width: calc(100vw - 330px);
        height: 100vh;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding-left: 50px;
    }

    .app_not_found_notice {
        display: flex;
        width: 100vw;
        height: 300px;
        align-items: center;
        justify-content: center;
    }
</style>

<script lang="ts">
    import dummy_logo from "$lib/assets/dummy_logo.png";
    import { onMount } from "svelte";
    import { onAuthStateChanged } from "firebase/auth";
    import { auth } from "$lib/service/auth/firebase";
    import type { IAuthState } from "$lib/interfaces/root/app_interaface";

    var auth_state: IAuthState = {
        authenticated: false,
        uid: null,
        user_name: null,
    };

    var app_name_field_ref;
    var app_name_value: string = "";
    var minimum_age_req_field_ref;
    var minimum_age_req_value: string = "";
    var industry_type_field_ref;
    var industry_type_field_value: string = "";

    function app_name_field_value_capture(e: any) {
        app_name_value = e.target.value;
    }

    function minimum_age_req_field_value_capture(e: any) {
        minimum_age_req_value = e.target.value;
    }

    function industry_type_change(e: any) {
        industry_type_field_value = e.target.value;
    }

    function modal_message_callback(status_code: number, message: string) {}

    function nextClickHandler() {
       
    }

    onMount(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                auth_state.authenticated = true;
                auth_state.uid = user.uid;
                auth_state.user_name = user.displayName;
            } else {
                auth_state.authenticated = false;
                auth_state.uid = null;
                auth_state.user_name = null;
            }
        });
    });
</script>

<div class="auth_page_wrapper" style="display: flex; flex-direction: column; align-items: center; justify-content: center; overflow-y: auto; overflow-x: hidden;">
    <div class="auth_layout">
        <div class="auth_nav">
            <div class="logo_wrapper">
                <img src={dummy_logo} alt="F" class="logo_img" />
                <p class="logo_name">Fidjet</p>
            </div>
        </div>
    </div>

    <div class="app_creation_page_wrapper">
        <h1>Create an app</h1>
        <form method="POST" action="/app/create-app">
            <div class="app_name_input_field_holder">
                <input type="text" name="app_name" class="email_input_field" bind:this={app_name_field_ref} value={app_name_value} on:input={app_name_field_value_capture} placeholder="App Name" />
                <input type="number" name="minimum_age_limit" class="email_input_field" bind:this={minimum_age_req_field_ref} value={minimum_age_req_value} on:input={minimum_age_req_field_value_capture} placeholder="Minimum Age to use the app" />

                <select name="industry_type" bind:this={industry_type_field_ref} on:change={industry_type_change}>
                    <option>Industry Type (Optional)</option>
                    <option value="health">Healthcare</option>
                    <option value="technology">Tecnhology</option>
                    <option value="finance">Finance</option>
                    <option value="entertainment">Entertainment Industry</option>
                    <option value="real-estate">Real Estate Industry</option>
                    <option value="agri-n-farming">Agriculture and Farming Industry</option>
                    <option value="edu">Education Industry</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <br /><br />
            <button type="submit" class="continue_creation_button">
                <p>Next</p>
            </button>
        </form>

        <div class="horizontal_line" style="margin-top: 380px;" />
        <br />
        <p class="tos_notice">You can change app name, mininmum age, industry type later in the <b>App Dashboard</b>. Please consider selecting an appropiate age based on your app contents.</p>
    </div>
</div>

<style>
    @import "$lib/assets/css/auth.css";

    .app_creation_page_wrapper {
        width: 600px;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        margin-top: 150px;
        position: relative;
    }
    select {
        width: 323px;
        height: 34px;
        border-radius: 5px;
        background-color: rgb(245, 245, 245);
        border: 1px solid gainsboro;
        font-size: 15px;
        background-color: rgb(245, 245, 245);
        font-weight: 400;
        font-family: "Nunito Sans", sans-serif;
        color: rgb(117, 117, 117);
        margin-top: 16px;
        padding-left: 9px;
    }

    select:focus {
        outline: none;
    }

    .continue_creation_button {
        background-color: black;
        width: 325px;
        height: 35px;
        border: 0;
        font-family: "Nunito Sans", sans-serif;
        color: white;
        font-size: 15px;
        border-radius: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-left: 30px;
        padding-right: 30px;
        border-radius: 5px;
        margin-bottom: 20px;
        cursor: pointer;
    }
</style>

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

    function nextClickHandler() {}

    var form: any;

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

        //adding custom form data to the form submission -> here custom data is user_id as owner
        form = document.getElementById("appCreationForm");

        form?.addEventListener("submit", async (e: any) => {
            e.preventDefault();

            const formData = new FormData(form);
            formData.append("owner", auth_state.uid); // Add custom data to the form data

            try {
                const response = await fetch("/app/create-app", {
                    // Use the Fetch API to submit the form data to the server
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    // Handle a successful response here
                    console.log("Repsonse is: ", response);
                } else {
                    // Handle errors here
                }
            } catch (error) {
                // Handle network or other errors here
            }
        });
    });
</script>

<div class="auth_page_wrapper" style="display: flex; flex-direction: column; align-items: center; justify-content: center; overflow-y: auto; overflow-x: hidden;">


    <div class="creation_step_visualization_bar">
        <div class="rounded_selected_indicator">1</div>
        <div class="creation_flow_line" />
        <div class="rounded_unselected_indicator">2</div>
    </div>

    <div class="app_creation_page_wrapper">
        <h1>Create an app</h1>
        <form method="POST" action="/app/create-app" id="appCreationForm">
            <div class="app_name_input_field_holder">
                <input type="text" name="app_name" class="email_input_field" bind:this={app_name_field_ref} value={app_name_value} on:input={app_name_field_value_capture} placeholder="App Name" required />
                <input
                    type="number"
                    name="minimum_age_limit"
                    class="email_input_field"
                    bind:this={minimum_age_req_field_ref}
                    value={minimum_age_req_value}
                    on:input={minimum_age_req_field_value_capture}
                    placeholder="Minimum Age to use the app"
                    required
                />

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

        <br />
        <p class="tos_notice">You can change app name, mininmum age, industry type later in the <b>App Dashboard</b>. Please consider selecting an appropiate age based on your app contents.</p>
    </div>
</div>

<style>
    @import "$css/create-app.css";
</style>

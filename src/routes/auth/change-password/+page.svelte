<script lang="ts">
    import SignupService from "$lib/service/auth/signup_service";
    import dummy_logo from "$lib/assets/dummy_logo.png";
    import AuthButtons from "../AuthButtons.svelte";

    var singup_service = new SignupService();

    var errorMessage = "";
    var password_field_ref: any;
    var password_value: string = "";
    var confirm_password_field_ref: any;
    var confirm_password_value: string = "";

    function password_field_value_capture(e: any) {
        password_value = e.target.value;
    }

    function confirm_password_field_value_capture(e: any) {
        errorMessage = "";
        confirm_password_value = e.target.value;
        confirm_password_field_ref.style.border = "1px solid gainsboro";
        confirm_password_field_ref.style.backgroundColor = "rgb(245, 245, 245)";
    }

    function resetPasswordClicked(e: any) {
        console.log("iN");
        if (password_value === confirm_password_value) {
            singup_service.resetPassword(password_value, modal_callback);
        } else {
            console.log("Cl");
            confirm_password_field_ref.style.border = "1px solid rgba(210, 97, 97, 0.781)";
            confirm_password_field_ref.style.backgroundColor = "#f1a2a263";
            errorMessage = "Password & Confirm password must match";
        }
    }

    function modal_callback(ecode : number, emsg: string){

    }
</script>

<div class="auth_page_wrapper">
    <div class="auth_layout">
        <div class="auth_nav">
            <div class="logo_wrapper">
                <img src={dummy_logo} alt="F" class="logo_img" />
                <p class="logo_name">Fidjet</p>
            </div>
        </div>
    </div>

    <div class="signup_wrapper">
        <h1 style="font-size: 30px;">Reset password</h1>
        <div class="password_input_field_holder">
            <input type="password" class="email_input_field" bind:this={password_field_ref} value={password_value} on:input={password_field_value_capture} placeholder="Password" />
            <input type="password" class="email_input_field" bind:this={confirm_password_field_ref} value={confirm_password_value} on:input={confirm_password_field_value_capture} placeholder="Confirm password" />
            {#if errorMessage != ""}
                <p class="error_message_field">{errorMessage}</p>
            {/if}
        </div>
        <AuthButtons buttonName={"Change password"} callback={resetPasswordClicked} isRed={true} /> <br />

        <p class="already_have_acc">Remeber your password? <a href="login">Login</a></p>

        <p class="tos_notice">By clicking “Change Password” above, you acknowledge that you have read and understood, and agree to Fedjet's <a href="tos">Terms & Conditions</a> and <a href="privacy-policy">Privacy Policy</a></p>
    </div>
</div>

<style>
    @import "../auth.css";
</style>

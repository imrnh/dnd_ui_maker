<script lang="ts">
    import type { ITemplate, ITemplateInfo } from "$lib/api/studio/sidebar/templates/design_templates";
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
    import { onMount } from "svelte";

    export let template: ITemplate;
    export let backbtn_callback: any;

    let templateInfoObj: ITemplateInfo = {
        unq_id: "",
        page: [],
        description: "",
    };

    /**
    @user will always be asked if they want to replace the current page variable's content with this template's content or not.
    */

    //fetch the page and description info.

    function fetchTemplateInfo() {
        templateInfoObj.unq_id = template.unq_id;
        templateInfoObj.description =
            "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.";
        templateInfoObj.page = [];
    }

    onMount(() => {
        fetchTemplateInfo();
    });
</script>

<div class="template_full_view_wrapper">
    <div class="tfvheader">
        <button class="back_button" on:click={backbtn_callback}>
            <FontAwesomeIcon icon={faCircleChevronLeft} />
        </button>
    </div>

    <div class="tfv_contents">
        <center>
            <img src={template.thumbnail} alt={template.name} class="tfv_thumbnail_image" />
            <h2>{template.name}</h2>
            <p class="tfv_desc">{templateInfoObj.description}</p>
        </center>
    </div>
    <button class="tfv_add_this_page">Add to page</button>
</div>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css" />

<style>
    .template_full_view_wrapper {
        width: 100%;
        height: calc(100vh - 60px);
        background-color: transparent;
        position: relative;
        overflow: hidden;
    }

    .tfvheader {
        width: 100%;
        height: 50px;
        background-color: transparent;
    }

    .back_button {
        width: 35px;
        height: 35px;
        background-color: transparent;
        color: rgb(66, 66, 66);
        border: 0;
        border-radius: 100px;
        font-size: 19px;
        position: absolute;
        top: 15px;
        left: 3px;
        cursor: pointer;
    }

    .tfv_contents{
        width: auto;
        height: auto;
    }


    .tfv_thumbnail_image {
        width: 220px;
        height: 462px;
        margin-top: 50px;
        border-radius: 7px;
    }

    .tfv_desc {
        font-size: 12px;
        text-align: justify;
        padding-left: 15px;
        padding-right: 15px;
        color: rgb(51, 51, 51);
    }

    .tfv_add_this_page {
        width: 220px;
        height: 40px;
        position: absolute;
        left: 30px;
        bottom: 30px;
        border: 0;
        background-color: black;
        color: white;
        font-size: 17px;
        font-weight: 200;
        cursor: pointer;
        border-radius: 5px;
    }
</style>

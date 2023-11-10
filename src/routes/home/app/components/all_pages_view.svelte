<script lang="ts">
    import type IPage from "$lib/interfaces/page_interfaces";
    import { icon } from "@fortawesome/fontawesome-svg-core";
    import { faEdit, faPen, faPenAlt, faTrash, faUserEdit } from "@fortawesome/free-solid-svg-icons";
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";

    export let pages : IPage[];

    export let dummy_pages = [
        {
            uid: "345435",
            name: "Homepage",
            route: "/",
        },
        {
            uid: "345435",
            name: "LoginPage",
            route: "/login",
        },
        {
            uid: "345435",
            name: "AuthPage",
            route: "/auth",
        },
        {
            uid: "345435",
            name: "View Medicines",
            route: "/med_view",
        },
    ];

    let name_edit_fields: any[] = [];

    function editPageName(e: any, index: number) {
        name_edit_fields[index].disabled = false;
        name_edit_fields[index].style.borderBottom = "1px solid green";
        console.log("idx: ", index);
    }
</script>

<div class="all_pages_view_bar">
    <div class="pages_view_header">
        <h1>Pages</h1>
        <button class="create_new_page_btn"> + New page </button>
    </div>

    <div class="page_card_holder">
        {#each dummy_pages as page, idx}
            <a href={`/studio?page=${page.uid}`}>
                <div class="page_card">
                    <h1 class="page_card_title">
                        {page.name}
                    </h1>
                    <p class="page_route_p">{page.route}</p>
                    <!-- <div class="button_groups">
                    <FontAwesomeIcon style="color: darkgray; margin: 7px" icon={faPen} />
                    <FontAwesomeIcon style="color: rgb(255,100,100); margin: 7px" icon={faTrash} />
                </div> -->
                </div>
            </a>
        {/each}
    </div>
</div>

<style>
    .all_pages_view_bar {
        width: calc(100% - 200px);
        padding-left: 100px;
        padding-right: 100px;
    }

    .pages_view_header {
        widows: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .pages_view_header h1 {
        font-size: 50px;
        margin-bottom: 60px;
    }

    .create_new_page_btn {
        background-color: black;
        color: white;
        width: 170px;
        height: 40px;
        border-radius: 7px;
        border: 0;
        font-size: 16px;
    }

    .page_card_holder {
        width: 100%;
        height: auto;
        display: flex;
        flex-wrap: wrap;
    }

    .page_card {
        width: 260px;
        height: 120px;
        padding-left: 30px;
        background-color: transparent;
        margin: 10px;
        border-radius: 20px;
        color: rgb(32, 32, 32);
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        border: 1px solid rgb(236, 236, 236);
        cursor: pointer;
    }

    .page_card_title {
        font-size: 25px;
    }

    .page_route_p {
        margin: 0;
        margin-bottom: 20px;
        color: var(--violet-color);
    }

    button {
        cursor: pointer;
    }

    .button_groups {
        width: 100px;
        height: 30px;
        border-color: red;
        align-self: flex-end;
        margin-top: -30px;
        right: 0;
    }

    a{
        text-decoration: none;
    }
</style>

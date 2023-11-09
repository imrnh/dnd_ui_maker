<script lang="ts">
    import { faEdit, faPen, faTrash, faUserEdit } from "@fortawesome/free-solid-svg-icons";
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";

    export let pages = [
        {
            uid: "345435",
            name: "Homepage",
        },
        {
            uid: "345435",
            name: "Buttpage",
        },
        {
            uid: "345435",
            name: "Homepage",
        },
        {
            uid: "345435",
            name: "Homepage",
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
        <h1>All Pages</h1>
        <button class="create_new_page_btn"> + New page </button>
    </div>
    <hr />
    {#each pages as page, idx}
        <div class="page_name">
            <input type="text" class="page_name_editor_field" value={page.name} disabled bind:this={name_edit_fields[idx]} />
            <div class="btn_groups">
                <button class="edit_page_name" on:click={(e) => editPageName(e, idx)}>
                    <FontAwesomeIcon icon={faPen} style="font-size: 15px;" />
                </button>

                <button class="delete_page_btn" on:click={(e) => editPageName(e, idx)}>
                    <FontAwesomeIcon icon={faTrash} style="font-size: 15px; color: rgb(240,0,0)" />
                </button>
            </div>
        </div>
    {/each}
</div>

<style>
    .all_pages_view_bar {
        width: 100%;
    }

    .pages_view_header {
        widows: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
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
    .page_name {
        width: calc(100% - 50px); /* 50px is padding */
        height: 60px;
        background-color: rgb(255, 255, 255);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 20px;
        padding-right: 30px;
        margin-top: 25px;
    }
    .page_name_editor_field {
        width: 550px;
        border: 0;
        height: 35px;
        font-size: 20px;
        font-weight: 600;
        background-color: transparent;
    }
    input:focus {
        outline: none;
    }

    .edit_page_name {
        width: 40px;
        height: 40px;
        border: 0;
        background-color: rgb(255, 255, 255);
        border: 1px solid rgb(240, 240, 240);
        border-radius: 10px;
    }

    .delete_page_btn {
        width: 40px;
        height: 40px;
        border: 0;
        background-color: rgb(255, 255, 255);
        border: 1px solid rgb(240, 240, 240);
        border-radius: 10px;
        margin-left: 20px;
    }

    .edit_page_name:hover,
    .delete_page_btn:hover {
        border: 1px solid rgb(230, 230, 230);
        transition: 200ms;
    }

    button {
        cursor: pointer;
    }
</style>

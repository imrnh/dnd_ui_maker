
import type { IAuthState } from "$lib/interfaces/root/app_interaface";
import AppCreatorService from "$lib/server/services/create_app_service";
import { auth } from "$lib/service/auth/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const actions = {

    default: async ({ cookies, request }) => {

        const data = await request.formData();

        const owner_id = data.get('owner_id') || "";
        const app_name = data.get('app_name') || "";
        const minimum_age_req_value = data.get('minimum_age_limit') || "";
        const industry_type = data.get('industry_type') || "";

        if (app_name != "" && minimum_age_req_value != "") {
            var app_creator = new AppCreatorService();
            app_creator.create(owner_id.toString(), app_name?.toString(), parseInt(minimum_age_req_value.toString()), industry_type?.toString(), "free", null);
        }

        return { success: true };
    },
};


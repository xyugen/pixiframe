import { json } from "@sveltejs/kit";
import type { Actions } from "./$types";
import fs from 'fs';
import { compressImage, compressJpeg } from "$lib/utils/compression";

export const actions: Actions = {
    upload: async ({ request }) => {
        const formData = await request.formData();

        const encryptionOption = formData.get("encryption") as string;
        if (encryptionOption === "password") {
            const password = formData.get("password") as string;
        }

        const files = formData.getAll("files") as File[];
        for (const file of files) {
            const buffer = await file.arrayBuffer();
        }
    }
};
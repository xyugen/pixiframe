import type { Actions } from "./$types";
import fs from 'fs';
import { compressImage } from "$lib/utils/compression";
import { getFileExtention } from "$lib/utils/helpers";

export const actions: Actions = {
    upload: async ({ request }) => {
        const formData = await request.formData();

        let password;

        const encryptionOption = formData.get("encryption") as string;
        if (encryptionOption === "password") {
            password = formData.get("password") as string;
        }

        console.log(password);

        const files = formData.getAll("files") as File[];
        for (const file of files) {
            const buffer = await file.arrayBuffer();
            const compressedBuffer = await compressImage(buffer, getFileExtention(file.name));
            //fs.writeFileSync(file.name, compressedBuffer);
        }
    }
};
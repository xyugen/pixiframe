import { droppedFiles } from "$lib/stores";
import type { Actions } from "./$types";

export const actions: Actions = {
    upload: async ({ request }) => {
        console.log(await request.formData());
    }
};
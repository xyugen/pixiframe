import { error, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url, params, fetch }) => {
    const image = params.image;
    const password: string | null = url.searchParams.get('password');

    const response = await fetch(`/api/retrieve-image`, {
        method: "POST",
        body: JSON.stringify({ image }),
    });
    const data = await response.json();
    const imageData = data.body;
    
    if (!imageData) {
        throw error(404, "Image not found");
    }
    return {
        image: imageData,
        password: password
    }
};

export const actions: Actions = {
    delete:async ({ params, fetch }) => {
        const image = params.image;

        const response = await fetch(`/api/delete-image`, {
            method: "POST",
            body: JSON.stringify({ image }),
        });
        
        throw redirect(302, `/`);
    }
};
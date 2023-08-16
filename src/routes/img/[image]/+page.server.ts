import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, fetch }) => {
    const image = params.image;

    const response = await fetch(`/api/retrieve-image`, {
        method: "POST",
        body: JSON.stringify({ image }),
    });
    const data = await response.json();
    const imageData = data.body;

    return {
        image: imageData
    }
};
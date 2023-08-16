import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request, locals: { supabase }}) => {
    try {
        const { image } = await request.json();
        if (!image) {
            return json({
                status: 400,
                body: { error: 'Missing image data' }
            });
        }

        const { data, error } = await supabase
            .from('images')
            .select()
            .eq('url', image);
        if (error) {
            console.log(error);
            return json({
                status: 500,
                body: { error: 'Image not found' }
            });
        }
        
        console.log(data[0]);
        return json({
            status: 200,
            body: data[0],
        });
    } catch (error) {
        console.log(error);
        return json({
            status: 500,
            body: json({ error: 'An error occured' })
        });
    }
};
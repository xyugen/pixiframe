import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals: { supabase } }) => {
    try {
        console.log("TEST0")
        const formData = await request.formData();
        const file = formData.get('file');
        const fileName = formData.get('name');

        console.log("TEST1")
        if (file instanceof File) {
            console.log("TEST3")
            if (fileName === null) {
                return new Response();
            }
            const { data, error } = await supabase.storage.from('images/uploads').upload(fileName.toString(), file);
            if (error) {
                console.log(error);
                return json({
                    status: 500,
                    body: json({ error: 'Image upload failed' })
                });
            }
            console.log("TEST4")
            return json({
                status: 200,
                body: json({
                    data: data,
                    message: 'Image uploaded succesfully!'
                })
            });
        }
    } catch (error) {
        console.log("TEST5")
        console.log(error)
        return json({
            status: 500,
            body: json({ error: 'An error occured' })
        });
    }

    console.log("TEST6")
    return new Response();
};
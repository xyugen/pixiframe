# PixiFrame

PixiFrame is a stunning website crafted with SvelteKit and backed by Supabase. It empowers you to upload, share, and secure images with ease. Control access by setting a passphrase for added privacy. PixiFrame supports jpg/jpeg, png, and gif files, with more formats coming soon.

## Features

- Upload and share pictures effortlessly.
- Enhance privacy by setting passphrases for shared images.
- Aesthetic design and user-friendly interface.
- Built for performance using SvelteKit and Supabase.
- Support for popular image file formats: jpg/jpeg, png, and gif.

## Getting Started

To get started with PixiFrame, follow these steps:

1. Clone the repository:
```sh
git clone https://github.com/xyugen/pixiframe.git
```
2. Install dependencies
```sh
cd pixiframe
npm install (or pnpm install)
```
3. Configure your Supabase credentials:
- Create a `.env` file in the project root.
- Add your Supabase API URL and API Key to the `.env` file:
```sh
PUBLIC_SUPABASE_URL=<your-supabase-api-url>
PUBLIC_SUPABASE_ANON_KEY=<your-supabase-api-key>
```
3. Start the development server
```sh
npm run dev
```
4. Access the website in your browser:
Open your browser and navigate to `http://localhost:3000`.

## Contributing

Contributions to PixiFrame are welcome! If you find any issues or want to add new features, feel free to submit pull requests. Please make sure to follow the code style and conventions.

## License

PixiFrame is open source and released under the [MIT License](LICENSE)
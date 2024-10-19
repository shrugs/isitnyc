import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "hsl(16 60% 50%)",
				foreground: "hsl(50 20% 1%)",
			},
		},
	},
	plugins: [],
};
export default config;

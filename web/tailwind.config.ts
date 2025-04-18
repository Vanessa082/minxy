import type { Config } from "tailwindcss";

const config: Config = {
	// darkMode: ["class"],
	content: [
		"./src/core/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},
				app: {
					blue: {
						500: 'var(--app-blue-500)',
					},
					dark: {
						500: 'var(--app-dark-500)',
						400: 'var(--app-dark-400)',
						300: 'var(--app-dark-300)',
						200: 'var(--app-dark-200)',
					},
					white: {
						500: 'var(--app-white-500)',
						400: 'var(--app-white-400)',
						300: 'var(--app-white-300)',
						200: 'var(--app-white-200)',
					},
					'text-dark': {
						500: 'var(--app-text-dark-500)',
						400: 'var(--app-text-dark-400)',
						300: 'var(--app-text-dark-300)',
						200: 'var(--app-text-dark-200)',
					},
					'text-white': {
						500: 'var(--app-text-white-500)',
						400: 'var(--app-text-white-400)',
						300: 'var(--app-text-white-300)',
						200: 'var(--app-text-white-200)',
					},
					'text-blue': {
						500: 'var(--app-text-blue-500)',
					},
					strict: {
						blue: {
							500: 'var(--strict-blue-500)',
						},
						dark: {
							500: 'var(--strict-dark-500)',
							400: 'var(--strict-dark-400)',
							300: 'var(--strict-dark-300)',
							200: 'var(--strict-dark-200)',
						},
						white: {
							500: 'var(--strict-white-500)',
							400: 'var(--strict-white-400)',
							300: 'var(--strict-white-300)',
							200: 'var(--strict-white-200)',
						},
						'text-dark': {
							500: 'var(--strict-text-dark-500)',
							400: 'var(--strict-text-dark-400)',
							300: 'var(--strict-text-dark-300)',
							200: 'var(--strict-text-dark-200)',
						},
						'text-white': {
							500: 'var(--strict-text-white-500)',
							400: 'var(--strict-text-white-400)',
							300: 'var(--strict-text-white-300)',
							200: 'var(--strict-text-white-200)',
						},
						'text-blue': {
							500: 'var(--strict-text-blue-500)'
						}
					}
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			spacing: {
				'app-w': 'min(95vw, 1440px)',
				'app-min-h': '70vh',
			},
			screens: {
				'max-lg': { max: '1387px' },
				ssm: '450px'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
}

export default config

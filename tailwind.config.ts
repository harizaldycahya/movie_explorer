import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // <-- add this
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
}
export default config

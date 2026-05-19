import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        ink: '#101014',
        gold: '#D9A441',
        cream: '#FFF8EC'
      }
    }
  },
  plugins: []
}

export default config

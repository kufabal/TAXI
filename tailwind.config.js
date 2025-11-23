/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ewha': '#006633', // 이화여대 대표 색상 (녹색)
      },
    },
  },
  plugins: [],
}


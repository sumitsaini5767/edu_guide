/ @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src//*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        bgcolor:{
          600:"#e9f7fa"
        },
        themecolor:{
          600:"#ff7f46"
        },
        "paracolor":"#636363",
        "bordercolor":"#ddd"
      },
      fontSize:{
        head:"2.25rem",
        subhead:"1.0625rem",
        para:"1.06rem",
        spara:"0.93rem"
      },
      fontWeight:{
        head:"700",
        subhead:"600",
        para:"400",
        spara:"400"
      }
    },
  },
  plugins: [],
}
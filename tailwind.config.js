/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2F50C1",
        "primary-200": "#d9e6fd",
        gray: "#f4f2f8",
        "gray-200": "#757281",
        muted: "#666666",
        line: "#EAE7F2"
      },
    },
  },
  plugins: [],
};

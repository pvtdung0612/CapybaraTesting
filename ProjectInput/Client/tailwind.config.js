/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "node_modules/preline/dist/*.js"],
  theme: {
    extend: {
      colors: {
        text_color: "rgba(0, 0, 0, 0.8)",
        button_color: "#49E4FA",
        button_hover_color: "rgba(73, 228, 250, 0.8)",
        background_color: "#795FFF",
        background_color_hover: "rgba(121, 95, 255, 0.8)",
        home_search_transparent_purple: "#A998F6",
        common_color: "#369d70",
        hover_common_color: "rgb(0, 100, 0)",
      },
      // images: {
      //   domains: ["images.unsplash.com"],
      // },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("tailwind-scrollbar-hide"),
    // require("flowbite/plugin"),
    // require("preline/plugin"),
    // require("daisyui"),
  ],
};

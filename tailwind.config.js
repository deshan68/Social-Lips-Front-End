/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background_dark_blue: "#081A26",
        background_light_blue: "#1A2730",
        button_blue: "#2B75FF",
        font_dark_gray: "#D9D9D9",
        font_light_gray: "#9A9A9A",
        input_box_gray: "#33434E",
      },
      keyframes: {
        slideDownAndFade: {
          from: { opacity: 0, transform: "translateY(-2px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        slideLeftAndFade: {
          from: { opacity: 0, transform: "translateX(2px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        slideUpAndFade: {
          from: { opacity: 0, transform: "translateY(2px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        slideRightAndFade: {
          from: { opacity: 0, transform: "translateX(-2px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        contentShow: {
          from: { opacity: 0, transform: "translate(-50%, -48%) scale(0.96)" },
          to: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
        },
        contentShowClose: {
          to: { opacity: 0, transform: "translate(-50%, -50%) scale(0.96)" },
          from: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
        },
      },
      animation: {
        wiggle: "wiggle 300ms ease-in-out",
        slideDownAndFade:
          "slideDownAndFade 500ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideLeftAndFade:
          "slideLeftAndFade 500ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideUpAndFade: "slideUpAndFade 500ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideRightAndFade:
          "slideRightAndFade 500ms cubic-bezier(0.16, 1, 0.3, 1)",
        overlayShow: "overlayShow 100ms cubic-bezier(0.1, 0.1, 0.1, 0.1)",
        contentShow: "contentShow 100ms cubic-bezier(0.1, 0.1, 0.1, 0.1)",
        contentShowClose:
          "contentShowClose 100ms cubic-bezier(0.1, 0.1, 0.1, 0.1)",
      },
    },
    screens: {
      tablet: "1100px",
      // => @media (min-width: 640px) { ... }

      laptop: "1024px",
      // => @media (min-width: 1024px) { ... }

      desktop: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

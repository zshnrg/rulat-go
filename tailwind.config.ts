import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [
    function ({ addUtilities }: { addUtilities: any }) {
      const newUtilities = {
        '.dashed': {
          'border-style': 'dashed',
          'border-width': '4px', // Adjust the border width as needed
          'border-color': 'rgba(0, 0, 0, 0.2)', // 20% transparent black
        },
        '.regular': {
          'border-style': 'solid',
          'border-width': '4px', // Adjust the border width as needed
          'border-color': 'rgba(0, 0, 0, 0.2)', // 20% transparent black
        },
        '.custom-box-shadow': {
          'box-shadow': '0px 4px 0px rgba(0, 0, 0, 0.25)',
        },
        '.no-box-shadow': {
          'box-shadow': 'none',
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    }
  ],
};
export default config;

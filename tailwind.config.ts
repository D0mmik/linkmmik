import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import {nextui} from "@nextui-org/theme";

export default {
  content: ["./src/**/*.tsx",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
} satisfies Config;

import { type Config } from "tailwindcss";
import daisyui from "daisyui";

export default {
  content: [
    "src/{routes,islands,components}/**/*.{ts,tsx}",
  ],
  // deno-lint-ignore no-explicit-any
  plugins: [daisyui as any],
} satisfies Config;

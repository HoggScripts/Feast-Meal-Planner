import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  esbuild: {
    loader: "tsx",
    // Disable type checking
    tsconfigRaw: {
      compilerOptions: {
        checkJs: false,
      },
    },
  },
});

// ../client/vite.config.ts
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "url";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import dotenv from "dotenv";
var __vite_injected_original_import_meta_url = "file:///Users/ajnurtimerbaev/work/yandex/1game/packages/client/vite.config.ts";
dotenv.config();
var vite_config_default = defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3e3
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT || 3001
  },
  build: {
    outDir: "dist/client"
  },
  plugins: [
    react(),
    svgr({
      svgrOptions: {}
    })
  ],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
      },
      {
        find: "@/assets",
        replacement: fileURLToPath(new URL("./src/assets", __vite_injected_original_import_meta_url))
      },
      {
        find: "@/components",
        replacement: fileURLToPath(new URL("./src/components", __vite_injected_original_import_meta_url))
      },
      {
        find: "@/api",
        replacement: fileURLToPath(new URL("./src/api", __vite_injected_original_import_meta_url))
      },
      {
        find: "@/layout",
        replacement: fileURLToPath(new URL("./src/layout", __vite_injected_original_import_meta_url))
      },
      {
        find: "@/types",
        replacement: fileURLToPath(new URL("./src/types", __vite_injected_original_import_meta_url))
      },
      {
        find: "@/hook",
        replacement: fileURLToPath(new URL("./src/types", __vite_injected_original_import_meta_url))
      },
      {
        find: "@/utils",
        replacement: fileURLToPath(new URL("./src/utils", __vite_injected_original_import_meta_url))
      }
    ]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vY2xpZW50L3ZpdGUuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2FqbnVydGltZXJiYWV2L3dvcmsveWFuZGV4LzFnYW1lL3BhY2thZ2VzL2NsaWVudFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2FqbnVydGltZXJiYWV2L3dvcmsveWFuZGV4LzFnYW1lL3BhY2thZ2VzL2NsaWVudC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvYWpudXJ0aW1lcmJhZXYvd29yay95YW5kZXgvMWdhbWUvcGFja2FnZXMvY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICd1cmwnO1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcbmltcG9ydCBzdmdyIGZyb20gJ3ZpdGUtcGx1Z2luLXN2Z3InO1xuaW1wb3J0IGRvdGVudiBmcm9tICdkb3RlbnYnO1xuZG90ZW52LmNvbmZpZygpO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogTnVtYmVyKHByb2Nlc3MuZW52LkNMSUVOVF9QT1JUKSB8fCAzMDAwLFxuICB9LFxuICBkZWZpbmU6IHtcbiAgICBfX1NFUlZFUl9QT1JUX186IHByb2Nlc3MuZW52LlNFUlZFUl9QT1JUIHx8IDMwMDEsXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiAnZGlzdC9jbGllbnQnLFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBzdmdyKHtcbiAgICAgIHN2Z3JPcHRpb25zOiB7XG4gICAgICAgIC8vIHN2Z3Igb3B0aW9uc1xuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiBbXG4gICAgICB7XG4gICAgICAgIGZpbmQ6ICdAJyxcbiAgICAgICAgcmVwbGFjZW1lbnQ6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGZpbmQ6ICdAL2Fzc2V0cycsXG4gICAgICAgIHJlcGxhY2VtZW50OiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjL2Fzc2V0cycsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZmluZDogJ0AvY29tcG9uZW50cycsXG4gICAgICAgIHJlcGxhY2VtZW50OiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjL2NvbXBvbmVudHMnLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGZpbmQ6ICdAL2FwaScsXG4gICAgICAgIHJlcGxhY2VtZW50OiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjL2FwaScsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZmluZDogJ0AvbGF5b3V0JyxcbiAgICAgICAgcmVwbGFjZW1lbnQ6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMvbGF5b3V0JywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBmaW5kOiAnQC90eXBlcycsXG4gICAgICAgIHJlcGxhY2VtZW50OiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjL3R5cGVzJywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBmaW5kOiAnQC9ob29rJyxcbiAgICAgICAgcmVwbGFjZW1lbnQ6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMvdHlwZXMnLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGZpbmQ6ICdAL3V0aWxzJyxcbiAgICAgICAgcmVwbGFjZW1lbnQ6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMvdXRpbHMnLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF1VixTQUFTLG9CQUFvQjtBQUNwWCxTQUFTLGVBQWUsV0FBVztBQUNuQyxPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sWUFBWTtBQUptTSxJQUFNLDJDQUEyQztBQUt2USxPQUFPLE9BQU87QUFHZCxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixRQUFRO0FBQUEsSUFDTixNQUFNLE9BQU8sUUFBUSxJQUFJLFdBQVcsS0FBSztBQUFBLEVBQzNDO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixpQkFBaUIsUUFBUSxJQUFJLGVBQWU7QUFBQSxFQUM5QztBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLEtBQUs7QUFBQSxNQUNILGFBQWEsQ0FFYjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFhLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLE1BQzlEO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sYUFBYSxjQUFjLElBQUksSUFBSSxnQkFBZ0Isd0NBQWUsQ0FBQztBQUFBLE1BQ3JFO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sYUFBYSxjQUFjLElBQUksSUFBSSxvQkFBb0Isd0NBQWUsQ0FBQztBQUFBLE1BQ3pFO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sYUFBYSxjQUFjLElBQUksSUFBSSxhQUFhLHdDQUFlLENBQUM7QUFBQSxNQUNsRTtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLGFBQWEsY0FBYyxJQUFJLElBQUksZ0JBQWdCLHdDQUFlLENBQUM7QUFBQSxNQUNyRTtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLGFBQWEsY0FBYyxJQUFJLElBQUksZUFBZSx3Q0FBZSxDQUFDO0FBQUEsTUFDcEU7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFhLGNBQWMsSUFBSSxJQUFJLGVBQWUsd0NBQWUsQ0FBQztBQUFBLE1BQ3BFO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sYUFBYSxjQUFjLElBQUksSUFBSSxlQUFlLHdDQUFlLENBQUM7QUFBQSxNQUNwRTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K

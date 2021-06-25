import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import dts from "vite-plugin-dts"

export default defineConfig({
  resolve: {
    conditions: ["import", "browser", "module", "default"],
    extensions: [".js", ".ts", ".vue", ".json"]
  },
  json: {
    namedExports: false,
    stringify: true
  },
  build: {
    minify: false,
    //outDir: "../../dist",
    emptyOutDir: false,
    lib: {
      entry: "lib/components/index.ts",
      name: "components",
      fileName: "components",
      //formats: ["es", "cjs", "umd", "iife"]
      formats: ["es", "umd"]
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        sourcemap: "inline",
        globals: {
          vue: "Vue"
        }
      },
    }
  },
  plugins: [
    vue(),
    // dts({
    //   staticImport: true,
    //   insertTypesEntry: true,
    //   cleanVueFileName: true,
    //   clearPureImport: true
    // })
  ]
})



// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     vue()
//   ],
  
//   build: {
//     lib: {
//       entry: path.resolve(__dirname, 'lib/main.ts'),
//       name: '@uvicore/vue3'
//     },
//     rollupOptions: {
//       // make sure to externalize deps that shouldn't be bundled
//       // into your library
//       external: ['vue'],
//       output: {
//         // Provide global variables to use in the UMD build
//         // for externalized deps
//         globals: {
//           vue: 'Vue'
//         }
//       },
//       plugins: [
//         typescript2({
//           tsconfig: "tsconfig.json",
//         }),
//       ]
//     }
//   }
// })

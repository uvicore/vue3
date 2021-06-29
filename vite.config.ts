import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import dts from "vite-plugin-dts"
import glob from "glob"


export default defineConfig({
  resolve: {
    conditions: ["import", "browser", "module", "default"],
    extensions: [".js", ".ts", ".vue", ".json"]
  },
  json: {
    namedExports: false,
    stringify: true
  },
  //esbuild: { include: ['js', 'ts'] },
  build: {
    minify: false,
    outDir: "./dist",
    emptyOutDir: true,
    lib: {
      entry: "projects/vue3/index.ts",
      name: "vue3",
      fileName: "[name]",
      //formats: ["es", "cjs", "umd", "iife"]
      //formats: ["es", "umd"]
      formats: ["es"]
      //formats: ["es", "cjs"]
    },
    rollupOptions: {
      external: [
        "vue",
        "vue-oidc-client",
        "pinia",
        "@heroicons",
      ],
      //input: glob.sync("./projects/vue3/**/index.ts"),
      // input: {
      //   //auth: path.resolve(__dirname, 'lib/auth/index.ts'),
      //   components: path.resolve(__dirname, 'lib/components/index.ts')
      // },
      output: {
        //preserveModules: true,
        //sourcemap: "inline",
        globals: {
          "vue": "Vue",
          "vue-oidc-client": "vue-oidc-client",
          "pinia": "pinia",
          "@heroicons": "@heroicons"
        }
      },
      // output: [
      //   {
      //     sourcemap: "inline",
      //     globals: {
      //       vue: "Vue"
      //     },
      //     entryFileNames: ({ facadeModuleId }) => facadeModuleId.includes('components') ? 'components.esm.js' : 'components2.esm.js',
      //     format: 'esm',
      //     dir: path.resolve(__dirname, 'lib/components')
      //   },
      //   // {
      //   //   entryFileNames: ({ facadeModuleId }) => facadeModuleId.includes('auth') ? 'auth.cmj.js' : 'auth2.cmj.js',
      //   //   format: 'commonjs',
      //   //   exports: 'named',
      //   //   dir: path.resolve(__dirname, 'lib/auth')
      //   // },
      // ],
      // plugins: [
      //   buble()
      // ]
    }
  },
  plugins: [
    vue(),
    dts({
      //outputDir: './dist/',
      //root: 'x',
      staticImport: true,
      insertTypesEntry: true,
      cleanVueFileName: true,
      clearPureImport: true
    })
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

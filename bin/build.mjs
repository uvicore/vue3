#!/usr/bin/env node

import dts from "vite-plugin-dts"
import vue from '@vitejs/plugin-vue'
import { Builder } from './build-lib.mjs';

// Vite Config for each Project
const vite_config = (project) => {
  return {
    configFile: false,
    build: {
      minify: false,
      emptyOutDir: true,
      lib: {
        entry: project.entry,
        name: project.name,
        fileName: project.name,
        formats: ["es", "udm"],
      },
      rollupOptions: {
        external: [
          'vue',
          'vue-oidc-client'
        ],
        output: {
          format: "es",
          sourcemap: "inline",
          globals: {
            vue: 'Vue'
          },
          assetFileNames: `${project.name}/[name].[ext]`,
          entryFileNames: () => '[name]/[name].[format].js'
        }
      }
    },
    //plugins: [vue(), babel({ babelHelpers: 'bundled' })]
    plugins: [
      vue(),
      // dts({
      //   staticImport: true,
      //   insertTypesEntry: true,
      //   cleanVueFileName: true,
      //   clearPureImport: true
      // })
    ]
  }
}


// Builder config for entire build process
// All paths relative to repository root (not bin, not lib but root)
const builder_config = {
  relative_root_from_build_script: '../',
  projects_path: './projects',
  build_path: './build',
}

// Instantiate Builder
const builder = new Builder(builder_config, vite_config);
console.log(builder)

// Run build
await builder.run()



// const getImports = async () => {
//   const files = await glob([path.resolve('../../components/**/package.json'), '!**/node_modules/**/*'])
//   files.forEach(file => {
//     const content = fs.readFileSync(file, 'utf-8')
//     const pkg = JSON.parse(content)
//     if (pkg.imports) {
//       imports.push({
//         name: pkg.name,
//         lib: path.resolve(file, '../', pkg.imports.lib),
//         style: path.resolve(file, '../', pkg.imports.style)
//       })
//     }
//   })
// }

// await getImports()

// imports.forEach(async item => {
//   await build({
//     configFile: false,
//     build: {
//       lib: {
//         entry: item.lib,
//         name: item.name
//       },
//       rollupOptions: {
//         external: ['vue'],
//         output: {
//           globals: {
//             vue: 'Vue'
//           },
//           assetFileNames: `${item.name}/[name].[ext]`,
//           entryFileNames: () => '[name]/[name].[format].js'
//         }
//       }
//     },
//     plugins: [vue(), babel({ babelHelpers: 'bundled' })]
//   })
// })

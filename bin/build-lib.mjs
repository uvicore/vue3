import path from 'path'
import fs from 'fs-extra'
import { build } from 'vite'
import { resolve } from 'path'
import { fileURLToPath } from 'url';
import dts from "vite-plugin-dts";

/**
 * Monorepo Multi-Package Vite Builder
 * mReschke 2021-06-24
 */
export class Builder {
  config
  vite_config
  base_path
  projects_path
  build_path
  projects
  package

  constructor(config, vite_config) {
    this.config = config;
    this.vite_config = vite_config;

    this.base_path = resolve(this.__dirname, this.config.relative_root_from_build_script);
    this.projects_path = resolve(this.base_path, 'projects');
    this.build_path = resolve(this.base_path, this.config.build_path);
    this.projects = this.getDirectories(this.projects_path);

    // Read main (root) package.json
    //this.package = this.readPackageJson(this.base_path + '/package.json')

    //     const content = fs.readFileSync(file, 'utf-8')
    //     const pkg = JSON.parse(content)
  }

  get __filename() {
    return new URL(import.meta.url).pathname;
  }

  get __dirname() {
    return path.dirname(fileURLToPath(import.meta.url));
  }

  getDirectories(dest) {
    return fs.readdirSync(dest, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
  }

  mkdir(dest) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest);
    return this
  }

  rmdir(dest) {
    if (fs.existsSync(dest)) fs.removeSync(dest);
    return this
  }

  copy(src, dest) {
    fs.copySync(src, dest)
    return this
  }

  readPackageJson(file) {
    const content = fs.readFileSync(file, 'utf-8');
    return JSON.parse(content);
  }

  run() {
    console.log('Running build now');

    // Create base build directory
    this.mkdir(this.build_path);

    for (let project of this.projects) {
      this.build(project);
    }
  }

  async build(project) {
    console.log(`Building ${project}`)

    // Define and create project build directory
    const build_path = resolve(this.build_path, project);

    // Delete and remake project build directory
    this.rmdir(build_path).mkdir(build_path);

    // Copy project files to build directory
    this.copy(resolve(this.projects_path, project), build_path);

    // Read project package.json
    const packageJson = this.readPackageJson(build_path + '/package.json');

    console.log(packageJson)

    await this.buildSubfolders(project, build_path, build_path);

  }

  async buildSubfolders(project, build_path, path) {

    //console.log("build_subfolders:", path);

    // const dirs = this.getDirectories(path);
    // //console.log(dirs)
    // for (let dir of dirs) {
    //   if (dir == 'node_modules') continue;
    //   const subfolder_path = resolve(path, dir);
    //   this.build_subfolders(project, build_path, subfolder_path)

    //   // Build this subfolder
    //   console.log("Build " + subfolder_path)
    // }


    const subfolder_path = resolve(path, 'auth/adapters');
    console.log("Build " + subfolder_path)

    console.log(this.vite_config('adapters'))

    const vite_config = {
      name: 'adapters',
      entry: resolve(subfolder_path, 'index.ts')
    };
    console.log(vite_config)

    try {
      await build(this.vite_config(vite_config));
    } catch (e) {
      console.log(e)
    }






  }

}







// const getDirectories = (source) =>
//   fs.readdirSync(source, { withFileTypes: true })
//     .filter(dirent => dirent.isDirectory())
//     .map(dirent => dirent.name)

// const getDirectories = (source) => {
//   return fs.readdirSync(source, { withFileTypes: true })
//     .filter(dirent => dirent.isDirectory())
//     .map(dirent => dirent.name)
// }

// function getDirectories(source) {
//   return fs.readdirSync(source, { withFileTypes: true })
//     .filter(dirent => dirent.isDirectory())
//     .map(dirent => dirent.name)
// }

// const getDirectories = function(source) {
//     return fs.readdirSync(source, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name)
// }

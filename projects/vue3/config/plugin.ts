import { App } from 'vue';

/**
 * Vue3 Configuration Plugin
 */
export function createConfig(config: any) {
  return {
    install(app: App): void {
      console.debug('Plugin uvicore.config started');

      // Add config to our globalProperties
      // Accessible from components with this.$config
      app.config.globalProperties.$config = config

      // But in setup() we don't have access to this so we also
      // provide the config through injection.
      app.provide('config', config)
    }
  }
}

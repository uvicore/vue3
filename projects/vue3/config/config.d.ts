// mReschke vuex tyepscript
import { ComponentCustomProperties } from 'vue'


declare module '@vue/runtime-core' {

  // provide typings for `this.$api
  interface ComponentCustomProperties {
    $config: any
  }
}

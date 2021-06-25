import { defineStore } from 'pinia';

export const useConfigStore = defineStore({
  // unique id of the store across your application
  id: 'config',

  state: () => ({
    config: {}
  }),

  getters: {
  },

  actions: {
    load(config: any) {
      this.config = config;
    }

  }

});








// def cant(self, permissions: Union[str, List]) -> bool:
//     """Check if user does not have one of these permissions"""
//     return not self.can(permissions)

// def cannot(self, permissions: Union[str, List]) -> bool:
//     """Alias to cant"""
//     return not self.cant(permissions)

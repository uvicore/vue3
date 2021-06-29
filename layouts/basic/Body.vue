<template>
  <main class="max-w-7xl mx-auto pb-10 lg:py-12 lg:px-8">
    <div class="lg:grid lg:grid-cols-12 lg:gap-x-5">

      <!-- Sidenav Content -->
      <aside class="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
        <nav class="space-y-1">
          <slot name="sidenav"></slot>
        </nav>
      </aside>

      <div class="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
        <section aria-labelledby="payment_details_heading">
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            <div class="bg-white py-6 px-4 space-y-6 sm:p-6">

              <!-- Router Outlet -->
              <router-view></router-view>

            </div>
          </div>
        </section>
      </div>

    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { SearchIcon } from '@heroicons/vue/solid'

export default defineComponent({
  name: 'SearchBox',

  components: {
    // Hero Icons
    SearchIcon,
  },

  setup() {

  },
})
</script>

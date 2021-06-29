<template>

  <Header>
    <template v-slot:logo>
      <slot name="header-logo"></slot>
    </template>

    <template v-slot:left-items>
      <slot name="header-left-items"></slot>
    </template>

    <template v-slot:right-items>
      <slot name="header-right-items"></slot>
    </template>

    <template v-slot:tasktray>
      <slot name="header-tasktray"></slot>
    </template>
  </Header>

  <Body>
    <template v-slot:sidenav>
      <slot name="body-sidenav"></slot>
    </template>
  </Body>

</template>



<script lang="ts">
import { defineComponent } from 'vue'
import Header from './Header.vue'
import Body from './Body.vue'

export default defineComponent({
  name: 'Layout',

  components: {
    Header,
    Body,
  },

  setup() {

  },

})
</script>

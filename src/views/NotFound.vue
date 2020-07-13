<template>
  <v-container
    fluid
    fill-height
  >
    <v-row
      align="center"
      justify="center"
      class="text-center"
    >
      <v-col cols="auto">
        <img
          :src="require('@/assets/404.png')"
          alt=""
          style="max-width: 100%"
        >
        <p class="mt-6 grey--text font-weight-regular headline">
          Oops!页面不存在...
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

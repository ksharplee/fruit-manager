<template>
  <v-app id="inspire">
    <router-view />
    <v-snackbar
      :value="snackbarShow"
      :color="snackbarColor"
      :timeout="3000"
      top
      @input="toggleSnackbar"
    >
      <div class="d-flex align-center">
        {{ snackbarText }}
        <v-icon
          dark
          class="ml-auto"
        >
          {{ snackbarIcon }}
        </v-icon>
      </div>
    </v-snackbar>
    <div
      v-show="$store.state.loading"
      style="position: absolute;top:0;right:0;left:0;z-index:100"
    >
      <v-progress-linear
        indeterminate
        height="5"
        striped
        color="yellow accent-2"
      />
    </div>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapState([
      'snackbarColor',
      'snackbarShow',
      'snackbarText',
      'snackbarIcon',
      'loading',
    ]),
  },
  methods: {
    toggleSnackbar(v) {
      if (!v) {
        this.$store.commit('CLOSE_SNACKBAR');
      }
    },
  },
};
</script>

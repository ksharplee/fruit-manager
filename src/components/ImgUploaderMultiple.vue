<template>
  <span>
    <v-btn
      color="primary"
      outlined
      @click="getImgClick"
    >
      <v-icon left>
        mdi-plus
      </v-icon>
      批量添加
    </v-btn>
    <v-file-input
      ref="uploader"
      outlined
      hide-details
      single-line
      multiple
      prepend-icon=""
      clearable
      dense
      accept="image/*"
      style="position:absolute;clip:rect(0px,0px,0px,0px);"
      @change="getImgs"
    />
    <v-dialog
      v-if="dialog"
      :value="true"
      persistent
      width="300"
    >
      <v-card
        dark
        color="white"
      >
        <v-progress-linear indeterminate />
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ImgUploaderMultiple',
  props: {
    dir: {
      type: String,
      default: 'ad',
    },
    count: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      dialog: false,
      imgs: [],
    };
  },
  created() {},
  methods: {
    ...mapActions(['uploadImgMultipleAsync']),
    getImgClick() {
      this.$refs.uploader.$refs.input.click();
    },
    getImgs(files) {
      if (!files.length) {
        return;
      }
      if (files.length > this.count) {
        this.$store.commit('TOGGLE_SNACKBAR', {
          type: 'error',
          text: `请不要上传大于${this.count}张图片`,
        });
        return;
      }
      if (this.$store.$R.find((item) => item.size > 4 * 1024 * 1024, files)) {
        this.$store.commit('TOGGLE_SNACKBAR', {
          type: 'error',
          text: '上传图片大小请勿超过4M',
        });
        return;
      }
      this.dialog = true;
      const postData = new FormData();
      for (let i = 0; i < files.length; i += 1) {
        const file = files[i];
        postData.append('file[]', file);
      }
      // dir  ['product','detailProduct','ad','other']
      postData.append('dir', this.dir);
      this.uploadImgMultipleAsync(postData)
        .then((pics) => {
          this.$emit('update:pics', pics);
        })
        .finally(() => {
          this.dialog = false;
        });
    },
  },
};
</script>

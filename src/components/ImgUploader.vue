<template>
  <v-card
    outlined
    class="position-relative"
  >
    <v-btn
      v-if="removable"
      icon
      small
      class="close-icon"
      @click="$emit('update:remove')"
    >
      <v-icon>mdi-close-circle</v-icon>
    </v-btn>
    <v-img
      :src="path"
      :aspect-ratio="aspectRatio"
      style="cursor: pointer"
      @click="getImgClick"
    >
      <template v-slot:placeholder>
        <v-row
          class="fill-height ma-0 grey lighten-4"
          align="center"
          justify="center"
        >
          <v-progress-circular
            v-if="uploading"
            indeterminate
            color="primary"
          />
          <div
            v-if="!path && !uploading"
            class="text-center"
          >
            <v-icon
              large
              color="grey"
            >
              mdi-plus
            </v-icon>
            <div
              v-if="caption"
              class="grey--text"
            >
              {{ caption }}
            </div>
          </div>
        </v-row>
      </template>
    </v-img>
    <v-file-input
      ref="uploader"
      hide-input
      label=""
      prepend-icon=""
      accept="image/*"
      style="position:absolute;clip:rect(0px,0px,0px,0px);"
      @change="uploadImg"
    />
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ImgUploader',
  props: {
    aspectRatio: {
      type: Number,
      default: 1,
    },
    path: {
      type: String,
      default: '',
    },
    caption: {
      type: String,
      default: '',
    },
    dir: {
      type: String,
      default: 'ad',
    },
    removable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      uploading: false,
    };
  },
  methods: {
    ...mapActions(['uploadImgAsync']),
    getImgClick() {
      this.$refs.uploader.$refs.input.click();
    },
    uploadImg(v) {
      if (v.size > 4 * 1024 * 1024) {
        this.$store.commit('TOGGLE_SNACKBAR', {
          type: 'error',
          text: '上传图片大小请勿超过4M',
        });
        return;
      }
      this.uploading = true;
      const formData = new FormData();
      // dir  ['product','detailProduct','ad','other']
      formData.append('dir', this.dir);
      formData.append('file', v);
      this.uploadImgAsync(formData).then((res) => {
        this.$emit('update:src', res);
      }).finally(() => {
        this.uploading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.close-icon {
  position: absolute;
  z-index: 1;
  top: -10px;
  right: -10px;
  cursor: pointer;
  background-color: #fff;
}
</style>

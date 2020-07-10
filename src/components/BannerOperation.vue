<template>
  <v-dialog
    :value="show"
    persistent
    max-width="600"
    @click:outside="$emit('update:close')"
  >
    <v-form
      ref="form"
      v-model="valid"
    >
      <v-card>
        <v-card-title class="text-h6 grey lighten-3 pa-4">
          {{ edit ? '编辑' : '添加' }}轮播图
        </v-card-title>
        <v-card-text class="pt-6">
          <img-uploader
            :path="banner.images"
            :aspect-ratio="2"
            caption="图片最佳尺寸为750*375像素"
            class="mb-3"
            @update:src="getPicPath"
          />
          <v-text-field
            v-model="banner.dnames"
            :label="banner.dnames ? '广告标题' : ''"
            placeholder="请输入广告标题"
            dense
            outlined
            clearable
          />
          <v-text-field
            v-model="banner.links"
            :rules="linkRules"
            :label="banner.links ? '广告链接' : ''"
            placeholder="请输入广告链接"
            dense
            outlined
            clearable
            required
          />
          <v-text-field
            v-model="banner.sort"
            type="number"
            :label="banner.sort ? '广告排序' : ''"
            placeholder="请输入广告排序"
            dense
            outlined
            clearable
          />
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1" />
          <v-btn
            :loading="submitting"
            :disabled="!valid || submitting"
            color="primary"
            @click="submitForm"
          >
            提交
          </v-btn>
          <v-btn
            color="secondary"
            @click="$emit('update:close')"
          >
            取消
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import ImgUploader from './ImgUploader.vue';

export default {
  name: 'BannerOperation',
  components: {
    ImgUploader,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    submitting: {
      type: Boolean,
      default: false,
    },
    edit: {
      type: Boolean,
      default: false,
    },
    target: {
      type: Object,
      default: () => ({
        dnames: '',
        images: '',
        links: '',
        sort: '99',
      }),
    },
  },
  data() {
    return {
      valid: true,
      linkRules: [(v) => !!v || '请填写广告链接...'],
      banner: {
        dnames: '',
        images: '',
        links: '',
        sort: '99',
      },
    };
  },
  watch: {
    show() {
      if (this.edit) {
        this.banner = JSON.parse(JSON.stringify(this.target));
      } else {
        this.banner = {
          dnames: '',
          images: '',
          links: '',
          sort: '99',
        };
      }
    },
  },
  methods: {
    getPicPath(v) {
      this.$set(this.banner, 'images', v);
    },
    submitForm() {
      if (!this.banner.images) {
        this.$store.commit('TOGGLE_SNACKBAR', {
          type: 'error',
          text: '请上传轮播图片',
        });
        return;
      }
      this.$emit('update:submit', this.banner);
    },
  },
};
</script>

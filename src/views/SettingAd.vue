<template>
  <div>
    <div class="text-h6 d-flex flex-wrap align-center pb-4">
      系统广告
      <v-btn
        color="primary"
        class="ml-auto"
        @click="openDialog(null)"
      >
        <v-icon left>
          mdi-plus
        </v-icon>添加轮播图
      </v-btn>
    </div>
    <v-skeleton-loader
      :loading="loading"
      height="500"
      transition="fade"
      type="table"
    >
      <v-simple-table class="text-center">
        <template v-slot:default>
          <thead>
            <tr class="grey lighten-3">
              <th
                class="text-center"
                width="100"
              >
                序号
              </th>
              <th
                class="text-center"
              >
                标题
              </th>
              <th
                class="text-center"
              >
                链接
              </th>
              <th
                class="text-center"
                width="150"
              >
                图片
              </th>
              <th class="pr-10 text-right">
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in banner.data"
              :key="item.id"
            >
              <td>{{ item.sort }}</td>
              <td class="text-left">
                {{ item.dnames }}
              </td>
              <td class="text-left">
                {{ item.links }}
              </td>
              <td>
                <v-img
                  :src="item.images"
                  aspect-ratio="2"
                  class="grey lighten-4 ma-2"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-icon v-if="!item.images">
                        mdi-alert-octagon-outline
                      </v-icon>
                      <v-progress-circular
                        v-else
                        indeterminate
                        color="grey lighten-2"
                      />
                    </v-row>
                  </template>
                </v-img>
              </td>
              <td class="text-right">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      icon
                      class="mx-1"
                      v-on="on"
                      @click="openDialog({
                        target: item,
                        edit: true,
                      })"
                    >
                      <v-icon color="teal">
                        mdi-pencil-circle
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>编辑</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      icon
                      class="mx-1"
                      v-on="on"
                      @click="dialogDelete = true;toDeleteId = item.id"
                    >
                      <v-icon color="secondary">
                        mdi-delete-forever
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>删除</span>
                </v-tooltip>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-skeleton-loader>
    <banner-operation
      :target="target"
      :show="dialog"
      :edit="edit"
      :submitting="editing"
      @update:close="dialog = false"
      @update:submit="editBanner"
    />
    <v-dialog
      v-model="dialogDelete"
      max-width="350"
    >
      <v-card>
        <v-card-title class="title grey lighten-3">
          确定删除吗?
        </v-card-title>
        <v-card-actions>
          <div class="flex-grow-1" />
          <v-btn
            color="primary"
            :loading="deleting"
            :disabled="deleting"
            @click="deleteBanner"
          >
            提交
          </v-btn>
          <v-btn
            color="secondary"
            @click="dialogDelete = false"
          >
            取消
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import BannerOperation from '@/components/BannerOperation.vue';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'SettingAd',
  components: {
    BannerOperation,
  },
  data() {
    return {
      loading: false,
      dialog: false,
      edit: false,
      editing: false,
      desserts: [],
      dialogDelete: false,
      deleting: false,
      target: {},
      toDeleteId: '',
    };
  },
  computed: {
    ...mapState('setting', ['banner']),
  },
  created() {
    if (!this.banner.status) {
      this.getBanner();
    }
  },
  methods: {
    ...mapActions('setting', ['getBannerAsync', 'addBannerAsync', 'editBannerAsync', 'deleteBannerAsync']),
    openDialog(options) {
      if (options) {
        this.edit = true;
        this.target = options.target;
      } else {
        this.edit = false;
      }
      this.dialog = true;
    },
    getBanner() {
      this.loading = true;
      this.getBannerAsync().finally(() => {
        this.loading = false;
      });
    },
    editBanner(v) {
      this.editing = true;
      if (this.edit) {
        this.editBannerAsync(v).finally(() => {
          this.editing = false;
          this.dialog = false;
        });
      } else {
        this.addBannerAsync(v).finally(() => {
          this.editing = false;
          this.dialog = false;
        });
      }
    },
    deleteBanner() {
      this.deleting = true;
      this.deleteBannerAsync({ id: this.toDeleteId }).finally(() => {
        this.deleting = false;
        this.dialogDelete = false;
      });
    },
  },
};
</script>

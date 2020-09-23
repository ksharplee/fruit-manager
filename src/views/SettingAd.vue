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
      :loading="loadingData"
      height="500"
      transition="fade"
      type="table"
    >
      <v-card>
        <v-data-table
          :headers="headers"
          :items="banner.data"
          :loading="loading"
          loading-text="加载中..."
          hide-default-footer
          no-data-text="暂无数据"
          fixed-header
          :page.sync="page"
          :items-per-page="itemsPerPage"
          @page-count="pageCount = $event"
        >
          <template v-slot:item.images="{item}">
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
          </template>
          <template v-slot:item.action="{item}">
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
          </template>
        </v-data-table>
        <div class="text-center pt-2 grey lighten-4">
          <v-pagination
            v-model="page"
            :length="pageCount"
            current-page-aria-label="当前页"
            next-aria-label="下一页"
            page-aria-label="分页"
            wrapper-aria-label="隐藏页"
            previous-aria-label="上一页"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
          />
        </div>
      </v-card>
    </v-skeleton-loader>
    <component
      :is="component"
      :target="target"
      :show="dialog"
      :edit="edit"
      :submitting="editing"
      @update:close="dialog = false;component = null;"
      @update:submit="editBanner"
    />
    <!-- <banner-operation
      :target="target"
      :show="dialog"
      :edit="edit"
      :submitting="editing"
      @update:close="dialog = false"
      @update:submit="editBanner"
    /> -->
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
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      component: null,
      loading: false,
      loadingData: false,
      dialog: false,
      edit: false,
      editing: false,
      desserts: [],
      dialogDelete: false,
      deleting: false,
      target: {},
      toDeleteId: '',
      headers: [
        {
          text: '序号',
          value: 'sort',
          align: 'center',
          sortable: false,
          class: 'grey lighten-4',
        },
        {
          text: '标题',
          value: 'dnames',
          align: 'center',
          sortable: false,
          class: 'grey lighten-4',
        },
        {
          text: '图片',
          value: 'images',
          align: 'center',
          width: '150',
          class: 'pr-10 grey lighten-4',
          sortable: false,
        },
        {
          text: '操作',
          value: 'action',
          align: 'right',
          class: 'pr-10 grey lighten-4',
          sortable: false,
        },
      ],
    };
  },
  computed: {
    ...mapState('setting', ['banner']),
  },
  created() {
    if (!this.banner.status) {
      this.loadingData = true;
      this.getBanner();
    }
  },
  methods: {
    ...mapActions('setting', [
      'getBannerAsync',
      'addBannerAsync',
      'editBannerAsync',
      'deleteBannerAsync',
    ]),
    openDialog(options) {
      if (options) {
        this.edit = true;
        this.target = options.target;
      } else {
        this.edit = false;
        this.target = {
          dnames: '',
          images: '',
          links: '',
          sort: '99',
        };
      }
      this.dialog = true;
      this.component = BannerOperation;
    },
    getBanner() {
      this.loading = true;
      this.getBannerAsync().finally(() => {
        this.loading = false;
        this.loadingData = false;
      });
    },
    editBanner(v) {
      this.editing = true;
      this.loading = true;
      if (this.edit) {
        this.editBannerAsync(v).finally(() => {
          this.editing = false;
          this.dialog = false;
          this.component = null;
          this.loading = false;
        });
      } else {
        this.addBannerAsync(v).finally(() => {
          this.editing = false;
          this.dialog = false;
          this.component = null;
          this.loading = false;
        });
      }
    },
    deleteBanner() {
      this.deleting = true;
      this.loading = true;
      this.deleteBannerAsync({ id: this.toDeleteId }).finally(() => {
        this.deleting = false;
        this.loading = false;
        this.dialogDelete = false;
      });
    },
  },
};
</script>

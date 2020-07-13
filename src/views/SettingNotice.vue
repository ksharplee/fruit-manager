<template>
  <div>
    <div class="text-h6 d-flex flex-wrap align-center pb-4">
      系统公告
      <v-btn
        color="primary"
        class="ml-auto"
        :to="{name: 'SettingNoticeOperation', params: {id: 'add'}}"
      >
        <v-icon left>
          mdi-plus
        </v-icon>添加公告
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
          :items="notice.data"
          :page.sync="page"
          :loading="loading"
          loading-text="加载中..."
          :items-per-page="itemsPerPage"
          hide-default-footer
          @page-count="pageCount = $event"
        >
          <template v-slot:item.action="{item}">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  class="mx-1"
                  :disabled="item.dStatus === '4'"
                  :to="{name: 'SettingNoticeOperation', params: {id: item.id, target: item}}"
                  v-on="on"
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
            @click="deleteNotice"
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
import { mapActions, mapState } from 'vuex';

export default {
  name: 'SettingNotice',
  data() {
    return {
      dialogDelete: false,
      deleting: false,
      toDeleteId: '',
      loading: false,
      loadingData: false,
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [
        {
          text: '序号',
          align: 'center',
          sortable: false,
          value: 'sort',
          class: 'grey lighten-4',
        },
        {
          text: '标题',
          align: 'center',
          sortable: false,
          value: 'title',
          class: 'grey lighten-4',
        },
        {
          text: '发布时间',
          align: 'center',
          sortable: false,
          value: 'createTime',
          class: 'grey lighten-4',
        },
        {
          text: '操作',
          value: 'action',
          align: 'right',
          sortable: false,
          class: 'grey lighten-4 pr-10',
        },
      ],
    };
  },
  computed: {
    ...mapState('setting', ['notice']),
  },
  created() {
    if (!this.notice.status) {
      this.loadingData = true;
      this.getNotice();
    }
  },
  methods: {
    ...mapActions('setting', ['getNoticeAsync', 'deleteNoticeAsync']),
    getNotice(params) {
      this.loading = true;
      this.getNoticeAsync(params).finally(() => {
        this.loading = false;
        this.loadingData = false;
      });
    },
    deleteNotice() {
      this.deleting = true;
      this.loading = true;
      this.deleteNoticeAsync({ id: this.toDeleteId }).finally(() => {
        this.deleting = false;
        this.loading = false;
        this.dialogDelete = false;
      });
    },
  },
};
</script>

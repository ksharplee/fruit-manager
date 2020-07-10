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
      :loading="loading"
      height="500"
      transition="fade"
      type="table"
    >
      <v-card>
        <v-data-table
          :headers="headers"
          :items="notice.data"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          @page-count="pageCount = $event"
        />
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
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'SettingNotice',
  data() {
    return {
      loading: false,
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
      this.getNotice();
    }
  },
  methods: {
    ...mapActions('setting', ['getNoticeAsync']),
    getNotice() {
      this.loading = true;
      this.getNoticeAsync().finally(() => {
        this.loading = false;
      });
    },
  },
};
</script>

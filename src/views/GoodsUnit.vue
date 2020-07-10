<template>
  <div>
    <div class="text-h6 d-flex flex-wrap align-center pb-4">
      单位列表
      <v-btn
        color="primary"
        class="ml-auto"
        depressed
        @click="dialogSingle = true;edit = false"
      >
        <v-icon left>
          mdi-plus
        </v-icon>添加单位
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
          :items="unit.data"
          :loading="loading"
          class="text-center"
          no-data-text="暂无数据"
          hide-default-footer
          fixed-header
          :items-per-page="20"
        >
          <template v-slot:body="{ items }">
            <tbody>
              <tr
                v-for="item in items"
                :key="item.id"
              >
                <td>{{ item.sort }}</td>
                <td class="pa-3">
                  {{ item.dnames }}
                </td>
                <td class="text-right">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        icon
                        class="mx-1"
                        v-on="on"
                        @click="target = item;edit = true;dialogSingle = true"
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
                        @click="dialogDelete = true;toDeleteUnit = item.id"
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
        </v-data-table>
      </v-card>
    </v-skeleton-loader>
    <units-single
      :edit="edit"
      :target="target"
      :show="dialogSingle"
      @close-dialog="dialogSingle = false"
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
            @click="deleteUnits"
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
import { mapState, mapActions } from 'vuex';
import UnitsSingle from '@/components/UnitsSingle.vue';

export default {
  name: 'GoodsUnit',
  components: { UnitsSingle },
  data() {
    return {
      loading: false,
      dialogSingle: false,
      dialogDelete: false,
      deleting: false,
      toDeleteUnit: '',
      edit: true,
      target: {},
      headers: [
        {
          text: '排序',
          value: 'sort',
          align: 'center',
          sortable: false,
          class: 'grey lighten-4',
        },
        {
          text: '中文名称',
          value: 'dnames',
          align: 'center',
          sortable: false,
          class: 'grey lighten-4',
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
    ...mapState('product', ['unit']),
  },
  created() {
    if (!this.unit.status) {
      this.getUnitsList();
    }
  },
  methods: {
    ...mapActions('product', ['getUnitAsync', 'deleteUnitAsync']),
    // 获取单位列表
    getUnitsList(params) {
      this.loading = true;
      this.getUnitAsync(params)
        .finally(() => {
          this.loading = false;
        });
    },
    // 删除单位
    deleteUnits() {
      this.deleting = true;
      this.deleteUnitAsync({ id: this.toDeleteUnit })
        .finally(() => {
          this.deleting = false;
          this.dialogDelete = false;
        });
    },
  },
};
</script>

<template>
  <div>
    <div class="text-h6 d-flex flex-wrap align-center pb-4">
      类别列表
      <v-btn
        color="primary"
        class="ml-auto"
        @click="openDialogAdd(null)"
      >
        <v-icon left>
          mdi-plus
        </v-icon>添加类别
      </v-btn>
    </div>
    <v-skeleton-loader
      :loading="loadingData"
      height="500"
      transition="fade"
      type="table"
    >
      <v-card :loading="loading">
        <div class="d-flex grey lighten-4 py-4 text-center px-2 font-weight-bold">
          <div class="flex-grow-1">
            分类名称
          </div>
          <div style="width:150px">
            排序
          </div>
          <div
            style="width:300px"
            class="text-right pr-6"
          >
            操作
          </div>
        </div>
        <v-treeview
          v-if="category.data.length"
          :items="category.data"
          open-all
          item-text="dnames"
          item-key="id"
          item-children="son"
          hoverable
        >
          <template v-slot:prepend="{ item, leaf, open }">
            <v-icon>
              {{ leaf ? 'mdi-bookmark-outline' : open ? 'mdi-bookmark-outline' : 'mdi-bookmark' }}
            </v-icon>
          </template>
          <template v-slot:append="{ item }">
            <div class="d-flex text-center align-center">
              <div style="width:150px">
                {{ item.sort }}
              </div>
              <div
                style="width:300px"
                class="text-right"
              >
                <v-tooltip
                  v-if="item.parentId === '0'"
                  bottom
                >
                  <template v-slot:activator="{ on }">
                    <v-btn
                      icon
                      class="mx-1"
                      v-on="on"
                      @click="openDialogAdd(item)"
                    >
                      <v-icon color="primary">
                        mdi-bell-plus
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>添加子类</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      icon
                      class="mx-1"
                      v-on="on"
                      @click="openDialogEdit(item)"
                    >
                      <v-icon color="teal">
                        mdi-pencil-circle
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>编辑</span>
                </v-tooltip>
                <v-tooltip
                  bottom
                >
                  <template v-slot:activator="{ on }">
                    <v-btn
                      icon
                      class="mx-1"
                      :disabled="!!(item.parentId === '0' && item.son)"
                      v-on="on"
                      @click="openDialogDelete(item.id)"
                    >
                      <v-icon color="secondary">
                        mdi-delete-forever
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>删除</span>
                </v-tooltip>
              </div>
            </div>
          </template>
        </v-treeview>
        <div
          v-else
          class="py-4 grey--text text-center"
        >
          暂无商品分类
        </div>
      </v-card>
    </v-skeleton-loader>
    <v-dialog
      v-model="dialogAdd"
      width="800"
    >
      <v-card>
        <v-form
          ref="form"
          v-model="valid"
        >
          <v-card-title class="text-h6 grey lighten-3">
            添加分类
          </v-card-title>
          <div class="pa-4">
            <v-row class="font-weight-bold">
              <v-col md="6">
                分类名称
              </v-col>
              <v-col md="6">
                排序
              </v-col>
            </v-row>
            <v-row
              class="mb-2"
            >
              <v-col md="6">
                <v-text-field
                  v-model="cateToAdd.dnames"
                  :rules="nameRules"
                  placeholder="请输入分类名"
                  outlined
                  clearable
                  required
                  single-line
                  hide-details
                  dense
                />
              </v-col>
              <v-col md="6">
                <v-text-field
                  v-model="cateToAdd.sort"
                  :rules="sortRules"
                  placeholder="请输入分类序号"
                  type="number"
                  outlined
                  clearable
                  single-line
                  hide-details
                  dense
                />
              </v-col>
            </v-row>
          </div>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              :loading="addingCate"
              :disabled="!valid || addingCate"
              @click="addCateConfirm"
            >
              确定
            </v-btn>
            <v-btn
              color="secondary"
              @click="dialogAdd = false"
            >
              取消
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogEdit"
      width="800"
    >
      <v-card>
        <v-form
          ref="form"
          v-model="valid"
        >
          <v-card-title class="text-h6 grey lighten-3">
            添加分类
          </v-card-title>
          <div class="pa-4">
            <v-row class="font-weight-bold">
              <v-col md="6">
                分类名称
              </v-col>
              <v-col md="6">
                排序
              </v-col>
            </v-row>
            <v-row class="mb-2">
              <v-col md="6">
                <v-text-field
                  v-model="cateToEdit.dnames"
                  :rules="nameRules"
                  outlined
                  clearable
                  required
                  single-line
                  hide-details
                  dense
                />
              </v-col>
              <v-col md="6">
                <v-text-field
                  v-model="cateToEdit.sort"
                  :rules="sortRules"
                  type="number"
                  outlined
                  clearable
                  single-line
                  hide-details
                  dense
                />
              </v-col>
            </v-row>
          </div>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              :loading="editingCate"
              :disabled="!valid || editingCate"
              @click="editCateConfirm"
            >
              确定
            </v-btn>
            <v-btn
              color="secondary"
              @click="dialogEdit = false"
            >
              取消
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogDelete"
      persistent
      max-width="350px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title class="grey lighten-3">
          确定删除吗?
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            :loading="deletingCate"
            :disabled="deletingCate"
            @click="deleteCateConfirm"
          >
            确定
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

export default {
  name: 'GoodsCategory',
  data() {
    return {
      loading: false,
      loadingData: false,
      dialogAdd: false,
      dialogEdit: false,
      dialogDelete: false,
      addingCate: false,
      editingCate: false,
      deletingCate: false,
      valid: true,
      cateToAdd: {},
      cateToEdit: {},
      cateToDelete: '',
      parentId: '0',
      nameRules: [(v) => !!v || '请填写分类名称'],
      sortRules: [(v) => (v && v >= 0) || '请填写分类名称'],
      switchOptions: [
        {
          id: '1',
          name: '是',
        },
        {
          id: '0',
          name: '否',
        },
      ],
    };
  },
  computed: {
    ...mapState('product', ['category']),
  },
  created() {
    if (!this.category.status) {
      this.loadingData = true;
      this.getCategory();
    }
  },
  methods: {
    ...mapActions('product', ['getCategoryAsync', 'addCategoryAsync', 'editCategoryAsync', 'deleteCategoryAsync']),
    getCategory() {
      this.loading = true;
      this.getCategoryAsync().finally(() => {
        this.loading = false;
        this.loadingData = false;
      });
    },
    openDialogAdd(params) {
      this.dialogAdd = true;
      this.cateToAdd = {
        parentId: params ? params.id : '0',
        dnames: '',
        dLevel: params ? '2' : '1',
        parentsPath: params ? params.parentsPath : '',
        sort: params ? params.sort : 99,
      };
    },
    openDialogEdit(item) {
      this.dialogEdit = true;
      this.cateToEdit = this.$store.$R.clone(item);
    },
    openDialogDelete(id) {
      this.dialogDelete = true;
      this.cateToDelete = id;
    },
    addCateConfirm() {
      this.addingCate = true;
      this.loading = true;
      this.addCategoryAsync(this.cateToAdd)
        .finally(() => {
          this.addingCate = false;
          this.loading = false;
          this.dialogAdd = false;
        });
    },
    editCateConfirm() {
      this.editingCate = true;
      this.loading = true;
      this.editCategoryAsync(this.cateToEdit)
        .finally(() => {
          this.editingCate = false;
          this.dialogEdit = false;
          this.loading = false;
        });
    },
    deleteCateConfirm() {
      this.deletingCate = true;
      this.loading = true;
      this.deleteCategoryAsync({ id: this.cateToDelete })
        .finally(() => {
          this.deletingCate = false;
          this.dialogDelete = false;
          this.loading = false;
        });
    },
  },
};
</script>

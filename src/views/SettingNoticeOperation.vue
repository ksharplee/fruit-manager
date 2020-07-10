<template>
  <div>
    <v-card>
      <v-card-title class="grey lighten-5">
        {{ id === 'add' ? '添加' : '编辑' }}系统公告
      </v-card-title>
      <div class="pa-4">
        <v-form
          ref="form"
          v-model="valid"
        >
          <v-row>
            <v-col
              cols="12"
              sm="8"
            >
              <v-text-field
                v-model="notice.title"
                :rules="titleRules"
                label="标题"
                required
                clearable
                dense
                outlined
              />
            </v-col>
            <v-col
              cols="12"
              sm="4"
            >
              <v-text-field
                v-model="notice.sort"
                type="number"
                label="排序"
                required
                clearable
                dense
                outlined
              />
            </v-col>
            <v-col cols="12">
              <div class="text-h6 mb-3">
                公告内容
              </div>
              <wang-editor @update:html="notice.content = $event" />
            </v-col>
          </v-row>
        </v-form>
      </div>
    </v-card>
    <div class="py-6">
      <v-btn
        :loading="submitting"
        :disabled="!valid || submitting"
        color="primary"
        large
        @click="submitForm"
      >
        提交
      </v-btn>
    </div>
  </div>
</template>

<script>
import WangEditor from '@/components/WangEditor.vue';
import { mapActions } from 'vuex';

export default {
  name: 'SettingNoticeOperation',
  components: {
    WangEditor,
  },
  props: {
    id: {
      type: String,
      default: 'add',
    },
    target: {
      type: Object,
      default: () => ({
        title: '',
        content: '',
        sort: '',
      }),
    },
  },
  data() {
    return {
      valid: true,
      submitting: false,
      notice: {
        title: '',
        content: '',
        sort: '',
      },
      titleRules: [(v) => !!v || '请填写标题...'],
    };
  },
  created() {
    if (this.id !== 'add') {
      let notice = JSON.stringify(this.target);
      if (this.target.title) {
        sessionStorage.setItem('localNotice', notice);
      } else {
        notice = sessionStorage.getItem('localNotice');
      }
      this.notice = JSON.parse(notice);
    }
  },
  methods: {
    ...mapActions('setting', ['addNoticeAsync', 'editNoticeAsync']),
    submitForm() {
      this.submitting = true;
      if (this.id === 'add') {
        this.addNoticeAsync(this.notice).finally(() => {
          this.submitting = false;
        });
      } else {
        this.editNoticeAsync({ id: this.id, ...this.notice }).finally(() => {
          this.submitting = false;
        });
      }
    },
  },
};
</script>

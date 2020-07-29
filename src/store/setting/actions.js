export default {
  // 商品列表
  async getGoodsListAsync(context, payload) {
    try {
      const res = await this.$http.post('/g/lists.html', payload);
      if (res.data.status === 1) {
        context.commit('SET_GOODS_LIST', res.data);
        return Promise.resolve(res.data.status);
      }
      throw new Error(res.data.info);
    } catch (error) {
      context.commit(
        'TOGGLE_SNACKBAR',
        {
          type: 'error',
          text: error.message,
        },
        { root: true },
      );
      return Promise.reject(error);
    }
  },
  // 活动列表
  async getPromotionAsync(context, payload) {
    try {
      const res = await this.$http.post('/ac/lists.html', payload);
      if (res.data.status === 1) {
        context.commit('SET_SETTING_PROMOTION', res.data.data ? res.data.data : []);
        return Promise.resolve(res.data.status);
      }
      throw new Error(res.data.info);
    } catch (error) {
      context.commit(
        'TOGGLE_SNACKBAR',
        {
          type: 'error',
          text: error.message,
        },
        { root: true },
      );
      return Promise.reject(error);
    }
  },
  // 活动添加
  async addPromotionAsync(context, payload) {
    try {
      const res = await this.$http.post('/ac/add.html', payload);
      if (res.data.status === 1) {
        await context.dispatch('getPromotionAsync');
        context.commit(
          'TOGGLE_SNACKBAR',
          {
            type: 'success',
            text: '添加活动成功',
          },
          { root: true },
        );
        return Promise.resolve(res.data.status);
      }
      throw new Error(res.data.info);
    } catch (error) {
      context.commit(
        'TOGGLE_SNACKBAR',
        {
          type: 'error',
          text: error.message,
        },
        { root: true },
      );
      return Promise.reject(error);
    }
  },
  // 广告删除
  async deletePromotionAsync(context, payload) {
    try {
      const res = await this.$http.post('/ac/delete.html', payload);
      if (res.data.status === 1) {
        context.dispatch('getPromotionAsync');
        context.commit(
          'TOGGLE_SNACKBAR',
          {
            type: 'success',
            text: '删除活动成功',
          },
          { root: true },
        );
        return Promise.resolve(res.data.status);
      }
      throw new Error(res.data.info);
    } catch (error) {
      context.commit(
        'TOGGLE_SNACKBAR',
        {
          type: 'error',
          text: error.message,
        },
        { root: true },
      );
      return Promise.reject(error);
    }
  },
  // 广告列表
  async getBannerAsync(context, payload) {
    try {
      const res = await this.$http.post('/ad/lists.html', payload);
      if (res.data.status === 1) {
        context.commit('SET_SETTING_BANNER', res.data.data ? res.data.data : []);
        return Promise.resolve(res.data.status);
      }
      throw new Error(res.data.info);
    } catch (error) {
      context.commit(
        'TOGGLE_SNACKBAR',
        {
          type: 'error',
          text: error.message,
        },
        { root: true },
      );
      return Promise.reject(error);
    }
  },
  // 广告添加
  async addBannerAsync(context, payload) {
    try {
      const res = await this.$http.post('/ad/add.html', payload);
      if (res.data.status === 1) {
        context.dispatch('getBannerAsync');
        context.commit(
          'TOGGLE_SNACKBAR',
          {
            type: 'success',
            text: '添加广告成功',
          },
          { root: true },
        );
        return Promise.resolve(res.data.status);
      }
      throw new Error(res.data.info);
    } catch (error) {
      context.commit(
        'TOGGLE_SNACKBAR',
        {
          type: 'error',
          text: error.message,
        },
        { root: true },
      );
      return Promise.reject(error);
    }
  },
  // 广告编辑
  async editBannerAsync(context, payload) {
    try {
      const res = await this.$http.post('/ad/edit.html', payload);
      if (res.data.status === 1) {
        context.dispatch('getBannerAsync');
        context.commit(
          'TOGGLE_SNACKBAR',
          {
            type: 'success',
            text: '编辑广告成功',
          },
          { root: true },
        );
        return Promise.resolve(res.data.status);
      }
      throw new Error(res.data.info);
    } catch (error) {
      context.commit(
        'TOGGLE_SNACKBAR',
        {
          type: 'error',
          text: error.message,
        },
        { root: true },
      );
      return Promise.reject(error);
    }
  },
  // 广告删除
  async deleteBannerAsync(context, payload) {
    try {
      const res = await this.$http.post('/ad/delete.html', payload);
      if (res.data.status === 1) {
        context.dispatch('getBannerAsync');
        context.commit(
          'TOGGLE_SNACKBAR',
          {
            type: 'success',
            text: '删除广告成功',
          },
          { root: true },
        );
        return Promise.resolve(res.data.status);
      }
      throw new Error(res.data.info);
    } catch (error) {
      context.commit(
        'TOGGLE_SNACKBAR',
        {
          type: 'error',
          text: error.message,
        },
        { root: true },
      );
      return Promise.reject(error);
    }
  },
  // 公告列表
  async getNoticeAsync(context, payload) {
    try {
      const res = await this.$http.post('/n/lists.html', payload);
      if (res.data.status === 1) {
        context.commit('SET_SETTING_NOTICE', res.data.data ? res.data.data : []);
        return Promise.resolve(res.data.status);
      }
      throw new Error(res.data.info);
    } catch (error) {
      context.commit(
        'TOGGLE_SNACKBAR',
        {
          type: 'error',
          text: error.message,
        },
        { root: true },
      );
      return Promise.reject(error);
    }
  },
  // 公告添加
  async addNoticeAsync(context, payload) {
    try {
      const res = await this.$http.post('/n/add.html', payload);
      if (res.data.status === 1) {
        context.dispatch('getNoticeAsync');
        context.commit(
          'TOGGLE_SNACKBAR',
          {
            type: 'success',
            text: '添加公告成功',
          },
          { root: true },
        );
        return Promise.resolve(res.data.status);
      }
      throw new Error(res.data.info);
    } catch (error) {
      context.commit(
        'TOGGLE_SNACKBAR',
        {
          type: 'error',
          text: error.message,
        },
        { root: true },
      );
      return Promise.reject(error);
    }
  },
  // 公告编辑
  async editNoticeAsync(context, payload) {
    try {
      const res = await this.$http.post('/n/edit.html', payload);
      if (res.data.status === 1) {
        context.dispatch('getNoticeAsync');
        context.commit(
          'TOGGLE_SNACKBAR',
          {
            type: 'success',
            text: '编辑公告成功',
          },
          { root: true },
        );
        return Promise.resolve(res.data.status);
      }
      throw new Error(res.data.info);
    } catch (error) {
      context.commit(
        'TOGGLE_SNACKBAR',
        {
          type: 'error',
          text: error.message,
        },
        { root: true },
      );
      return Promise.reject(error);
    }
  },
  // 公告删除
  async deleteNoticeAsync(context, payload) {
    try {
      const res = await this.$http.post('/n/delete.html', payload);
      if (res.data.status === 1) {
        context.dispatch('getNoticeAsync');
        context.commit(
          'TOGGLE_SNACKBAR',
          {
            type: 'success',
            text: '删除公告成功',
          },
          { root: true },
        );
        return Promise.resolve(res.data.status);
      }
      throw new Error(res.data.info);
    } catch (error) {
      context.commit(
        'TOGGLE_SNACKBAR',
        {
          type: 'error',
          text: error.message,
        },
        { root: true },
      );
      return Promise.reject(error);
    }
  },
};

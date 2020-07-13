export default {
  // 客户列表
  async getCustomerAsync(context, payload) {
    try {
      const res = await this.$http.post('/u/lists.html', payload);
      if (res.data.status === 1) {
        context.commit('SET_CUSTOMER_LIST', res.data);
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
  // 客户编辑
  async editCustomerAsync(context, payload) {
    try {
      const res = await this.$http.post('/u/edit.html', payload);
      if (res.data.status === 1) {
        context.dispatch('getCustomerAsync');
        context.commit(
          'TOGGLE_SNACKBAR',
          {
            type: 'success',
            text: '编辑客户成功',
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
  // 客户详情
  async getCustomerDetailAsync(context, payload) {
    try {
      const res = await this.$http.post('/u/detail.html', payload);
      if (res.data.status === 1) {
        return res.data;
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
  // 客户级分
  async getCustomerPointsAsync(context, payload) {
    try {
      const res = await this.$http.post('/u/jifenDetail.html', payload);
      if (res.data.status === 1) {
        return res.data;
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

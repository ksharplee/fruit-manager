export default {
  // 分类列表
  async getCategoryAsync(context, payload) {
    try {
      const res = await this.$http.post('/c/lists.html', payload);
      if (res.data.status === 1) {
        context.commit('SET_GOODS_CATEGORY', res.data.data ? res.data.data : []);
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
  // 分类添加
  async addCategoryAsync(context, payload) {
    try {
      const res = await this.$http.post('/c/add.html', payload);
      if (res.data.status === 1) {
        await context.dispatch('getCategoryAsync');
        context.commit(
          'TOGGLE_SNACKBAR',
          {
            type: 'success',
            text: '添加分类成功',
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
  // 分类编辑
  async editCategoryAsync(context, payload) {
    try {
      const res = await this.$http.post('/c/edit.html', payload);
      if (res.data.status === 1) {
        await context.dispatch('getCategoryAsync');
        context.commit(
          'TOGGLE_SNACKBAR',
          {
            type: 'success',
            text: '编辑分类成功',
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
  // 分类删除
  async deleteCategoryAsync(context, payload) {
    try {
      const res = await this.$http.post('/c/delete.html', payload);
      if (res.data.status === 1) {
        await context.dispatch('getCategoryAsync');
        context.commit(
          'TOGGLE_SNACKBAR',
          {
            type: 'success',
            text: '删除分类成功',
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
  // 单位列表
  async getUnitAsync(context, payload) {
    try {
      const res = await this.$http.post('/bu/lists.html', payload);
      if (res.data.status === 1) {
        context.commit('SET_GOODS_UNIT', res.data.data ? res.data.data : []);
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
  // 单位添加
  async addUnitAsync(context, payload) {
    try {
      const res = await this.$http.post('/bu/add.html', payload);
      if (res.data.status === 1) {
        await context.dispatch('getUnitAsync');
        context.commit(
          'TOGGLE_SNACKBAR',
          {
            type: 'success',
            text: '添加单位成功',
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
  // 单位编辑
  async editUnitAsync(context, payload) {
    try {
      const res = await this.$http.post('/bu/edit.html', payload);
      if (res.data.status === 1) {
        await context.dispatch('getUnitAsync');
        context.commit(
          'TOGGLE_SNACKBAR',
          {
            type: 'success',
            text: '编辑单位成功',
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
  // 单位删除
  async deleteUnitAsync(context, payload) {
    try {
      const res = await this.$http.post('/bu/delete.html', payload);
      if (res.data.status === 1) {
        await context.dispatch('getUnitAsync');
        context.commit(
          'TOGGLE_SNACKBAR',
          {
            type: 'success',
            text: '删除单位成功',
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
  // 商品添加
  async addGoodsAsync(context, payload) {
    try {
      const res = await this.$http.post('/g/add.html', payload);
      if (res.data.status === 1) {
        await context.dispatch('getGoodsListAsync', { p: 1 });
        context.commit(
          'TOGGLE_SNACKBAR',
          {
            type: 'success',
            text: '添加商品成功',
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
  // 商品编辑
  async editGoodsAsync(context, payload) {
    try {
      const res = await this.$http.post('/g/edit.html', payload);
      if (res.data.status === 1) {
        await context.dispatch('getGoodsListAsync', { p: context.state.list.p });
        context.commit(
          'TOGGLE_SNACKBAR',
          {
            type: 'success',
            text: '添加商品成功',
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
  // 商品详情
  async getGoodsDetailAsync(context, payload) {
    try {
      const res = await this.$http.post('/g/detail.html', payload);
      if (res.data.status === 1) {
        return Promise.resolve(res.data.data);
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
  // 商品删除
  async deleteGoodsAsync(context, payload) {
    try {
      const res = await this.$http.post('/g/delete.html', payload);
      if (res.data.status === 1) {
        await context.dispatch('getGoodsListAsync', { p: context.state.list.p });
        context.commit(
          'TOGGLE_SNACKBAR',
          {
            type: 'success',
            text: '删除商品成功',
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
  // 商品上下架，ids：【】 operate ：0 未上架 1 下架  4上架
  async setGoodsVisibilityAsync(context, payload) {
    try {
      const res = await this.$http.post('/g/setVisible.html', payload);
      if (res.data.status === 1) {
        await context.dispatch('getGoodsListAsync', { p: context.state.list.p });
        context.commit(
          'TOGGLE_SNACKBAR',
          {
            type: 'success',
            text: `${payload.operate === '4' ? '上架' : '下架'}商品成功`,
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

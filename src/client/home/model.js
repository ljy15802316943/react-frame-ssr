import Ajax from 'utils/ajax';

const model = {
  // 命名空间，页面使用的时候引入。
  namespace: 'home',
  state: {
    count: 1, 
    isLoad: false,
  },
  // 同步方法。
  reducers: {
    set(state, {payload}) {
      return {...state, ...payload};
    },
    reset(state) {
      return {...state, ...model.state};
    },
    setCondition(state, {payload}) {
      const params = Mapping.toParams(payload, state._condition, model.state.condition);
      return {...state, condition: {...state.condition, ...params}};
    },

    resetCondition(state) {
      return {...state, condition: {...model.state.condition}};
    },
  },
  // 异步方法。
  effects: {
    * get({payload}, {call,put}) {
      yield put({type: 'set', payload: {isLoad: true}});
      const res = yield call(() => (Ajax.get('/api/get', {
        ...payload,
      })));
      console.log(res, 'get');

      yield put({type: 'set', payload: {isLoad: false}});
    },
    * post({payload}, {call,put}) {
      const res = yield call(() => (Ajax.post('/api/post', {
        ...payload,
      })));
      console.log(res, 'post');
    },
  },
  
};

export default model;
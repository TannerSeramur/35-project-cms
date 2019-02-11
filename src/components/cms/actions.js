import superagent from 'superagent';

export const setModel = model => {
  return {
    type: 'MODEL',
    payload: model
  };
};

export const getSchema = (model, url) => dispatch => {
  superagent.get(url).then(data => {
    dispatch(runGetSchema({ model: model, schema: data.body }));
  });
};

const runGetSchema = payload => {
  return {
    type: 'SCHEMA',
    payload: payload
  };
};

export const getModels = url => dispatch => {
  superagent.get(url).then(data => {
    dispatch(runGetModels(data.body));
  });
};

const runGetModels = payload => {
  return {
    type: 'MODELS',
    payload: payload
  };
};

export const getRecords = url => dispatch => {
  console.log('first y0');

  superagent.get(url).then(data => {
    dispatch(runGetRecords(data.body.results));
  });
};

const runGetRecords = payload => {
  console.log(payload, 'YOOO')
  return {
    type: 'RECORDS',
    payload: payload
  };
};

export const getRecord = url => dispatch => {
  console.log(url, 'urler');
  superagent.get(url).then(data => {
    console.log(data, 'data');
    dispatch(runGetRecord(data.body));
  });
};

const runGetRecord = payload => {

  return {
    type: 'RECORD',
    payload: payload
  };
};

export const post = (model, url, record) => dispatch => {
  superagent
    .post(url)
    .send(record)
    .then(data => {
      dispatch(runPost({ model, record: data.body }));
    });
};

const runPost = payload => {
  return {
    type: 'POST',
    payload: payload
  };
};

export const put = (model, url, record) => dispatch => {
  superagent
    .put(url)
    .send(record)
    .then(data => {
      dispatch(runPut({ model, record: data.body }));
    });
};

const runPut = payload => {
  return {
    type: 'PUT',
    payload: payload
  };
};

export const destroy = (model, id, url) => dispatch => {
  superagent.delete(url).then(data => {
    dispatch(runDestroy({ model, id }));
  });
};

const runDestroy = payload => {
  return {
    type: 'DELETE',
    payload: payload
  };
};

export const clearRecord = () => {
  console.log('clear record');

  return {
    type: 'CLEAR'
  };
};

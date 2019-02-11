let initialState = {
  model: null,
  models: [],
  records: [],
  schemas: {},
  record: {},
};

export default (state = initialState, action) => {
  let { type, payload } = action;

  switch (type) {
    case "MODEL":
      console.log('kona');

      return { ...state, model: payload };

    case "SCHEMA":
      console.log('cha');

      return {
        ...state,
        schemas: { ...state.schemas, [payload.model]: payload.schema }
      };

    case "MODELS":
      console.log('modaaaals');

      return { ...state, models: payload };

    case "RECORDS":
      console.log('in RECORDS');
      return { ...state, records: payload };

    case "CLEAR":
      console.log('clearrrrr');

      return state;

    case "RECORD":
      console.log('under record', payload);

      return { ...state, record: payload };

    case "POST":
      return { ...state, records: [...state.records, payload.record], record: {} };

    case "PUT":
      let updatedRecords = state.records.map(record =>
        record._id === payload.record._id ? payload.record : record
      );
      return { ...state, records: updatedRecords, record: {} };

    case "DELETE":
      let filteredRecords = state.records.filter(
        record => record._id !== payload.id
      );
      return { ...state, records: filteredRecords };

    default:
      return state;
  }
};

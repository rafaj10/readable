const logger = (store) => (next) => (action) => {

  switch (action.type) {
    case undefined:
      let resultUndef = next(action);
      return resultUndef;
    default:
      console.group(action.type);
      console.info('dispatching: ', action);
      let result = next(action);
      console.log('next state: ', store.getState());
      console.groupEnd(action.type);
      return result;
  }
}

export default logger;
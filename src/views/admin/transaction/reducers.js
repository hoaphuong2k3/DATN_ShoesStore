const initialState = {
    tabs: {
      '1': [],
      '2': [],
      '3': [],
      '4': [],
      '5': [],
      '6': [],
     
    },
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_DATA':
        const { tabId, newData } = action.payload;
        return {
          ...state,
          tabs: {
            ...state.tabs,
            [tabId]: newData,
          },
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;
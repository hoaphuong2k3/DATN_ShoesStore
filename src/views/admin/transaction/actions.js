export const updateData = (tabId, newData) => ({
    type: 'UPDATE_DATA',
    payload: { tabId, newData },
  });
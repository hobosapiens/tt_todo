export const getFromLocalStorage = (key) => {
  try {
    const serializedData = localStorage.getItem(key);
    if (!serializedData) {
      return;
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.error('Error loading data from localStorage:', error);
    return;
  }
}

export const putToLocalStorage = (key, data) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error('Error uploading data to localStorage:', error);
  }
}

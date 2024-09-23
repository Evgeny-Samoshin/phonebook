const getStorage = key => JSON.parse(localStorage.getItem(key)) || [];

export const setStorage = (key, obj) => {
  const data = getStorage(key);
  data.push(obj);
  localStorage.setItem(key, JSON.stringify(data));
};

export const removeStorage = (phone) => {
  const data = getStorage('data');
  
  localStorage.setItem('data', JSON.stringify(data.filter(item => item.phone !== phone)));
}

export default getStorage;
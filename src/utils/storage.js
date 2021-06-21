const KEY = 'deadiction_data';
const CONV = {  // times in a day
  MINUTE: 1436,  // too accurate
  HOUR: 24,
  DAY: 1,
  WEEK: 1 / 7,
  MONTH: 1 / 30
}
let data = null;

export default {
  loadData() {
    if (data === null) {
      let storedd_data = localStorage.getItem(KEY);
      data = storedd_data === null ? this.initData() : JSON.parse(storedd_data);
    }
    return data;
  },

  initData() {
    return {
      firstTime: true,
      version: '0',
      addictions: []
    }
  },

  saveData() {
    localStorage.setItem(KEY, JSON.stringify(data));
  },

  clearData() {
    localStorage.removeItem(KEY);
  },

  createAddiction(name, freq, unit) {
    freq *= CONV[unit];
    let id = new Date().getTime();
    // TODO: Which is correct?
    // let decrementFactor = Math.min(0.01, freq / 100);
    let decrementFactor = Math.min(0.01, 0.01 / freq);

    let addiction = {
      id,
      name,
      freq,
      acceptableRatio: 1,
      decrementFactor,
      timesAsked: 0,
      timesUsed: 0,
      timesResisted: 0,
      timesRelapsed: 0
    }
    this.loadData();
    data.addictions.push(addiction);
    this.saveData();
    return id;
  },

  getAddiction(id) {
    return data.addictions.find(x => x.id === id);
  },

  clearAddictions() {
    this.loadData();
    data.addictions.length = 0;
    this.saveData();
  }
}
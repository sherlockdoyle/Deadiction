const KEY = 'deadiction_data';
const DATA_VERSION = '2';
const CONV = {  // times in a day
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
    this.updateData(data);
    return data;
  },

  initData() {
    return {
      firstTime: true,
      version: DATA_VERSION,
      addictions: []
    }
  },

  updateData(data) {
    switch (data.version) {
      case '0':
        for (let addiction of data.addictions)
          addiction.decrementFactor *= 100 / 66;
      case '1':
        for (let addiction of data.addictions)
          addiction.lastUsed = undefined;
    }
    data.version = DATA_VERSION;
    this.saveData();
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
    let decrementFactor = Math.min(1, 1 / freq) / 66;  // MAGIC 66(6)!!!

    let addiction = {
      id,
      name,
      freq,
      acceptableRatio: 1,
      decrementFactor,
      timesAsked: 0,
      timesUsed: 0,
      timesResisted: 0,
      timesRelapsed: 0,
      lastUsed: undefined
    }
    this.loadData();
    data.addictions.push(addiction);
    this.saveData();
    return id;
  },

  getAddiction(id) {
    this.loadData();
    return data.addictions.find(x => x.id === id);
  },

  addictionIsAvailable(name) {
    this.loadData();
    return data.addictions.find(x => x.name === name);
  },

  removeAddiction(id) {
    this.loadData();
    let idx = data.addictions.findIndex(x => x.id === id);
    if (idx !== -1)
      data.addictions.splice(idx, 1);
    this.saveData();
  },

  clearAddictions() {
    this.loadData();
    data.addictions.length = 0;
    this.saveData();
  }
}
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('appInfo', {
  name: 'focus-time',
  version: '1.0.0'
});




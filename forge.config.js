const path = require('path');

module.exports = {
  packagerConfig: {
    icon: path.join(__dirname, 'icon'),
    asar: true
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'focus-time',
        setupExe: 'focus-time-setup.exe',
        setupIcon: path.join(__dirname, 'icon', 'icon.ico'),
        iconUrl: 'https://raw.githubusercontent.com/EdilandoSaturnino/focus-time/main/icon/icon.ico'
      }
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['win32']
    }
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives'
    }
  ]
};



import localStorageKey from '../app/const/localStorageConst';

export const environment = {
  production: true,
  apiBase: localStorage.getItem(localStorageKey.PREFER_SERVER) === 'CHINA' ?
    'https://cn.api.cvbot.powerlayout.com' : 'https://api.cvbot.powerlayout.com',
  cdnBase: 'https://cdn.cvbot.powerlayout.com',
};

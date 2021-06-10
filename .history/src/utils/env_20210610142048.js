// 当前环境
import Cookie from './cookie';

export const currentEnv = process.env.FIG_ENV;

const kjToken = {
  dev: 'test',
  test: 'test',
  pre: 'pre',
  prod: 'prod',
}[currentEnv];

// 当前获取到的token
export const CORGITOKENENVDATA = `corgi-token-${kjToken}-data`;

export const APP_ID = '12391';

export const TENANT_ID = '6XWFVymtaB68REyRBuf';

export const LOGINURL = (redirectUrl) =>
  `https://${envPrefix[currentEnv]}corgilogin.kaikeba.com/#/login?redirect=${redirectUrl}`;

export const LOGIN_OUT = (redirectUrl = window.location.href) => {
  window.location.href = LOGINURL(encodeURIComponent(redirectUrl));
};

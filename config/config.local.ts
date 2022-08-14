import { EggAppConfig, PowerPartial } from 'egg';

export default (): PowerPartial<EggAppConfig> => {
  const config: PowerPartial<EggAppConfig> = {
    security: {
      csrf: {
        enable: false,
      },
      domainWhiteList: [ '*' ], // 白名单
    },
    cors: {
      origin: '*', // 跨任何域
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS', // 被允许的请求方式
    },
  };
  return config;
};

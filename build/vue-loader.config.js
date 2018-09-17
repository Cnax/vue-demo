module.exports = (isDev) => {
  return {
    preserveWhitepace: true,
    extractCss: !isDev,
    // hotReload: false,   根据环境变量自动生成
  };
}
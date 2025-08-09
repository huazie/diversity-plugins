"use strict";

const { deepMerge } = require('hexo-util');

module.exports = (hexo, cmd) => {
    // 仅 server 命令生效
    if (!/^(s)/.test(cmd)) return;

    try {
        // 初始化配置监听器
        const ThemeConfig = require('./theme-config');
        const themeConfig = new ThemeConfig(hexo);
        themeConfig.watch((newConfig) => {
            // 重新加载独立的主题配置文件内容
            hexo.config.theme_config = newConfig;
            // 重新加载默认的主题目录下的主题配置文件内容
            hexo.theme.config = themeConfig.loadDefaultThemeConfig();
            // 合并主题配置
            mergeCtxThemeConfig(hexo);

            let useCache = false;
            const { cache } = Object.assign({
                cache: false
            }, hexo.config.server);
            if (cache) {
                // enable cache when run hexo server
                useCache = true;
            }

            // 重新执行
            hexo._generate({ cache: useCache });
        });
        // 开发服务器关闭时释放资源
        process.on('SIGINT', () => {
            themeConfig.unwatch();
        });
    } catch (err) {
        hexo.log.warn('[ThemeConfig] 初始化失败:', err.message);
    }
};

/**
 * 合并主题配置
 * 
 * @param ctx hexo对象
 */
function mergeCtxThemeConfig(ctx) {
    // Merge hexo.config.theme_config into hexo.theme.config
    // config.theme_config has "_config.[theme].yml" merged in load_theme_config.js
    if (ctx.config.theme_config) {
        ctx.theme.config = deepMerge(ctx.theme.config, ctx.config.theme_config);
    }
}
'use strict';

const { Utils } = require('hexo-generator-comments/lib/utils');
const utils = new Utils(hexo, __dirname);

// 在 Hexo 初始化完成后输出插件信息
hexo.on('ready', () => {
    if (!/^(g|s|v)/.test(hexo.env.cmd)) return;
    const { name, version } = require('./package.json');
    hexo.log.info(`[${hexo.config.theme}] ${name} v${version}`);
}, 10);

// 添加 Giscus 评论系统相关的Diversity主题注入过滤器
hexo.extend.filter.register('theme_injects', injects => {
    // 合并优先级：站点配置 > 主题配置 > 默认配置
    let config = utils.getMergedConfig('giscus', 'default.yml');
    // 主题配置中的giscus配置覆盖，便于评论相关的布局文件中使用
    hexo.theme.config.giscus = config;

    // 没有启用 Gitalk
    if (!config.enable) return;

    // 没有配置GitHub仓库名称
    if (!config.repo) {
        hexo.log.error('giscus.repo can\'t be null.');
        return;
    }

    // comment 视图添加 giscus
    injects.comment.raw('giscus', '<div class="comments giscus-container"><div class="giscus"></div></div>', {}, { cache: true });

    // pageEnd 视图添加 giscus
    injects.pageEnd.raw('giscus', utils.getFileContent('layout/giscus' + injects.pageEnd.extName));

});
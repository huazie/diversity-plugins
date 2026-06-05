'use strict';

const { Utils } = require('hexo-generator-comments/lib/utils');
const utils = new Utils(hexo, __dirname);

// 在 Hexo 初始化完成后输出插件信息
hexo.on('ready', () => {
    if (!/^(g|s|v)/.test(hexo.env.cmd)) return;
    const { name, version } = require('./package.json');
    hexo.log.info(`[${hexo.config.theme}] ${name} v${version}`);
}, 10);



// 添加 Waline 评论系统相关的Diversity主题注入过滤器
hexo.extend.filter.register('theme_injects', injects => {
    // 合并优先级：站点配置 > 主题配置 > 默认配置
    let config = utils.getMergedConfig('waline', 'default.yml');
    // 主题配置中的waline配置覆盖，便于评论相关的布局文件中使用
    hexo.theme.config.waline = config;

    // 没有启用 Waline
    if (!config.enable) return;

    // 没有配置 Waline 服务端地址
    if (!config.server_url) {
        hexo.log.error('waline.server_url can\'t be null.');
        return;
    }

    // 这里需要先在头部结束标签中添加Waline CSS，否则暗色主题的样式会被覆盖
    hexo.extend.injector.register('head_end', () => {
        const cssUrl = config.css_url || 'https://unpkg.com/@waline/client@v3/dist/waline.css';
        return `<link rel="stylesheet" href="${cssUrl}">`;
    });

    // comment 视图添加 waline
    if (injects.comment.extName === '.jsx') {
        injects.comment.raw('waline', utils.getFileContent('layout/comment/waline' + injects.comment.extName));
    } else {
        injects.comment.raw('waline', '<div id="waline" class="comments waline-wrap"></div>');
    }

    // pageEnd 视图添加 waline
    injects.pageEnd.raw('waline', utils.getFileContent('layout/waline' + injects.pageEnd.extName));

});

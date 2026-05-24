'use strict';

const { Utils } = require('hexo-generator-comments/lib/utils');
const utils = new Utils(hexo, __dirname);

// 在 Hexo 初始化完成后输出插件信息
hexo.on('ready', () => {
    if (!/^(g|s|v)/.test(hexo.env.cmd)) return;
    const { name, version } = require('./package.json');
    hexo.log.info(`[${hexo.config.theme}] ${name} v${version}`);
}, 10);

// 添加 Twikoo 评论系统相关的Diversity主题注入过滤器
hexo.extend.filter.register('theme_injects', injects => {
    // 合并优先级：站点配置 > 主题配置 > 默认配置
    let config = utils.getMergedConfig('twikoo', 'default.yml');
    // 主题配置中的twikoo配置覆盖，便于评论相关的布局文件中使用
    hexo.theme.config.twikoo = config;

    // 没有启用 Twikoo
    if (!config.enable) return;

    // 没有配置环境ID
    if (!config.env_id) {
        hexo.log.error('twikoo.env_id can\'t be null.');
        return;
    }

    // comment 视图添加 twikoo
    if (injects.comment.extName === '.jsx') {
        injects.comment.raw('twikoo', utils.getFileContent('layout/comment/twikoo' + injects.comment.extName));
    } else {
        injects.comment.raw('twikoo', '<div class="comments twikoo-wrap"><div id="twikoo-comments"></div></div>');
    }

    // pageEnd 视图添加 twikoo
    injects.pageEnd.raw('twikoo', utils.getFileContent('layout/twikoo' + injects.pageEnd.extName));

});

'use strict';

const { Utils } = require('hexo-generator-comments/lib/utils');
const utils = new Utils(hexo, __dirname);

// 在 Hexo 初始化完成后输出插件信息
hexo.on('ready', () => {
    if (!/^(g|s|v)/.test(hexo.env.cmd)) return;
    const { name, version } = require('./package.json');
    hexo.log.info(`[${hexo.config.theme}] ${name} v${version}`);
}, 10);

// 添加 Gitalk 评论系统相关的Diversity主题注入过滤器
hexo.extend.filter.register('theme_injects', injects => {
    // 合并优先级：站点配置 > 主题配置 > 默认配置
    let config = utils.getMergedConfig('gitalk', 'default.yml');
    // 主题配置中的gitalk配置覆盖，便于评论相关的布局文件中使用
    hexo.theme.config.gitalk = config;

    // 没有启用 Gitalk
    if (!config.enable) return;

    // 没有配置GitHub 仓库所有者
    if (!config.repo) {
        hexo.log.error('gitalk.repo can\'t be null.');
        return;
    }

    // 没有配置GitHub 仓库所有者
    if (!config.github_id) {
        hexo.log.error('gitalk.github_id can\'t be null.');
        return;
    }

    // 没有配置GitHub 应用客户端 ID
    if (!config.client_id) {
        hexo.log.error('gitalk.client_id can\'t be null.');
        return;
    }

    // 没有配置GitHub 应用客户端密钥
    if (!config.client_secret) {
        hexo.log.error('gitalk.client_secret can\'t be null.');
        return;
    }

    // comment 视图添加 gitalk
    injects.comment.raw('gitalk', '<div class="comments gitalk-container"></div>', {}, { cache: true });

    // pageEnd 视图添加 gitalk
    injects.pageEnd.raw('gitalk', utils.getFileContent('layout/gitalk' + injects.pageEnd.extName));

});
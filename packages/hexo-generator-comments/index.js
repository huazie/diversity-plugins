'use strict';

const { Utils } = require('./lib/utils');
const Comment = require('./lib/comment');
const commentsGenerator = require('./lib/generator');
const commentInject = require('./lib/injects/comment-inject');

const utils = new Utils(hexo, __dirname);
const comment = new Comment(hexo, __dirname, utils);

// 注册评论生成器
hexo.extend.generator.register('comments', function (locals) {
    return commentsGenerator(utils, locals);
});

// 注册处理评论视图的主题注入过滤器
hexo.extend.filter.register('theme_injects', function (injects) {
    commentInject(utils, injects);
}, 999);

hexo.on('ready', () => {
    if (!/^(g|s|v)/.test(hexo.env.cmd)) return;
    const { name, version } = require('./package.json');
    // 在 Hexo 初始化完成后输出插件信息
    hexo.log.info(`[${hexo.config.theme}] ${name} v${version}`);
    // 处理 layout 和 source 目录文件
    comment.process();
}, 1);

// 在生成器解析前执行
hexo.extend.filter.register('before_generate', () => {
    // 添加辅助函数（Helper）
    require('./lib/helper')(hexo, utils);

    // 添加主题注入过滤器处理 theme_inject
    require('./lib/injects')(hexo, utils);
}, 0);
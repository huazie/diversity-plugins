'use strict';

/**
 * 评论生成器
 * 
 * @param {Object} locals Hexo 本地变量
 * @returns {Array} 生成的路由对象数组
 */
module.exports = function (utils, locals) {
    const comments = utils.getMergedConfig('comments', 'default.yml');
    const customLayout = comments.layout ? comments.layout : "comments";
    const ensureTrailingSlash = (path) => path.endsWith('/') ? path : path + '/';
    const customPath = ensureTrailingSlash(comments.path ?? "comments/");

    const existingPage = locals.pages?.data?.find(page => page.path === customPath + 'index.html');

    const pageData = {
        ...(existingPage ?? {
            date: new Date(),
            updated: new Date(),
            path: customPath + 'index.html',
            permalink: utils.hexo.config.url + '/' + customPath,
            full_path: customPath + 'index.html',
            source: customPath + 'index.html'
        }),
        title: comments.title ?? existingPage?.title ?? 'Comments',
        comments: true,
        layout: customLayout
    };

    return {
        path: customPath + 'index.html',
        layout: [customLayout, 'page'],
        data: pageData
    };
};
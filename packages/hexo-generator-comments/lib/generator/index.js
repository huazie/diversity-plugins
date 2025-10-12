'use strict';

/**
 * 评论生成器
 * 
 * @param {Object} locals Hexo 本地变量
 * @returns {Array} 生成的路由对象数组
 */
module.exports = function(utils, locals) {
    const comments = utils.defaultConfigFile('comments', 'default.yml');
    const customLayout = comments.layout ? comments.layout : "comments";
    const customLocals = Object.assign({
        layout: customLayout
    }, locals);
    return [{
        path: 'comments/index.html',
        layout: [customLayout, 'page'],
        data: customLocals
    }];
};
'use strict';

const path = require('path');

/**
 * 处理评论视图的主题注入过滤器
 * 
 * @param {Object} injects 注入对象
 */
module.exports = function(utils, injects) {
    const comments = utils.defaultConfigFile('comments', 'default.yml');
    // 主题配置中的comments配置覆盖，便于评论相关的布局文件中使用
    utils.hexo.theme.config.comments = comments;
    injects.comment.raws.forEach(element => {
        // 获取注入对象名
        const injectName = path.basename(element.name, path.extname(element.name));
        element.args[0] = Object.assign({
            configKey: injectName,
            class: injectName,
            text: injectName,
            showLoading: false
        }, element.args[0]);

        const locals = element.args[0];
        const injectObj = utils.defaultConfigFile(injectName);
        // 获取评论系统是否展示加载提示配置
        // 如果配置为true，则表示评论加载时需要展示加载提示
        if (injectObj && injectObj.loading)
            locals.showLoading = injectObj.loading;

        // 默认展示的评论系统
        if (comments.active === locals.configKey) {
            element.args[0].active = 'active';
        }
        // 调整导航元素的文本或顺序
        if (comments.nav) {
            const nav = comments.nav[locals.configKey] || {};
            // 顺序
            if (nav.order) {
                element.args[2] = nav.order;
            }
            // 文本
            if (nav.text) {
                locals.text = nav.text;
            }
        }
    });
};
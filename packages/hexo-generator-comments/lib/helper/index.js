"use strict";

module.exports = (ctx, utils) => {
    const { helper } = ctx.extend;
    // 评论系统配置信息的辅助函数
    helper.register('comments_config', () => {
        const { config } = this;
        const { name, version, author} = require('../../package.json');
        const exportConfig = {
            name: name,
            version: version,
            author: author,
            comments: utils.defaultConfigFile('comments', 'default.yml')
        };
        return exportConfig;
    });
    // 一种在生成的HTML页面中嵌入JSON格式配置信息的辅助函数
    helper.register('diversity_data', data);
    // Diversity主题内容注入的辅助函数
    helper.register('diversity_injects', inject);
};

/**
 * 生成一个包含JSON数据的<script>标签的函数
 *
 * @param {string} name - 要设置的data-name属性的值，通常用于标识这段JSON数据的用途或名称
 * @param {...*} data - 可变数量的参数，这些参数将被合并成一个对象。如果只有一个参数且它是一个对象，则直接使用该对象；
 *                      如果有多个参数，则尝试将它们合并成一个对象（注意：如果参数不是对象或合并时键名冲突，后面的参数会覆盖前面的）
 * @returns {string} - 一个包含JSON数据的<script>标签的字符串
 */
function data(name, ...data) {
    const json = data.length === 1 ? data[0] : Object.assign({}, ...data);
    return `<script class="diversity-config" data-name="${name}" type="application/json">${
        JSON.stringify(json).replace(/</g, '\\u003c')
    }</script>`;
}

/**
 * 根据指定的注入点获取并处理主题相关的注入内容，并将处理后的结果合并返回。
 *
 * @param {string} point - 注入点标识
 * @returns {string} - 将查找到的对应注入点下的所有内容项经过渲染处理后拼接而成的字符串
 */
function inject(point) {
    return this.theme.view_injects[point]
        .map(item => this.partial(item.layout, item.locals, item.options))
        .join('');
}
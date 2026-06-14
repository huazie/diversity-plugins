'use strict';

const path = require('path');
const fs = require('fs');
const { load } = require('js-yaml');

/**
 * 以 target 优先的深度合并：target 已有的 key 保留不变，只补充 target 缺失的 key
 */
function fill(target, source) {
    for (const key of Object.keys(source)) {
        if (target.hasOwnProperty(key)) {
            // 目标已有该 key，递归处理嵌套对象，叶子节点跳过
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                fill(target[key], source[key]);
            }
        } else {
            // 目标没有该 key，从 source 补充
            target[key] = source[key];
        }
    }
}

/**
 * 加载插件 languages 目录下的语言文件，合并到主题 i18n 系统
 * @param {Object} hexo - Hexo 实例
 * @param {string} dir  - 插件根目录路径 (__dirname from index.js)
 */
module.exports = (hexo, dir) => {
    const langDir = path.join(dir, 'languages');

    if (!fs.existsSync(langDir)) return;

    fs.readdirSync(langDir).forEach(file => {
        if (path.extname(file) === '.yml') {
            const lang = path.basename(file, '.yml');
            const data = load(fs.readFileSync(path.join(langDir, file), 'utf8'));
            // 先取出主题已有数据，深度合并插件数据，再通过 set() 写回
            const langData = hexo.theme.i18n.get(lang) || {};
            fill(langData, data);
            hexo.theme.i18n.set(lang, langData);
        }
    });
};

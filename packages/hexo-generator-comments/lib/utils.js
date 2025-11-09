'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { deepMerge } = require('hexo-util');

// 注入点定义
const InjectPoints = {
    // 视图定义
    views: [
        'pageEnd',
        'comment'
    ]
};

/**
 * 工具类
 */
class Utils {

    constructor(hexo, pluginDir) {
        this.hexo = hexo;
        this.pluginDir = pluginDir;
    }

    /**
     * 解析文件的绝对路径
     * 
     * @param {string} filePath - 文件的相对路径名
     * @returns {string} 解析后的绝对路径
     */
    getFilePath(filePath) {
        return this.pluginDir ? path.resolve(this.pluginDir, filePath) : filePath;
    }

    /**
     * 读取文件内容
     * 
     * @param {string} filePath - 文件的相对路径名
     * @returns {string} 文件内容的字符串形式
     */
    getFileContent(filePath) {
        return fs.readFileSync(this.getFilePath(filePath), 'utf8');
    }

    /**
     * 获取合并后的配置（默认配置 + 主题配置 + 站点配置）
     * 
     * @param {string} key - 配置键名
     * @param {string} [file] - 默认配置文件路径（可选）
     * @returns {Object} 合并后的配置对象
     */
    getMergedConfig(key, file) {
        const defaultConfig = file ? yaml.load(this.getFileContent(file)) : {};
        return deepMerge(defaultConfig[key], deepMerge(this.hexo.theme.config[key] || {}, this.hexo.config[key] || {}));
    }

    /**
     * 获取主题布局文件的扩展名
     * 通过检查主题的布局文件来确定使用的模板引擎类型
     * 
     * @param {Object} hexo - Hexo实例
     * @param {string} defaultExtname - 默认扩展名
     * @returns {string|null} 布局文件的扩展名，如果未找到则返回null
     */
    getThemeLayoutExtName(hexo, defaultExtname) {
        try {
            hexo = hexo || this.hexo;
            const layoutFiles = ['index', 'post', 'page', 'archive'];
            const templateExts = ['.ejs', '.swig', '.njk', '.nunjucks', '.pug', '.jade', '.hbs', '.handlebars'];

            // 检查视图文件扩展名
            const checkViewExt = (view) => {
                if (view?.path) {
                    const ext = path.extname(view.path);
                    if (ext) return ext;
                }
                return null;
            };

            // 1. 检查常用布局文件
            for (const layout of layoutFiles) {
                const ext = checkViewExt(hexo.theme.getView(layout));
                if (ext) return ext;
            }

            // 2. 检查所有视图文件
            if (hexo.theme.views) {
                for (const viewName in hexo.theme.views) {
                    const ext = checkViewExt(hexo.theme.views[viewName]);
                    if (ext) return ext;
                }
            }

            // 3. 检查布局目录中的文件
            const themeLayoutDir = path.join(hexo.theme_dir, 'layout');
            if (fs.existsSync(themeLayoutDir)) {
                const files = fs.readdirSync(themeLayoutDir);

                // 优先检查常用布局文件
                for (const layoutName of layoutFiles) {
                    const matchedFile = files.find(file =>
                        path.basename(file, path.extname(file)) === layoutName
                    );
                    if (matchedFile) {
                        const ext = path.extname(matchedFile);
                        if (ext) return ext;
                    }
                }

                // 检查模板文件扩展名
                for (const file of files) {
                    const ext = path.extname(file);
                    if (ext && (templateExts.includes(ext) || (ext !== '.md' && ext !== '.txt' && ext !== '.json'))) {
                        return ext;
                    }
                }
            }
        } catch (error) {
            hexo.log.warn('获取主题布局扩展名时出错:', error.message);
        }
        return defaultExtname;
    }
}

module.exports = {
    InjectPoints,
    Utils
};
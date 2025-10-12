'use strict';

const path = require('path');
const fs = require('fs');

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
class Util {
    /**
     * 获取主题布局文件的扩展名
     * 通过检查主题的布局文件来确定使用的模板引擎类型
     * 
     * @param {Object} hexo - Hexo实例
     * @returns {string|null} 布局文件的扩展名，如果未找到则返回null
     */
    static getThemeLayoutExtName(hexo) {
        try {
            // 方法1: 优先检查常用的布局文件
            const layoutFiles = ['index', 'post', 'page', 'archive'];
            
            for (const layout of layoutFiles) {
                const view = hexo.theme.getView(layout);
                if (view && view.path) {
                    const ext = path.extname(view.path);
                    if (ext) {
                        return ext;
                    }
                }
            }
            
            // 方法2: 如果没找到，遍历所有视图文件
            const views = hexo.theme.views;
            if (views) {
                for (const viewName in views) {
                    const view = views[viewName];
                    if (view && view.path) {
                        const ext = path.extname(view.path);
                        if (ext) {
                            return ext;
                        }
                    }
                }
            }
            
            // 方法3: 直接读取主题布局目录
            const themeLayoutDir = path.join(hexo.theme_dir, 'layout');
            if (fs.existsSync(themeLayoutDir)) {
                const files = fs.readdirSync(themeLayoutDir);
                
                // 优先查找常用布局文件
                for (const layoutName of layoutFiles) {
                    const matchedFile = files.find(file => {
                        const basename = path.basename(file, path.extname(file));
                        return basename === layoutName;
                    });
                    
                    if (matchedFile) {
                        const ext = path.extname(matchedFile);
                        if (ext) {
                            return ext;
                        }
                    }
                }
                
                // 如果没找到常用布局文件，返回第一个找到的布局文件扩展名
                for (const file of files) {
                    const ext = path.extname(file);
                    // 过滤掉非模板文件（如 .md, .txt 等）
                    if (ext && ['.ejs', '.swig', '.njk', '.nunjucks', '.pug', '.jade', '.hbs', '.handlebars'].includes(ext)) {
                        return ext;
                    }
                }
                
                // 如果上述扩展名都没找到，返回任何有扩展名的文件
                for (const file of files) {
                    const ext = path.extname(file);
                    if (ext && ext !== '.md' && ext !== '.txt' && ext !== '.json') {
                        return ext;
                    }
                }
            }
            
        } catch (error) {
            // 如果出现错误，返回null，使用默认扩展名
            hexo.log.warn('获取主题布局扩展名时出错:', error.message);
        }
        
        return null;
    }
}

module.exports = {
    InjectPoints,
    Util
};
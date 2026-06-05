const { Component } = require('inferno');

/**
 * Waline 评论注入组件 - Diversity 主题
 * 参考官方 ES Module 示例：https://waline.js.org/
 */
module.exports = class WalineInject extends Component {
    render() {
        const { theme, helper } = this.props;
        
        // 如果没有启用，直接返回空
        if (!theme.waline || !theme.waline.enable) return null;
        
        // 1. 使用 diversity_data 辅助函数注入 JS 配置
        // 使用配置中的 js_url，如果没有则使用默认值
        const jsUrl = theme.waline.js_url || 'https://unpkg.com/@waline/client@v3/dist/waline.js';
        const walineConfigData = helper.diversity_data('waline', theme.waline, {
            js: jsUrl
        }).toString();
        
        // 2. Waline 初始化脚本（使用 ES Module 方式）
        const walineJSData = 
            `<script>
                const loadWaline = () => {
                    const loadingElement = document.getElementById('loading-waline');
                    loadingElement?.classList.remove('hidden');

                    let walineConfig = {};
                    
                    // 先检查 server_url 是否配置
                    if (!conf.waline.server_url || conf.waline.server_url === 'https://your-waline-server.netlify.app/.netlify/functions/comment') {
                        console.error('Waline 错误：请配置 waline.server_url');
                        if (loadingElement) {
                            loadingElement.textContent = '请配置 Waline 服务端地址';
                            loadingElement.classList.add('error');
                        }
                        return;
                    }
                    
                    Diversity.utils.loadComments('.waline-wrap')
                        .then(() => {
                            // 处理配置变量
                            let walineLang = conf.waline.lang || window.navigator.language;
                            let walinePath;
                            let walineEmoji;
                            let walineWordLimit;
                            
                            // 处理 path 配置
                            if (conf.waline.path === 'pathname') {
                                walinePath = window.location.pathname;
                            } else if (conf.waline.path === 'url') {
                                walinePath = window.location.href;
                            } else if (conf.waline.path === 'title') {
                                walinePath = document.title;
                            } else {
                                walinePath = conf.waline.path || '';
                            }
                            
                            // 构建 walineConfig 对象
                            walineConfig = {
                                el: '#waline',
                                serverURL: conf.waline.server_url,
                                path: walinePath,
                                lang: walineLang,
                                emoji: conf.waline.emoji,
                                dark: conf.waline.dark,
                                commentSorting: conf.waline.comment_sorting,
                                meta: conf.waline.meta,
                                requiredMeta: conf.waline.required_meta,
                                login: conf.waline.login,
                                wordLimit: conf.waline.word_limit,
                                pageSize: conf.waline.page_size,
                                search: conf.waline.search,
                                noCopyright: conf.waline.no_copyright,
                                noRss: conf.waline.no_rss,
                                reaction: conf.waline.reaction
                            };
                        })
                        .then(() => {
                            // 使用 ES Module 方式加载 Waline
                            return import(conf.waline.js);
                        })
                        .then((module) => {
                            // module 包含 { init, version } 等导出
                            const { init } = module;
                            
                            // 使用 walineConfig 对象初始化
                            init(walineConfig);
                            
                            // 隐藏加载提示
                            loadingElement?.classList.add('hidden');
                        })
                        .catch((error) => {
                            console.error('Waline 加载失败:', error);
                            if (loadingElement) {
                                loadingElement.textContent = '评论加载失败，请刷新页面重试';
                                loadingElement.classList.add('error');
                            }
                        });
                };

                document.addEventListener('page:loaded', loadWaline);
                document.addEventListener('color-scheme:refresh', loadWaline);
            </script>`;
        
        // 3. 拼接所有字符串，通过 dangerouslySetInnerHTML 注入
        return (
            <div dangerouslySetInnerHTML={{ __html: walineConfigData + walineJSData }}></div>
        );
    }
};
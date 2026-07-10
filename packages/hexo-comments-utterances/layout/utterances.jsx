const { Component } = require('inferno');

module.exports = class extends Component {
    render() {
        const { theme, helper } = this.props;
        // 获取资源标签的 HTML 字符串
        const utterancesConfigData = helper.diversity_data('utterances', theme.utterances, {
            js: 'https://utteranc.es/client.js'
        }).toString();

        const utterancesCSSData = 
            `<style>
                .utterances {
                    max-width: unset;
                }
            </style>`;

        const utterancesJSData = 
            `<script>
            (function() {
                // Utterances 加载完成 → 隐藏 loading
                // Utterances OAuth 完成后会重新加载 iframe，触发 resize 消息
                window.addEventListener('message', (e) => {
                    if (!e.data || typeof e.data !== 'object') return;
                    // Utterances 加载完成（发送 iframe 高度用于调整大小）→ 隐藏 loading
                    if (e.data.type === 'resize') {
                        document.getElementById('loading-utterances')?.classList.add('hidden');
                    }
                });

                const loadUtterances = () => {
                    const loadingElement = document.getElementById('loading-utterances');
                    // 配色方案刷新，重新加载评论
                    // 加载提示被隐藏，需要再次显示
                    loadingElement?.classList.remove('hidden');

                    // 清除旧的 Utterances iframe（如果存在）
                    const wrap = document.querySelector('.utterances-wrap');
                    if (wrap) {
                        const oldIframe = wrap.querySelector('iframe.utterances-frame');
                        if (oldIframe) {
                            oldIframe.remove();
                        }
                        const oldScript = wrap.querySelector('script[src*="utteranc.es"]');
                        if (oldScript) {
                            oldScript.remove();
                        }
                    }

                    // 加载评论模块
                    Diversity.utils.loadComments('.utterances-wrap')
                        .then(() => {
                            const attrs = {
                                async: true,
                                crossOrigin: 'anonymous',
                                'repo': conf.utterances.repo,
                                'issue-term': conf.utterances.issue_term,
                                'theme': Diversity.utils.isDarkMode() ? conf.utterances.dark : conf.utterances.theme
                            };
                            return Diversity.utils.getScript(conf.utterances.js, {
                                attributes: attrs,
                                parentNode: document.querySelector('.utterances-wrap')
                            });
                        });
                }

                document.addEventListener('page:loaded', loadUtterances);
                document.addEventListener('color-scheme:refresh', loadUtterances);
            })();
            </script>`;

        return (
            <div dangerouslySetInnerHTML={{ __html: utterancesConfigData + utterancesCSSData + utterancesJSData }}></div>
        );
    }
}
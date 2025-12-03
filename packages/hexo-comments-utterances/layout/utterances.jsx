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
                const loadUtterances = () => {
                    const loadingElement = document.getElementById('loading-utterances');
                    // 配色方案刷新，重新加载评论
                    // 加载提示被隐藏，需要再次显示
                    loadingElement.classList.remove('hidden');

                    // 加载评论模块
                    Diversity.utils.loadComments('.utterances-wrap')
                        .then(() => Diversity.utils.getScript(conf.utterances.js, {
                            attributes: {
                                async: true,
                                crossOrigin: 'anonymous',
                                'repo': conf.utterances.repo,
                                'issue-term': conf.utterances.issue_term,
                                'theme': Diversity.utils.isDarkMode() ? conf.utterances.dark : conf.utterances.theme
                            },
                            parentNode: document.querySelector('.utterances-wrap')
                        }));

                    // Utterances加载
                    window.addEventListener('message', (e) => {
                        if (e.data && e.data.type == 'resize') {
                            // 检测到Utterances iframe发送了消息，且数据中type为resize，
                            // 则认为Utterances评论已加载，隐藏加载提示
                            loadingElement.classList.add('hidden');
                        }
                    });
                }

                document.addEventListener('page:loaded', loadUtterances);
                document.addEventListener('color-scheme:refresh', loadUtterances);
            </script>`;

        return (
            <div dangerouslySetInnerHTML={{ __html: utterancesConfigData + utterancesCSSData + utterancesJSData }}></div>
        );
    }
}
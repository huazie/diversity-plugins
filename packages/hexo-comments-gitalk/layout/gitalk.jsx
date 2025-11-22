const { Component } = require('inferno');

module.exports = class extends Component {
    render() {
        const { theme, helper } = this.props;
        // 获取资源标签的 HTML 字符串
        const gitalkCSSData = helper.css('https://unpkg.com/gitalk/dist/gitalk.css').toString();

        const gitalkCSSData1 = 
            `<style>
                :root {
                    --gt-popup-bg-color: #444;
                    --gt-header-preview-bg-color: #f9f9f9;
                    --gt-btn-bg-color: #6fb3e0;
                    --gt-btn-hover-bg-color: #4c8fbd;
                    --gt-btn1-bg-color: #fff;
                    --gt-btn1-hover-bg-color: #eee;
                    --gt-admin-comment-bg-color: #f6f9fe;
                    --gt-comment-bg-color: #f9f9f9;
                    color-scheme: light;
                }
                
                .dark-theme {
                    --gt-popup-bg-color: #444;
                    --gt-header-preview-bg-color: #202020;
                    --gt-btn-bg-color: #003153;
                    --gt-btn-hover-bg-color: #202020;
                    --gt-btn1-bg-color: #444;
                    --gt-btn1-hover-bg-color: #222;
                    --gt-admin-comment-bg-color: #182030;
                    --gt-comment-bg-color: #202020;
                    color-scheme: dark;
                }

                .gt-header a, .gt-comments a, .gt-popup a {
                    border-bottom: 0;
                }

                .gt-container .gt-popup .gt-action.is--active::before {
                    top: .7em;
                }

                .gt-container .gt-no-init,
                .gt-container .gt-initing-text {
                    color: var(--text-color) !important;
                }

                .gt-container .gt-svg {
                    fill: currentColor;
                }

                .gt-container .gt-counts, 
                .gt-container .gt-user-name,
                .gt-container .gt-version,
                .gt-container .gt-header-preview,
                .gt-container .gt-comments-null {
                    color: var(--text-color) !important;
                }

                .gt-container .gt-popup {
                    background: var(--content-bg-color) !important;
                }

                .gt-container .gt-header-textarea {
                    background-color: var(--selected-bg-color) !important;
                }

                .gt-container .gt-header-preview {
                    background-color: var(--gt-header-preview-bg-color) !important;
                }

                .gt-container .gt-btn-preview {
                    background-color: var(--gt-btn1-bg-color) !important;
                }

                .gt-container .gt-btn-preview:hover {
                    background-color: var(--gt-btn1-hover-bg-color) !important;
                }

                .gt-container .gt-btn-login {
                    background-color: var(--gt-btn-bg-color) !important;
                }

                .gt-container .gt-btn-login:hover {
                    background-color: var(--gt-btn-hover-bg-color) !important;
                }

                .gt-container .gt-comment-admin .gt-comment-content {
                    background-color: var(--gt-admin-comment-bg-color) !important;
                }

                .gt-container .gt-comment-content {
                    background-color: var(--gt-comment-bg-color) !important;
                }
                
                .gt-container .gt-comment-body { 
                    color: var(--text-color) !important; 
                }
            </style>`;

        const gitalkConfigData = helper.diversity_data('gitalk', theme.gitalk, {
            js : 'https://unpkg.com/gitalk/dist/gitalk.min.js'
        }).toString();

        const gitalkJSData = 
            `<script>
                const loadGitalk = () => {
                    let gitalkId;
                    let number = -1;
                    // 加载评论模块
                    Diversity.utils.loadComments('.gitalk-container')
                        .then(() => Diversity.utils.getScript(config.gitalk.js, {
                            condition: window.Gitalk
                        }))
                        .then(() => {
                            let issueTerm = config.gitalk.issue_term;
                            if (issueTerm === 'pathname') 
                                gitalkId = window.location.pathname;
                            else if (issueTerm === 'url')
                                gitalkId = window.location.href;
                            else if (issueTerm === 'title')
                                gitalkId = window.document.title;
                            else if (Diversity.validate.test('pNum', issueTerm)) {
                                number = parseInt(issueTerm, 10);
                            }
                        })
                        .then(() => {
                            if (gitalkId)
                                Diversity.log("GitHub issue label is [" + gitalkId + "]");
                            let confgObj = {
                                clientID: config.gitalk.client_id,
                                clientSecret: config.gitalk.client_secret,
                                repo: config.gitalk.repo,
                                owner: config.gitalk.github_id,
                                admin: [config.gitalk.admin_user],
                                id: gitalkId,
                                labels: [],
                                number: number,
                                proxy: config.gitalk.proxy,
                                distractionFreeMode: config.gitalk.distraction_free_mode
                            }
                            if (config.gitalk.language)
                                confgObj.language = config.gitalk.language;
                            const gitalk = new Gitalk(confgObj);
                            gitalk.render(document.querySelector('.gitalk-container'));
                        });
                }

                document.addEventListener('page:loaded', loadGitalk);
                document.addEventListener('color-scheme:refresh', loadGitalk);
            </script>`;

        return (
            <div dangerouslySetInnerHTML={{ __html: gitalkCSSData + gitalkCSSData1 + gitalkConfigData + gitalkJSData}}></div>
        );
    }
}
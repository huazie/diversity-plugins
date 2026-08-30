const { Component } = require('inferno');
const Loading = require('../common/loading.jsx');

/**
 * 多评论系统 All-in-One 组件
 * 保留原 tabs/dropdown 双渲染写法（inline style 显隐），
 * style 为 both 时额外渲染 mode-toggle 前端切换
 * 对应 layout/comments-all.ejs 的 JSX 实现
 */
module.exports = class MultiCommentAll extends Component {
    render() {
        const { theme, helper } = this.props;
        const injectItems = theme.view_injects.comment;
        const style = (theme.comments && theme.comments.style) || 'tabs';
        const isBoth = (style === 'both');

        const tabJSTag = helper.js('js/tab').toString();
        const dropdownJSTag = helper.js('js/dropdown').toString();
        const cookieJSTag = helper.js('js/js.cookie-2.2.1.min').toString();
        const modeToggleJSTag = isBoth ? helper.js('js/mode-toggle').toString() : '';

        if (injectItems.length === 1) {
            const item = injectItems[0];
            const CommentComponent = require(`../../${item.layout}`);

            return (
                <div class="comment-inner">
                    {item.locals.showLoading && (
                        <Loading
                            showLoading={item.locals.showLoading}
                            id={`loading-${item.locals.configKey}`}
                            text={helper.__('comments.loading')}
                        />
                    )}
                    <CommentComponent />
                </div>
            );
        }

        return (
            <div class="comment-inner">
                {/* Tab 导航 */}
                <div class="comments-tabbable" style={style === 'dropdown' ? 'display:none' : ''}>
                    <ul id="comment-nav-tab" class="comments-nav comments-nav-tabs">
                        {injectItems.map((item) => (
                            <li class={item.locals.active}>
                                <a data-toggle="tab" href={`#comments-${item.locals.class}`} data-comments={item.locals.class}>
                                    {item.locals.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Dropdown 导航 */}
                <div class="comments-dropdown" style={style === 'tabs' || isBoth ? 'display:none' : ''}>
                    <div class="comments-custom-dropdown" id="comment-nav-dropdown">
                        <button class="comments-dropdown-trigger" id="comment-nav-button" aria-haspopup="listbox" aria-expanded="false">
                            <span class="comments-dropdown-label">
                                <span class="comments-dropdown-text"></span>
                            </span>
                            <span class="comments-dropdown-arrow">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </span>
                        </button>
                        <div class="comments-dropdown-menu" role="listbox" id="comment-nav-menu">
                            {injectItems.map((item) => (
                                <div
                                    class={`comments-dropdown-item${item.locals.active ? ' active' : ''}`}
                                    role="option"
                                    data-value={item.locals.class}
                                    data-text={item.locals.text}>
                                    <span class="comments-dropdown-item-text">{item.locals.text}</span>
                                    {item.locals.active && (
                                        <span class="comments-dropdown-check">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 共享内容区域（同时加 tabs 和 dropdown 的 class） */}
                <div class="comments-tab-content comments-dropdown-content">
                    {isBoth && (
                        <div class="comments-mode-toggle">
                            <button class="comments-mode-toggle-btn active" data-mode="tabs" title="tabs">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                    <path d="M2 2.5h12v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V2.5z" stroke="currentColor" stroke-width="1.2"/>
                                    <path d="M2 5h12" stroke="currentColor" stroke-width="1.2"/>
                                </svg>
                            </button>
                            <button class="comments-mode-toggle-btn" data-mode="dropdown" title="dropdown">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                    <rect x="1.5" y="2.5" width="13" height="11" rx="1.5" stroke="currentColor" stroke-width="1.2"/>
                                    <path d="M5 7l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    )}
                    {injectItems.map((item) => {
                        const CommentComponent = require(`../../${item.layout}`);

                        return (
                            <div
                                id={`comments-${item.locals.class}`}
                                class={`comments-tab-pane comments-dropdown-pane${item.locals.active ? ' active' : ''}`}
                                data-comments={item.locals.class}>
                                {item.locals.showLoading && (
                                    <Loading
                                        showLoading={item.locals.showLoading}
                                        id={`loading-${item.locals.configKey}`}
                                        text={helper.__('comments.loading')}
                                    />
                                )}
                                <CommentComponent {...item.locals} />
                            </div>
                        );
                    })}
                </div>

                <div dangerouslySetInnerHTML={{ __html: cookieJSTag + tabJSTag + dropdownJSTag + modeToggleJSTag }}></div>
            </div>
        );
    }
};

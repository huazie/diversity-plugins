const { Component } = require('inferno');
const Loading = require('../common/loading.jsx');

/**
 * 多评论系统双模式组件（支持 tabs / dropdown 切换）
 * 右上角显示悬浮切换按钮
 */
module.exports = class MultiCommentBoth extends Component {
    render() {
        const { injectItems, helper } = this.props;

        const tabJSTag = helper.js('js/tab').toString();
        const dropdownJSTag = helper.js('js/dropdown').toString();
        const modeToggleJSTag = helper.js('js/mode-toggle').toString();
        const cookieJSTag = helper.js('js/js.cookie-2.2.1.min').toString();

        return (
            <div class="comment-inner">
                {/* Tabs 导航 */}
                <div class="comments-tabbable">
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

                {/* Dropdown 选择器 */}
                <div class="comments-dropdown" style="display:none">
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
                        <div class="comments-dropdown-menu" role="listbox" id="comment-nav-menu-both">
                            {injectItems.map((item) => (
                                <div
                                    class={`comments-dropdown-item ${item.locals.active ? 'active' : ''}`}
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

                {/* 共享评论内容面板（tabs 和 dropdown 共用） */}
                <div class="comments-tab-content comments-dropdown-content">
                    {/* 悬浮切换按钮（定位在内容区右上角） */}
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
                    {injectItems.map((item) => {
                        const { layout, locals } = item;
                        const CommentComponent = require(`../../${layout}`);

                        return (
                            <div id={`comments-${locals.class}`} class={`comments-tab-pane comments-dropdown-pane ${locals.active || ''}`}>
                                {locals.showLoading && (
                                    <Loading
                                        showLoading={locals.showLoading}
                                        id={`loading-${locals.configKey}`}
                                        text="Loading comments..."
                                    />
                                )}
                                <CommentComponent {...locals} />
                            </div>
                        );
                    })}
                </div>

                <div dangerouslySetInnerHTML={{ __html: tabJSTag + dropdownJSTag + modeToggleJSTag + cookieJSTag }}></div>
            </div>
        );
    }
};

const { Component } = require('inferno');
const Loading = require('../common/loading.jsx');

/**
 * 多评论系统下拉菜单组件
 */
module.exports = class MultiCommentDropdown extends Component {
    render() {
        const { injectItems, helper } = this.props;
        
        // 按照 multi-comment-tabs.jsx 的方式生成 JS 标签
        const dropdownJSTag = helper.js('js/dropdown').toString();
        const cookieJSTag = helper.js('js/js.cookie-2.2.1.min').toString();
        
        return (
            <div class="comment-inner">
                <div class="comments-dropdown">
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

                    {/* 评论内容区域 - 类名已增加前缀 */}
                    <div class="comments-dropdown-content">
                        {injectItems.map((item) => {
                            const { layout, locals } = item;
                            const CommentComponent = require(`../../${layout}`);
                            
                            return (
                                <div id={`comments-${locals.class}`} class={`comments-dropdown-pane ${locals.active || ''}`}>
                                    {locals.showLoading && (
                                        <Loading 
                                            showLoading={locals.showLoading}
                                            id={`loading-${locals.configKey}`}
                                            text={helper.__('comments.loading')}
                                        />
                                    )}
                                    <CommentComponent {...locals} />
                                </div>
                            );
                        })}
                    </div>
                </div>
                
                {/* 
                    按照 multi-comment-tabs.jsx 的方式注入 JS
                    将脚本放在 .comment-inner 末尾
                */}
                <div dangerouslySetInnerHTML={{ __html: dropdownJSTag + cookieJSTag }}></div>
            </div>
        );
    }
};

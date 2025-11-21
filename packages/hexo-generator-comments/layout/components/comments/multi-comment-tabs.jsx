const { Component } = require('inferno');
const Loading = require('../common/loading.jsx');

module.exports = class MultiCommentTabs extends Component {
    render() {
        const { injectItems, helper } = this.props;

        const tabJSTag  = helper.js('js/tab').toString();
        const cookieJSTag  = helper.js('js/js.cookie-2.2.1.min').toString();
        
        return (
            <div class="comment-inner">
                <div class="tabbable">
                    <ul id="comment-nav-tab" class="nav nav-tabs">
                        {injectItems.map((item) => (
                            <li class={item.locals.active}>
                                <a data-toggle="tab" href={`#comment-${item.locals.class}`} data-comment={item.locals.class}>
                                    {item.locals.text}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div class="tab-content">
                        {injectItems.map((item, index) => {
                            const { layout, locals} = item;
                            const CommentComponent = require(`../../${layout}`);
                            
                            return (
                                <div id={`comment-${locals.class}`} class={`tab-pane ${locals.active}`}>
                                    {locals.showLoading && (
                                        <Loading 
                                            showLoading={locals.showLoading}
                                            id={`loading-${locals.configKey}`}
                                            text="Loading comments..."
                                        />
                                    )}
                                    <CommentComponent />
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: tabJSTag + cookieJSTag }}></div>
            </div>
        );
    }
}
const { Component } = require('inferno');
const Loading = require('../common/loading.jsx');

module.exports = class MultiCommentDropdown extends Component {
    render() {
        const { injectItems, helper } = this.props;

        const dropdownJSTag  = helper.js('js/dropdown').toString();
        const cookieJSTag  = helper.js('js/js.cookie-2.2.1.min').toString();
        
        return (
            <div class="comment-inner">
                <div class="comment-dropdown">
                    <div class="comment-selector">
                        <select id="comment-nav-select">
                            {injectItems.map((item, index) => ([
                                <option 
                                    value={item.locals.class} 
                                    data-comments={item.locals.class}
                                    selected={item.locals.active ? true : false}>
                                    {item.locals.text}
                                </option>,
                                index < injectItems.length - 1 && (
                                    <option disabled class="dropdown-divider">──────────</option>
                                )
                            ]))}
                        </select>
                    </div>

                    <div class="comment-panes">
                        {injectItems.map((item) => {
                            const { layout, locals} = item;
                            const CommentComponent = require(`../../${layout}`);
                            
                            return (
                                <div id={`comments-${locals.class}`} class={`comment-pane ${locals.active || ''}`}>
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
                <div dangerouslySetInnerHTML={{ __html: dropdownJSTag + cookieJSTag }}></div>
            </div>
        );
    }
}
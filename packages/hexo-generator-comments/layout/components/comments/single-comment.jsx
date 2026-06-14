const { Component } = require('inferno');
const Loading = require('../common/loading.jsx');

module.exports = class SingleComment extends Component {
    render() {
        const { injectItem, helper } = this.props;
        const { layout, locals} = injectItem;
        
        const CommentComponent = require(`../../${layout}`);
        
        return (
            <div class="comment-inner">
                {locals.showLoading && (
                    <Loading 
                        showLoading={locals.showLoading}
                        id={`loading-${locals.configKey}`}
                        text={helper.__('comments.loading')}
                    />
                )}
                <CommentComponent />
            </div>
        );
    }
}
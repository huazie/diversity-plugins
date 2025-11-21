const { Component } = require('inferno');
const Loading = require('../common/loading.jsx');

module.exports = class SingleComment extends Component {
    render() {
        const { injectItem } = this.props;
        const { layout, locals} = injectItem;
        
        const CommentComponent = require(`../../${layout}`);
        
        return (
            <div class="comment-inner">
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
    }
}
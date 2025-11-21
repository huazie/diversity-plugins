const { Component } = require('inferno');
const SingleComment = require('./single-comment.jsx');
const MultiCommentTabs = require('./multi-comment-tabs.jsx');

module.exports = class CommentSystem extends Component {
    render() {
        const { theme, helper} = this.props;
        const { view_injects, comments } = theme;

        let commentInjects = view_injects.comment;
        let commentStyle = comments.style;
        
        if (commentInjects.length === 1) {
            return <SingleComment injectItem={commentInjects[0]} helper={helper} />;
        }
        
        if (commentInjects.length > 1) {
            if (commentStyle === 'tabs') {
                return <MultiCommentTabs injectItems={commentInjects} helper={helper} />;
            }
            // 可以添加其他样式处理
        }
        
        return null;
    }
}
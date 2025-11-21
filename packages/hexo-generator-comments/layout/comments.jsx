const { Component } = require('inferno');
const CommentSystem = require('./components/comments/comment-system.jsx');
const DiversityInjects = require('./components/common/diversity-injects.jsx');

module.exports = class Comments extends Component {
    render() {
        const { theme, helper} = this.props;
        
         // 获取资源标签的 HTML 字符串
        const cssTag = helper.css('css/comments').toString();
        const diversityDataTag = helper.diversity_data('comments', helper.comments_config()).toString();
        const jsTag = helper.js('js/diversity').toString();

        return (
            <div class="comment-wrap">
                {/* 使用 dangerouslySetInnerHTML 来插入资源标签 */}
                <div dangerouslySetInnerHTML={{ __html: cssTag + diversityDataTag + jsTag }}></div>
                <CommentSystem 
                    theme={theme}
                    helper={helper}
                />
                <DiversityInjects 
                    type="pageEnd"
                    theme={theme}
                    helper={helper}
                />
            </div>
        );
    }
}
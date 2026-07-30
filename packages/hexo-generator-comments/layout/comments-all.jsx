const { Component } = require('inferno');
const MultiCommentAll = require('./components/comments/multi-comment-all.jsx');
const DiversityInjects = require('./components/common/diversity-injects.jsx');

module.exports = class CommentsAll extends Component {
    render() {
        const { theme, helper} = this.props;

        const cssTag = helper.css('css/comments').toString();
        const diversityDataTag = helper.diversity_data('comments', helper.comments_config()).toString();
        const jsTag = helper.js('js/diversity').toString();

        return (
            <div class="comment-wrap">
                <div dangerouslySetInnerHTML={{ __html: cssTag + diversityDataTag + jsTag }}></div>
                <MultiCommentAll
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

const { Component } = require('inferno');

/**
 * Waline 评论组件 - Diversity 主题
 */
module.exports = class Waline extends Component {
    render() {
        const { config } = this.props;
        
        return (
            <div id="waline" class="comments waline-wrap"></div>
        );
    }
};

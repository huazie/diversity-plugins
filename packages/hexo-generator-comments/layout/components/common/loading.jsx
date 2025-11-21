const { Component } = require('inferno');

module.exports = class Loading extends Component {
    render() {
        const { showLoading, id, text } = this.props;
        
        if (!showLoading) {
            return null;
        }
        
        return (
            <div id={id} class="loading-indicator">
                <div class="spinner"></div>
                <span>{text}</span>
            </div>
        );
    }
}
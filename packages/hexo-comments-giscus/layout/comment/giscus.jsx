const { Component } = require('inferno');

module.exports = class extends Component {
    render() {
        return (
            <div class="comments giscus-container"><div class="giscus"></div></div>
        );
    }
}
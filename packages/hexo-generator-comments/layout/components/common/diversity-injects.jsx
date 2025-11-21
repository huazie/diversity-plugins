const { Component } = require('inferno');

module.exports = class DiversityInjects extends Component {
    render() {
        const { type, theme, helper } = this.props;
        const { view_injects } = theme;
        const viewInjects = view_injects[type];

        // 遍历 viewInjects 数组，动态加载组件
        const components = viewInjects.map(inject => {
            const { layout } = inject;
            const ViewComponent = require(`../../${layout}`);
            return (
                <ViewComponent 
                    theme={theme}
                    helper={helper}
                />
            );
        });

        return (
            <div>
                {components}
            </div>
        );
    }
};
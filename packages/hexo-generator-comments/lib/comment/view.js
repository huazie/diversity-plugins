"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const path_1 = require("path");
const hexo_front_matter_1 = require("hexo-front-matter");
const bluebird_1 = __importDefault(require("bluebird"));
const assignIn = (target, ...sources) => {
    const length = sources.length;
    if (length < 1 || target == null)
        return target;
    for (let i = 0; i < length; i++) {
        const source = sources[i];
        for (const key in source) {
            target[key] = source[key];
        }
    }
    return target;
};
class Options {
}
class View {
    constructor(comment, path, data) {
        const hexo = comment.context;
        this.themeName = hexo.config.theme;
        this.helper = hexo.extend.helper;
        this.path = path;
        this.source = (0, path_1.join)(comment.base, 'layout', path);
        this.data = typeof data === 'string' ? (0, hexo_front_matter_1.parse)(data) : data;
        this._precompile(hexo);
    }
    render(options = {}, callback) {
        if (!callback && typeof options === 'function') {
            callback = options;
            options = {};
        }
        const { data } = this;
        const { layout = options.layout } = data;
        const locals = this._buildLocals(options);
        return this._compiled(this._bindHelpers(locals)).then(result => {
            if (result == null || !layout)
                return result;
            const layoutView = this._resolveLayout(layout);
            if (!layoutView)
                return result;
            const layoutLocals = {
                ...locals,
                body: result,
                layout: false
            };
            return layoutView.render(layoutLocals, callback);
        }).asCallback(callback);
    }
    renderSync(options = {}) {
        const { data } = this;
        const { layout = options.layout } = data;
        const locals = this._buildLocals(options);
        const result = this._compiledSync(this._bindHelpers(locals));
        if (result == null || !layout)
            return result;
        const layoutView = this._resolveLayout(layout);
        if (!layoutView)
            return result;
        const layoutLocals = {
            ...locals,
            body: result,
            layout: false
        };
        return layoutView.renderSync(layoutLocals);
    }
    _buildLocals(locals) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { layout, _content, ...data } = this.data;
        return assignIn({}, locals, data, {
            filename: this.source
        });
    }
    _bindHelpers(locals) {
        const helpers = this.helper.list();
        const keys = Object.keys(helpers);
        for (const key of keys) {
            locals[key] = helpers[key].bind(locals);
        }
        return locals;
    }
    _resolveLayout(name) {
        // Relative path
        const layoutPath = (0, path_1.join)((0, path_1.dirname)(this.path), name);
        let layoutView = this._theme[this.themeName].getView(layoutPath);
        if (layoutView && layoutView.source !== this.source)
            return layoutView;
        // Absolute path
        layoutView = this._theme[this.themeName].getView(name);
        if (layoutView && layoutView.source !== this.source)
            return layoutView;
    }
    _precompile(hexo) {
        const render = hexo.render;
        const ctx = hexo;
        const ext = (0, path_1.extname)(this.path);
        const renderer = render.getRenderer(ext);
        const data = {
            path: this.source,
            text: this.data._content
        };
        function buildFilterArguments(result) {
            const output = render.getOutput(ext) || ext;
            return [
                `after_render:${output}`,
                result,
                {
                    context: ctx,
                    args: [data]
                }
            ];
        }
        if (renderer && typeof renderer.compile === 'function') {
            const compiled = renderer.compile(data);
            this._compiledSync = locals => {
                const result = compiled(locals);
                return ctx.execFilterSync(...buildFilterArguments(result));
            };
            this._compiled = locals => bluebird_1.default.resolve(compiled(locals))
                .then(result => ctx.execFilter(...buildFilterArguments(result)));
        }
        else {
            this._compiledSync = locals => render.renderSync(data, locals);
            this._compiled = locals => render.render(data, locals);
        }
    }
}
module.exports = View;
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const path_1 = require("path");
const box_1 = __importDefault(require("hexo/dist/box"));
const View = require("./view");
const source_1 = require("./processors/source");
const view_1 = require("./processors/view");
const { Util } = require("../util");
const defaultExtname = '.ejs';

class Comment extends box_1.default {
    constructor(ctx, base, options) {
        super(ctx, base, options);
        this.processors = [
            source_1.source,
            view_1.view
        ];

        if (!View.prototype._theme)
            View.prototype._theme = {};
        View.prototype._theme[ctx.config.theme] = ctx.theme;
        
        const Theme = ctx.theme.constructor;
        

        Theme.prototype.setView1 = function(comment, path, data) {
            const ext = (0, path_1.extname)(path);
            const extName = Util.getThemeLayoutExtName(comment.context) || defaultExtname;
            if (ext !== extName) {
                return;
            }
            const name = path.substring(0, path.length - ext.length);
            this.views[name] = this.views[name] || {};
            const views = this.views[name];
            views[ext] = new View(comment, path, data);
        };

    }
    setView(path, data) {
        this.context.theme.setView1(this, path, data);
    }
}
module.exports = Comment;
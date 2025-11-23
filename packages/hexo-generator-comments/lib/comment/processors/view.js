"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.view = void 0;
const hexo_util_1 = require("hexo-util");
const path_1 = require("path");
function process(file) {
    const { path } = file.params;
    if (file.type === 'delete') {
        file.box.removeView(path);
        return;
    }
    return file.read().then(result => {
        file.box.setView(path, result);
    });
}
function createView(extName) {
    const pattern = new hexo_util_1.Pattern(path => {
        if (!path.startsWith('layout/'))
            return false;
        path = path.substring(7);
        const ext = (0, path_1.extname)(path);
        if (ext !== extName)
            return false;
        return { path };
    });
    return {
        pattern,
        process
    };
}
exports.view = createView;
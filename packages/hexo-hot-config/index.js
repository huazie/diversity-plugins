'use strict';

hexo.on('ready', () => {
    const cmd = hexo.env.cmd;
    if (!/^(s)/.test(cmd)) return;
    const { name, version } = require('./package.json');
    hexo.log.info(`[${hexo.config.theme}] ${name} v${version}`);
    // 监控 _config.主题名.yml 文件变化
    require('./lib/watcher')(hexo, cmd);
}, 10);
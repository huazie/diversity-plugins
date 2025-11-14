# Hexo Hot Config

[![npm version](https://img.shields.io/npm/v/hexo-hot-config.svg?style=flat&logo=npm)](https://www.npmjs.com/package/hexo-hot-config) [![Hexo version](https://img.shields.io/badge/hexo-%3E=5.3.0-blue?style=flat&logo=hexo)](https://hexo.io) [![license](https://img.shields.io/badge/license-MIT-orange)](https://github.com/huazie/diversity-plugins/blob/main/LICENSE) [![GitHub Repo stars](https://img.shields.io/github/stars/huazie/diversity-plugins?style=flat)](https://github.com/huazie/diversity-plugins/stargazers)

Hexo hot configuration plugin that supports theme configuration hot reloading.

[中文说明/Chinese Documentation](README.md)

## Features

- Monitors changes to `_config.{theme}.yml` files and automatically regenerates pages
- Real-time preview of theme configuration changes without restarting Hexo server

## Installation

```bash
npm install hexo-hot-config --save
```

## Usage

After installing the plugin, no additional configuration is required. Simply run the Hexo server command to enable automatically:

```bash
hexo server
```

When you modify the `_config.{theme}.yml` file (where `{theme}` is the name of your current theme), the plugin will automatically detect changes and regenerate pages without requiring a manual server restart.

## How It Works

1. The plugin initializes configuration listeners when the Hexo server starts
2. Monitors changes to the independent theme configuration file `_config.{theme}.yml`
3. When file changes are detected, reloads the configuration and merges it into Hexo's theme configuration
4. Triggers page regeneration for real-time preview updates

## Notes

- Only takes effect when running the `hexo server` command
- If `_config.{theme}.yml` does not exist in the Hexo project root directory, the plugin will not perform monitoring
- Configuration files must be in valid YAML format, otherwise loading may fail

## Dependencies

- Node.js >= 12.13.0
- Hexo >= 6.0.0
- chokidar ^3.5.3
- js-yaml ^4.1.0
- hexo-util ^3.0.1

## License

[MIT](LICENSE) © [huazie](https://github.com/huazie)
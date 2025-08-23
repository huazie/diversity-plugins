# Hexo Hot Config

[![npm version](https://img.shields.io/npm/v/hexo-hot-config.svg?style=flat&logo=npm)](https://www.npmjs.com/package/hexo-hot-config) [![Hexo version](https://img.shields.io/badge/hexo-%3E=5.3.0-blue?style=flat&logo=hexo)](https://hexo.io) [![license](https://img.shields.io/badge/license-MIT-orange)](https://github.com/huazie/diversity-plugins/blob/main/LICENSE) [![GitHub Repo stars](https://img.shields.io/github/stars/huazie/diversity-plugins?style=flat)](https://github.com/huazie/diversity-plugins/stargazers)

Hexo 热配置插件，支持主题配置热更新

## 功能特性

- 监听 `_config.{theme}.yml` 文件变化，自动重新生成页面
- 无需重启 Hexo 服务器即可实时预览主题配置更改

## 安装

```bash
npm install hexo-hot-config --save
```

## 使用方法

安装插件后，无需额外配置，只要运行 Hexo 服务器命令即可自动启用：

```bash
hexo server
```

当你修改 `_config.{theme}.yml` 文件时（其中 `{theme}` 是你当前使用的主题名称），插件会自动检测变更并重新生成页面，无需手动重启服务器。

## 工作原理

1. 插件会在 Hexo 服务器启动时初始化配置监听器
2. 监听独立的主题配置文件 `_config.{theme}.yml` 的变更
3. 当检测到文件变更时，重新加载配置并合并到 Hexo 主题配置中
4. 触发页面重新生成，实时更新预览效果

## 注意事项

- 仅在运行 `hexo server` 命令时生效
- 如果 `_config.{theme}.yml` 不存在于 Hexo 项目根目录，则该插件将不会执行监控
- 配置文件必须是有效的 YAML 格式，否则可能导致加载失败

## 依赖

- Node.js >= 12.13.0
- Hexo >= 6.0.0
- chokidar ^3.5.3
- js-yaml ^4.1.0
- hexo-util ^3.0.1

## 许可证

[MIT](LICENSE) © [huazie](https://github.com/huazie)
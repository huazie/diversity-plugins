# GitHub Actions NPM 发布配置

本项目使用 GitHub Actions 自动发布子项目到 NPM。以下是配置步骤：

## 配置 NPM Token

为了让 GitHub Actions 能够发布包到 NPM，你需要设置 NPM Token：

1. 登录你的 NPM 账号
2. 访问 https://www.npmjs.com/settings/[你的用户名]/tokens
3. 点击 "Generate New Token" 按钮，选择 "Classic Token" 选项
4. 输入名称（例如：NPM_TOKEN），然后选择 "Automation" 选项
5. 复制生成的 Token

## 添加 Token 到 GitHub Secrets

1. 在 GitHub 仓库页面，点击 "Settings" 标签
2. 在左侧菜单中选择 "Secrets and variables" > "Actions"
3. 点击 "New repository secret"
4. 名称填写 `NPM_TOKEN`，值填写你从 NPM 复制的 Token
5. 点击 "Add secret" 保存

## 触发条件

自动发布会在以下情况触发：

1. 当推送带有 `v` 前缀的标签（例如 `v1.0.0`），且修改了 `packages/` 目录下的文件
2. 手动触发工作流（通过 GitHub Actions 界面的 workflow_dispatch）

### 发布流程建议

1. 更新子项目的 `package.json` 中的版本号
2. 提交并推送更改到 `main` 分支
3. 创建一个新的标签，格式为 `v版本号`（例如 `v1.0.0`）
4. 推送标签到远程仓库，触发自动发布流程

## 发布逻辑

- 工作流会检测哪些子项目发生了变更
- 只有发生变更的子项目会被发布
- 发布前会执行构建和测试步骤
- 只有当子项目的版本号高于 NPM 上已有版本时才会发布

## 版本管理

发布新版本前，请确保更新子项目的 `package.json` 中的 `version` 字段。
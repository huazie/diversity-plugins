# Hexo Generator Comments

[![npm version](https://img.shields.io/npm/v/hexo-generator-comments.svg?style=flat&logo=npm)](https://www.npmjs.com/package/hexo-generator-comments) [![Hexo version](https://img.shields.io/badge/hexo-%3E=5.3.0-blue?style=flat&logo=hexo)](https://hexo.io) [![license](https://img.shields.io/badge/license-MIT-orange)](https://github.com/huazie/diversity-plugins/blob/main/LICENSE) [![GitHub Repo stars](https://img.shields.io/github/stars/huazie/diversity-plugins?style=flat)](https://github.com/huazie/diversity-plugins/stargazers)

Hexo multi-comment system generator plugin, supporting integration and switching of multiple comment systems, providing a unified comment interface.

[中文说明/Chinese Documentation](README.md)

## Features

| Feature | Description |
|------|------|
| **Multi-comment System Support** | Integrate multiple comment systems (Utterances, Gitalk, Giscus, etc.) simultaneously |
| **Tab-based Switching** | Elegant tab interface for easy switching between different comment systems |
| **User Preference Memory** | Intelligently remembers the comment system chosen by visitors, enhancing user experience |
| **Lazy Loading Support** | Optional lazy loading mechanism to significantly improve page load speed |
| **Theme Agnostic** | Perfectly compatible with any Hexo theme, seamless integration |
| **Custom Layout** | Flexible layout and style customization options |
| **Dark Mode Support** | Built-in dark mode styles, automatically adapting to system theme |

## Quick Start

### Install the Plugin

```bash
npm install hexo-generator-comments --save
```

### Basic Usage

1. After **installing the plugin**, add the basic configuration in the `_config.yml` file at the root of your Hexo site.
2. **Select and configure** the comment system you need.
3. **Integrate the comment component** into your theme.
4. **Start the site** and visit the `/comments/` path to see the effect.

## Configuration Guide

### Basic Configuration

Add the following configuration in the `_config.yml` file at the root of your Hexo site:

```yaml
comments:
  title: 
  layout: 
  path: 
  darkclass:
  style: tabs
  active: 
  storage: true
  lazyload: false
  nav:
    #utterances:
    #  text: Utterances
    #  order: 0
    #gitalk:
    #  order: 1
```

- **comments** - Comment System Configuration
  - **title** - Custom comment title (optional, default is "Comments")
  - **layout** - Custom comment layout file name (optional, without extension)
  - **path** - Custom comment page path (optional, default is `comments`)
  - **darkclass** - Dark theme class name (optional)
  - **style** - When multiple comment systems are enabled, choose a default display style. Options: `tabs` (tab-based)
  - **active** - Choose a default comment system to display. Options: `utterances` | `gitalk` | `giscus`, etc.
  - **storage** - Whether to remember the comment system chosen by visitors. Options: `true` | `false`. Set to `true` to remember the visitor's choice.
  - **lazyload** - Whether to enable lazy loading for comment systems. Options: `true` | `false`
  - **nav** - Adjust the display text or order of navigation elements
    - **`utterances`** - Comment system name
      - **text** - Display text for the navigation element (optional, defaults to the comment system name)
      - **order** - Display order of the navigation element (higher numbers appear later)

## Supported Comment Systems

The plugin supports multiple comment systems. Here are the currently supported ones:

| Comment System | Features | Use Cases |
|----------|------|----------|
| **Utterances** | Lightweight, based on GitHub Issues | Technical blogs, open-source projects |
| **Gitalk** | Feature-rich, based on GitHub Issues | Personal blogs, technical sharing |
| **Giscus** | Modern, based on GitHub Discussions | Community discussions, interactive blogs |

### Installation and Configuration Examples

#### Utterances

```bash
# Install
npm install hexo-comments-utterances --save
```

```yaml
# Utterances
# A comment plugin built by the open-source community, providing an efficient solution for adding interactive comments to blogs, articles, or any static website.
# For more information: https://utteranc.es
utterances:
  enable: false
  loading: true
  repo: user-name/repo-name
  issue_term: pathname
  theme: github-light
  dark: github-dark
```

- **utterances** - Utterances Configuration, For more information: https://utteranc.es
  - **enable** - Whether to enable. Available values: `true` | `false`
  - **loading** - Whether to enable loading indicator, Available values: `true` | `false`
  - **repo** - Github repository owner and name
  - **issue_term** - Issue Matching Rule, Available values: `pathname` | `url` | `title` | `og:title` | `issue number` | `specific term`
    - **`pathname`** - Issue title contains page pathname. Utterances will search for an issue whose title contains the blog post's pathname URL component. If a matching issue is not found, Utterances will automatically create one the first time someone comments on your post.
    - **`url`** - Issue title contains page URL. Utterances will search for an issue whose title contains the blog post's URL. If a matching issue is not found, Utterances will automatically create one the first time someone comments on your post.
    - **`title`** - Issue title contains page title. Utterances will search for an issue whose title contains the blog post's title. If a matching issue is not found, Utterances will automatically create one the first time someone comments on your post.
    - **`og:title`** - Issue title contains page `og:title`，Utterances will search for an issue whose title contains the page's Open Graph title meta. If a matching issue is not found, Utterances will automatically create one the first time someone comments on your post.
    - **`issue number`** - Specific issue number. You configure Utterances to load a specific issue by number. Issues are not automatically created.
    - **`other value`** - Issue title contains specific term. You configure Utterances to search for an issue whose title contains a specific term of your choosing. If a matching issue is not found, Utterances will automatically create one the first time someone comments on your post. The issue's title will be the term you chose.
  - **theme** - Utterances default theme, Available values: `github-light` | `github-dark` | `preferred-color-scheme` | `github-dark-orange` | `icy-dark` | `dark-blue` | `photon-dark` | `boxy-light`
  - **dark** - Utterances dark theme

#### Gitalk

```bash
# Install
npm install hexo-comments-gitalk --save
```

```yaml
# Gitalk
# A modern comment plugin based on GitHub Issues and Preact.
# It allows visitors to log in with their GitHub account and post comments, with all comment data stored in the corresponding GitHub repository.
# For more information: https://gitalk.github.io
gitalk:
  enable: false
  github_id: 
  repo: 
  client_id: 
  client_secret: 
  admin_user: 
  distraction_free_mode: true
  proxy: https://cors-anywhere.azm.workers.dev/https://github.com/login/oauth/access_token
  issue_term: pathname
  language:
```

- **gitalk** - Gitalk Configuration, For more information: https://gitalk.github.io/
  - **enable** - Whether to enable. Available values: `true` | `false`
  - **github_id** - GitHub repo owner
  - **repo** - Repository name to store issues
  - **client_id** - GitHub Application Client ID
  - **client_secret** - GitHub Application Client Secret
  - **admin_user** - GitHub repo owner and collaborators, only these guys can initialize gitHub issues.
  - **distraction_free_mode** - Facebook-like distraction free mode. Available values: `true` | `false`
  - **proxy** - Proxy Address. When the official proxy is not available, you can change it to your own proxy address.
  - **issue_term** - Issue Matching Rule, Available values: `pathname` | `url` | `title` | `issue number`
    - **`pathname`** - Issue's Labels includes the page pathname
    - **`url`** - Issue's Labels includes the page url
    - **`title`** - Issue's Labels includes the page title
    - **`issue number`** - Specific issue number. You configure Gitalk to load a specific issue by number.
  - **language** - Gitalk's display language depends on user's browser or system environment. If you want everyone visiting your site to see a uniform language, you can set a force language value. Available values: `zh-CN` | `zh-TW` | `en` | `es-ES` | `fr` | `ru`

#### Giscus

```bash
# Install
npm install hexo-comments-giscus --save
```

```yaml
# Giscus
# A comment system implemented using GitHub Discussions.
# For more information: https://giscus.app/
giscus:
  enable: false
  loading: true
  repo: your-username/your-repo-name
  repo_id: 
  category: 
  category_id: 
  mapping: pathname
  term: 
  strict: 0
  reactions_enabled: 1
  emit_metadata: 0
  theme: light
  dark: dark
  lang: 
  input_position: bottom
  data_loading: lazy
```

- **giscus** - Giscus Configuration, For more information: https://giscus.app/
  - **enable** - Whether to enable. Available values: `true` | `false`
  - **loading** - Whether to enable loading indicator, Available values: `true` | `false`
  - **repo** - Github repository name, This repo is where the discussions will be linked to.
  - **repo_id** - Github repository id. Users can preview the `<script>` content by entering their repository details on [giscus.app](https://giscus.app/)
  - **category** - Github discussion category. When searching for a matching discussion, giscus will only search in this category. Available values: `Announcements` | `General` | `Ideas` | `Polls` | `Q&A` | `Show and tell`
  - **category_id** - Github discussion category id. Users can view the `<script>` content by selecting a Discussion category on [giscus.app](https://giscus.app/)
  - **mapping** - Page ↔️ Discussions Mapping Rules, Available values: `pathname` | `url` | `title` | `og:title` | `specific`
    - **`pathname`** - Discussion title contains page pathname. Giscus will search for a discussion whose title contains the page's pathname URL component.
    - **`url`** - Discussion title contains page URL. Giscus will search for a discussion whose title contains the page's URL.
    - **`title`** - Discussion title contains page `<title>`. Giscus will search for a discussion whose title contains the page's `<title>` HTML tag.
    - **`og:title`** - Discussion title contains page og:title. Giscus will search for a discussion whose title contains the page's `<meta property="og:title">` HTML tag.
    - **`specific`** - Specifically designated to be used in conjunction with the term configuration property.
  - **term** - When `mapping` is set to `specific`, the `term` property is required and must be configured as follows:
    - Discussion title contains a specific term.
    - Specific discussion number. This option does not support automatic discussion creation.
  - **strict** - Whether to use strict title matching. Avoid mismatches due to GitHub's fuzzy searching method when there are multiple discussions with similar titles. Available values: 0 | 1
  - **reactions_enabled** - Whether to enable reactions for the main post. The reactions for the discussion's main post will be shown before the comments. Available values: 0 | 1
  - **emit_metadata** - Whether to emit discussion metadata. Discussion metadata will be sent periodically to the parent window (the embedding page).
  - **theme** - Giscus default theme, Available values: `light` | `light_high_contrast` | `light_protanopia` | `light_tritanopia` | `dark` | `dark_high_contrast` | `dark_protanopia` | `dark_tritanopia` | `dark_dimmed` | `preferred_color_scheme` | `transparent_dark` | `noborder_light` | `noborder_dark` | `noborder_gray` | `cobalt` | `purple_dark`
  - **dark** - Giscus dark theme
  - **lang** - The interface language of the comment section (displayed text). If not configured, it defaults to `window.navigator.language`. Available values: `zh-CN` | `zh-TW` | `en` | `es-ES` | `fr` | `ru`
  - **input_position** - Comment input position, Available values:
    - **`bottom`** - The comment input box will be placed below the comments
    - **`top`** - The comment input box will be placed above the comments, so that users can leave a comment without scrolling to the bottom of the discussion.
  - **data_loading** - Load the comments lazily. Loading of the comments will be deferred until the user scrolls near the comments container. This is done by adding loading="lazy" to the `<iframe>` element.

## Theme Integration

### Supported Template Engines

This plugin supports all Hexo themes using the following template engines:

| Template Engine | File Extension | Support Status |
|-----------------|----------------|----------------|
| **EJS** | `.ejs` | ✅ Fully Supported |
| **Nunjucks** | `.njk` | ✅ Fully Supported |
| **JSX + Inferno** | `.jsx` | ✅ Fully Supported |

### Integration Methods

#### 1. Direct Access via Theme Integration
- **Local Development**: Access `http://127.0.0.1:4000/comments/`
- **Production Environment**: Access `https://your-domain.com/comments/`

#### 2. Theme Layout Integration Code

**EJS Theme Integration**

```ejs
<% if (page.comments) { %>
    <%- partial('comments') %>
<% } %>
```

**Nunjucks Theme Integration**

```njk
{% if page.comments %}
    {{ partial('comments') }}
{% endif %}
```

**JSX + Inferno Theme Integration**

```diff
  const { Component } = require('inferno');
  const Article = require('./common/article');
+ const Comments = require('hexo-generator-comments/layout/comments')

  module.exports = class extends Component {
      render() {
-         const { config, page, helper } = this.props;
+         const { config, theme, page, helper } = this.props;

          return (
+             <div>
                  <Article config={config} page={page} helper={helper} index={false} />
+                 {page.comments && <Comments theme={theme} helper={helper} />}
+             </div>
          );
      }
  };
```

#### 3. Disable Comments on Specific Pages

Add to the Front Matter of pages where comments should not be displayed:

```yaml
---
title: Article Title
date: 2021-01-01 12:00:00
comments: false  # Disable comments
---
```

> **Note**: In Hexo, `page.comments` defaults to `true`

### Compatibility Features

- ✅ **Theme Agnostic**: Compatible with all Hexo themes using EJS, Nunjucks, and other template engines
- ✅ **Dark Mode**: Supports dark/light theme switching
- ✅ **Responsive Design**: Perfectly supports multi-device display

## How It Works

```mermaid
graph TD
    A[Hexo Initialization] --> B[Register Comment Generator]
    B --> C[Load Configuration File]
    C --> D[Generate Comment Interface]
    D --> E[JavaScript Handles Switching Logic]
    E --> F[User Interaction]
    F --> G[Remember User Preferences]
```

1. **Initialization Phase**: Plugin registers generators and filters when Hexo starts
2. **Configuration Loading**: Reads comment system configuration from `_config.yml`
3. **Interface Generation**: Creates unified comment interface supporting multiple systems
4. **Interaction Handling**: Processes comment system loading and switching via JavaScript
5. **Preference Memory**: Locally stores user-selected comment system

## Advanced Configuration

### Custom Comment Layout

1. Create custom layout file in theme directory:
   ```
   themes/your-theme/layout/_custom/comments.ejs
   ```

2. Specify custom layout in the site configuration `_config.yml` or theme configuration `_config.yml`, `_config.[theme].yml`:
   ```yaml
   comments:
     layout: _custom/comments
   ```

### Custom Default Title

Specify the default title in the site configuration `_config.yml` or theme configuration `_config.yml`, `_config.[theme].yml`:

```yaml
comments:
  title: Comments
```

### Custom Comment Page Path

Specify the comment page path in the site configuration `_config.yml` or theme configuration `_config.yml`, `_config.[theme].yml`:

```yaml
comments:
  path: custom/comments
```

The comment page can be accessed via: http://127.0.0.1:4000/custom/comments/

### Extending Comment Systems

This plugin uses modular design and supports adding new comment systems:

| Existing Plugin | Repository | Status |
|-----------------|------------|--------|
| hexo-comments-utterances | [GitHub](https://github.com/huazie/diversity-plugins/packages/hexo-comments-utterances) | ✅ Stable |
| hexo-comments-gitalk | [GitHub](https://github.com/huazie/diversity-plugins/packages/hexo-comments-gitalk) | ✅ Stable |
| hexo-comments-giscus | [GitHub](https://github.com/huazie/diversity-plugins/packages/hexo-comments-giscus) | ✅ Stable |

### Light/Dark Mode Toggle

The `toggleColorScheme` method provided by `Diversity.utils` in `Diversity.js` enables light/dark mode switching.

Add the following call in your Hexo theme's color scheme switching logic:

```javascript
// Toggle color scheme for comment area
Diversity.utils.toggleColorScheme();
```

## Contribution Guide

We welcome all forms of contributions!

### Ways to Contribute

- 🐛 **Report Bugs**: [Submit Issue](https://github.com/huazie/diversity-plugins/issues)
- 💡 **Feature Suggestions**: [Feature Requests](https://github.com/huazie/diversity-plugins/issues)
- 🔧 **Code Contributions**: [Submit Pull Request](https://github.com/huazie/diversity-plugins/pulls)
- 📖 **Documentation Improvements**: Help improve documentation

### Development Guide

1. Fork this repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push branch: `git push origin feature/amazing-feature`
5. Submit Pull Request

## License

This project is open source under the [MIT](LICENSE) license.

---

<div align="center">

**If this plugin helps you, please consider giving us a ⭐**

Made with ❤️ by [huazie](https://github.com/huazie)

</div>
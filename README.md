# markdown 转图

使用`puppeteer`将`markdown`转换为图片

---

## 安装插件

karin 根目录执行以下命令即可开箱使用

```bash
pnpm add @karinjs/plugin-markdown -w
```

## 有一些基础配置

> 你可以在`karin/config/plugin/@karinjs/plugin-markdown/config.yaml`中配置

```yaml
# 权限配置 "master" | "admin" | "group.owner" | "group.admin" | "all"
permission: master

# 像素比 越高越清晰 但是会减缓渲染速度
deviceScaleFactor: 3

# 页面加载状态 'load'|'domcontentloaded'|'networkidle0'|'networkidle2'
# load: 页面完全加载
# domcontentloaded: DOMContentLoaded 事件触发 如果纯静态可以使用
# networkidle0: 500ms内没有网络连接
# networkidle2: 500ms内网络连接数小于2
waitUntil: networkidle2

# markedKatex配置 详情查看https://katex.org/docs/options.html
markedKatex:
  # 输出格式 html | mathml | htmlAndMathml
  output: htmlAndMathml
  throwOnError: false


```

## 指令

`#md + markdown内容`

`#md + 任何文件`

举例：

<details>
<summary>点击展开查看高级示例</summary>

```txt
#md # 地球的安可<div style="display: flex;">
<p align="left">
  <img src="https://prod-alicdn-community.kurobbs.com/forum/e93296bb45e74a0e9e523120e317794620240521.png" width="700" height="700" align="center">
</p>
<div>

## 想要看我的私房照吗？


> 使用技能

| 参数名 | 参数类型 |
| ------ | ------ |
| 敌人id  | int   |
| 是否长按  | bool   |

<details>
 <summary>安可私房照</summary>
</details>

</div>
<div style="margin-left: 20px; padding-left: 10px; border-left: 1px solid grey;">
<div style="color: green; font-size: 18px; font-weight: bold">
地球的安可
</div>
<div>
地球生物</div>
</div>
</div>
```

</details>

### 效果展示

<details>
<summary>点击展开图片查看效果</summary>

![图片][效果展示]

</details>

## 进阶

当然支持导出使用啦~

举例: 在`karin-plugin-example`中随便新建一个 js 文件

```js
import fs from "fs";
import markdown from "../karin-plugin-markdown/index.js";

const image = await markdown("# Hello, world!");
// 保存到本地 base64
fs.writeFileSync("./image.jpeg", image.replace("base64://", ""), "base64");
```

你会在根目录看到一个`image.jpeg`文件~

### 更多参数

```js
import fs from "fs";
import markdown from "../karin-plugin-markdown/index.js";

const image = await markdown("# Hello, world!", {
  theme: 2, // 主题设置 0跟随系统 1白天 2黑夜
  waitUntil: "networkidle0", // "networkidle0" | "load" | "domcontentloaded" | "networkidle2"
  deviceScaleFactor: 10, // 像素比 越大越清晰 渲染速度越慢
});
// 保存到本地 base64
fs.writeFileSync("./image.jpeg", image.replace("base64://", ""), "base64");
```

## 资源来源

- `highlight.min.js`:
  - [原始源][highlight.min.js]
  - [GitHub][Github-highlight.min.js]
- `github.min.css`:
  - [原始源][github.min.css]
  - [GitHub][Github-highlight.min.js]
- `katex.min.css`:
  - [原始源][katex.min.css]
  - [GitHub][Github-katex.min.css]
- `tex-mml-chtml.js`:
  - [原始源][tex-mml-chtml.js]
  - [GitHub][Github-tex-mml-chtml.js]

[效果展示]: https://gchat.qpic.cn/gchatpic_new/473893141/2171986905-3016544360-EFA0C041E2496809C8369DCACE68A1E1/0?term=2&is_origin=1
[highlight.min.js]: https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/highlight.min.js
[github.min.css]: https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/github.min.css
[katex.min.css]: https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css
[tex-mml-chtml.js]: https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js

[Github-highlight.min.js]: https://github.com/highlightjs/highlight.js
[Github-katex.min.css]: https://github.com/linxiaowu66/marked-kaTex
[Github-tex-mml-chtml.js]: https://github.com/mathjax/MathJax

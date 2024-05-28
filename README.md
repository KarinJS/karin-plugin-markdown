# markdown 转图

使用`puppeteer`将`markdown`转换为图片

---

## 克隆仓库

karin根目录执行以下命令克隆仓库到本地

```bash
git clone https://github.com/karinjs/karin-plugin-markdown.git ./plugins/karin-plugin-markdown
```

## 安装依赖

```bash
pnpm install --filter=karin-plugin-markdown
```

## 指令

`#md + markdown内容`

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
 <summary>点击查看安可私房照</summary>
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

举例: 在`karin-plugin-example`中随便新建一个js文件

```js
import fs from 'fs'
import markdown from '../karin-plugin-markdown/index.js'

const image = await markdown('# Hello, world!')
// 保存到本地 base64
fs.writeFileSync('./image.jpeg', image.replace('base64://', ''), 'base64')

```

你会在根目录看到一个`image.jpeg`文件~

### 更多参数

```js
import fs from 'fs'
import markdown from '../karin-plugin-markdown/index.js'

const image = await markdown('# Hello, world!', {
  theme: 2, // 主题设置 0跟随系统 1白天 2黑夜
  waitUntil: 'networkidle0', // "networkidle0" | "load" | "domcontentloaded" | "networkidle2"
  deviceScaleFactor: 10 // 像素比 越大越清晰 渲染速度越慢
})
// 保存到本地 base64
fs.writeFileSync('./image.jpeg', image.replace('base64://', ''), 'base64')

```

[效果展示]: https://gchat.qpic.cn/gchatpic_new/473893141/2171986905-3016544360-EFA0C041E2496809C8369DCACE68A1E1/0?term=2&is_origin=1

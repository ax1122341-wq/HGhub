# Video Hub — Vercel 静态部署版

这是一个独立的、浏览器可部署的视频目录模板，不连接原项目的第三方数据服务。

## 部署
1. 解压 ZIP，将文件上传到一个新的 GitHub 仓库。
2. 在 Vercel 选择该仓库并导入。
3. Framework Preset 选择 **Other**。
4. Build Command 留空，Output Directory 填 `.`。
5. 点击 Deploy。

## 添加自己的视频
编辑 `videos.json`，每个视频可填写：
- `title`：标题
- `category`：分类
- `description`：说明
- `thumbnail`：封面图片路径或你有权使用的图片 URL
- `src`：视频文件路径或你有权使用的直链

本地视频请放在 `videos/` 文件夹，例如 `videos/video.mp4`，并在 `videos.json` 中填写 `/videos/video.mp4`。大型视频建议使用你有权管理的对象存储，并确保其允许网页播放及跨域访问。

注意：此模板不包含原项目的外部 API、账号系统、评论、点赞、收藏或数据源线路功能。原项目许可证为 PolyForm Noncommercial 1.0.0；使用原项目代码或资源时，请先核对许可证适用范围。

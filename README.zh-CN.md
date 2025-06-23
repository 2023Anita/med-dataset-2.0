<div align="center">

![](./public//imgs/bg2.png)

<img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/ConardLi/med-dataset">
<img alt="GitHub Downloads (all assets, all releases)" src="https://img.shields.io/github/downloads/ConardLi/med-dataset/total">
<img alt="GitHub Release" src="https://img.shields.io/github/v/release/ConardLi/med-dataset">
<img src="https://img.shields.io/badge/license-AGPL--3.0-green.svg" alt="AGPL 3.0 License"/>
<img alt="GitHub contributors" src="https://img.shields.io/github/contributors/ConardLi/med-dataset">
<img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/ConardLi/med-dataset">

**专业的医疗数据集生成与管理平台**

[简体中文](./README.zh-CN.md) | [English](./README.md)

[功能特点](#功能特点) • [快速开始](#本地运行) • [贡献](#贡献) • [许可证](#许可证)

如果喜欢本项目，请给本项目留下 Star⭐️，或者请作者喝杯咖啡呀 => [打赏作者](./public/imgs/aw.jpg) ❤️！

</div>

## 概述

MED-Dataset 是一个专为医疗数据集生成而设计的智能平台。它提供了直观的界面，用于医疗文档的处理、问题生成和数据集构建，帮助研究人员和医疗专业人士快速创建高质量的机器学习训练数据。

通过 MED-Dataset，您可以将医疗文档转化为结构化的数据集，支持医疗AI研究和临床决策支持系统的开发。

![](./public/imgs/cn-arc.png)

## 功能特点

- **医疗文档处理**：支持多种医疗文档格式的导入和处理（PDF、DOCX、Markdown）
- **智能文本分割**：针对医疗内容优化的高级文本分段算法
- **AI问题生成**：基于医疗文本自动生成高质量问题
- **数据集构建**：生成包含问题和答案的结构化数据集用于机器学习训练
- **多LLM支持**：集成多种AI提供商（OpenAI、Ollama、智谱AI等）
- **数据管理**：安全的数据存储和项目管理功能
- **多格式导出**：支持多种数据集格式（Alpaca、ShareGPT、JSON、JSONL）
- **用户友好界面**：为医疗研究人员和数据科学家设计的直观界面
- **多平台支持**：提供Web应用、桌面应用和Docker容器版本
- **国际化支持**：支持多种语言（英文、中文）

## 快速演示

https://github.com/user-attachments/assets/6ddb1225-3d1b-4695-90cd-aa4cb01376a8

## 本地运行

### 下载客户端

<table style="width: 100%">
  <tr>
    <td width="20%" align="center">
      <b>Windows</b>
    </td>
    <td width="30%" align="center" colspan="2">
      <b>MacOS</b>
    </td>
    <td width="20%" align="center">
      <b>Linux</b>
    </td>
  </tr>
  <tr style="text-align: center">
    <td align="center" valign="middle">
      <a href='https://github.com/ConardLi/easy-dataset/releases/latest'>
        <img src='./public/imgs/windows.png' style="height:24px; width: 24px" />
        <br />
        <b>Setup.exe</b>
      </a>
    </td>
    <td align="center" valign="middle">
      <a href='https://github.com/ConardLi/easy-dataset/releases/latest'>
        <img src='./public/imgs/mac.png' style="height:24px; width: 24px" />
        <br />
        <b>Intel</b>
      </a>
    </td>
    <td align="center" valign="middle">
      <a href='https://github.com/ConardLi/easy-dataset/releases/latest'>
        <img src='./public/imgs/mac.png' style="height:24px; width: 24px" />
        <br />
        <b>M</b>
      </a>
    </td>
    <td align="center" valign="middle">
      <a href='https://github.com/ConardLi/easy-dataset/releases/latest'>
        <img src='./public/imgs/linux.png' style="height:24px; width: 24px" />
        <br />
        <b>AppImage</b>
      </a>
    </td>
  </tr>
</table>

### 使用 NPM 安装

1. 克隆仓库：

```bash
   git clone https://github.com/ConardLi/med-dataset.git
   cd med-dataset
```

2. 安装依赖：

```bash
   npm install
```

3. 启动开发服务器：

```bash
   npm run build

   npm run start
```

4. 打开浏览器并访问 `http://localhost:1717`

### 使用本地 Dockerfile 构建

如果你想自行构建镜像，可以使用项目根目录中的 Dockerfile：

1. 克隆仓库：
   ```bash
   git clone https://github.com/ConardLi/med-dataset.git
   cd med-dataset
   ```
2. 构建 Docker 镜像：
   ```bash
   docker build -t med-dataset .
   ```
3. 运行容器：

   ```bash
   docker run -d -p 1717:1717 -v {YOUR_LOCAL_DB_PATH}:/app/local-db --name med-dataset med-dataset
   ```

   **注意：** 请将 `{YOUR_LOCAL_DB_PATH}` 替换为你希望存储本地数据库的实际路径。

4. 打开浏览器，访问 `http://localhost:1717`

## 使用方法

### 创建项目

<table>
    <tr>
        <td><img src="./public/imgs/1.png"></td>
        <td><img src="./public/imgs/2.png"></td>
    </tr>
</table>

1. 在首页点击"创建项目"按钮；
2. 输入项目名称和描述；
3. 配置您首选的 LLM API 设置

### 处理文档

<table>
    <tr>
        <td><img src="./public/imgs/3.png"></td>
        <td><img src="./public/imgs/4.png"></td>
    </tr>
</table>

1. 在"文本分割"部分上传您的文件（支持 PDF、Markdwon、txt、DOCX）；
2. 查看和调整自动分割的文本片段；
3. 查看和调整全局领域树

### 生成问题

<table>
    <tr>
        <td><img src="./public/imgs/5.png"></td>
        <td><img src="./public/imgs/6.png"></td>
    </tr>
</table>

2. 基于文本块批量构造问题；
3. 查看并编辑生成的问题；
4. 使用标签树组织问题

### 创建数据集

<table>
    <tr>
        <td><img src="./public/imgs/7.png"></td>
        <td><img src="./public/imgs/8.png"></td>
    </tr>
</table>

1. 基于问题批量构造数据集；
2. 使用配置的 LLM 生成答案；
3. 查看、编辑并优化生成的答案

### 导出数据集

<table>
    <tr>
        <td><img src="./public/imgs/9.png"></td>
        <td><img src="./public/imgs/10.png"></td>
    </tr>
</table>

1. 在数据集部分点击"导出"按钮；
2. 选择您喜欢的格式（Alpaca 或 ShareGPT）；
3. 选择文件格式（JSON 或 JSONL）；
4. 根据需要添加自定义系统提示；
5. 导出您的数据集

## 项目结构

```
med-dataset/
├── app/                                # Next.js 应用目录
│   ├── api/                            # API 路由
│   │   ├── llm/                        # LLM API 集成
│   │   │   ├── ollama/                 # Ollama API 集成
│   │   │   └── openai/                 # OpenAI API 集成
│   │   ├── projects/                   # 项目管理 API
│   │   │   ├── [projectId]/            # 项目特定操作
│   │   │   │   ├── chunks/             # 文本块操作
│   │   │   │   ├── datasets/           # 数据集生成和管理
│   │   │   │   ├── generate-questions/ # 批量问题生成
│   │   │   │   ├── questions/          # 问题管理
│   │   │   │   └── split/              # 文本分割操作
│   │   │   └── user/                   # 用户特定项目操作
│   ├── projects/                       # 前端项目页面
│   │   └── [projectId]/                # 项目特定页面
│   │       ├── datasets/               # 数据集管理 UI
│   │       ├── questions/              # 问题管理 UI
│   │       ├── settings/               # 项目设置 UI
│   │       └── text-split/             # 文本处理 UI
│   └── page.js                         # 主页
├── components/                         # React 组件
│   ├── datasets/                       # 数据集相关组件
│   ├── home/                           # 主页组件
│   ├── projects/                       # 项目管理组件
│   ├── questions/                      # 问题管理组件
│   └── text-split/                     # 文本处理组件
├── lib/                                # 核心库和工具
│   ├── db/                             # 数据库操作
│   ├── i18n/                           # 国际化
│   ├── llm/                            # LLM 集成
│   │   ├── common/                     # 通用 LLM 工具
│   │   ├── core/                       # 核心 LLM 客户端
│   │   └── prompts/                    # 提示词模板
│   │       ├── answer.js               # 答案生成提示词（中文）
│   │       ├── answerEn.js             # 答案生成提示词（英文）
│   │       ├── question.js             # 问题生成提示词（中文）
│   │       ├── questionEn.js           # 问题生成提示词（英文）
│   │       └── ... 其他提示词
│   └── text-splitter/                  # 文本分割工具
├── locales/                            # 国际化资源
│   ├── en/                             # 英文翻译
│   └── zh-CN/                          # 中文翻译
├── public/                             # 静态资源
│   └── imgs/                           # 图片资源
└── local-db/                           # 本地文件数据库
    └── projects/                       # 项目数据存储
```

## 文档

- 查看本项目的演示视频：[MED-Dataset 演示视频](https://www.bilibili.com/video/BV1y8QpYGE57/)

## 社区实践

- [MED-Dataset × LLaMA Factory: 让大模型高效学习领域知识](https://buaa-act.feishu.cn/wiki/KY9xwTGs1iqHrRkjXBwcZP9WnL9)

## 贡献

我们欢迎社区的贡献！如果您想为 MED-Dataset 做出贡献，请按照以下步骤操作：

1. Fork 仓库
2. 创建新分支（`git checkout -b feature/amazing-feature`）
3. 进行更改
4. 提交更改（`git commit -m '添加一些惊人的功能'`）
5. 推送到分支（`git push origin feature/amazing-feature`）
6. 打开 Pull Request（提交至 DEV 分支）

请确保适当更新测试并遵守现有的编码风格。

## 加交流群 & 联系作者

联系信息请查看项目仓库。

## 许可证

本项目采用 AGPL 3.0 许可证 - 有关详细信息，请参阅 [LICENSE](LICENSE) 文件。

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=ConardLi/med-dataset&type=Date)](https://www.star-history.com/#ConardLi/med-dataset&Date)

<div align="center">
  <sub>由 <a href="https://github.com/ConardLi">ConardLi</a> 用 ❤️ 构建 • 关注我：<a href="./public/imgs/weichat.jpg">公众号</a>｜<a href="https://space.bilibili.com/474921808">B站</a>｜<a href="https://juejin.cn/user/3949101466785709">掘金</a>｜<a href="https://www.zhihu.com/people/wen-ti-chao-ji-duo-de-xiao-qi">知乎</a>｜<a href="https://www.youtube.com/@garden-conard">Youtube</a></sub>
</div>

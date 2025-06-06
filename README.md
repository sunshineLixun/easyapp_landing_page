# AI App Landing Page

一个使用 Astro 和 Tailwind CSS 构建的现代化 AI 应用落地页。

## 技术栈

- [Astro](https://astro.build/) - 现代化的静态站点生成器
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [Inter Font](https://rsms.me/inter/) - 现代化的字体
- [Stripe](https://stripe.com/) - 支付处理系统

## 开始使用

### 前置要求

- Node.js 16.0 或更高版本
- pnpm 包管理器
- Stripe 账户（用于支付功能）

### 安装

1. 克隆仓库
```bash
git clone [repository-url]
cd ai-app-landing
```

2. 安装依赖
```bash
pnpm install
```

3. 配置环境变量
创建 `.env` 文件并添加以下内容：
```env
# Stripe Configuration
PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_你的发布密钥
STRIPE_SECRET_KEY=sk_test_你的私密密钥
```

### 开发

启动开发服务器：
```bash
pnpm dev
```

### 构建

构建生产版本：
```bash
pnpm build
```

预览构建结果：
```bash
pnpm preview
```

## 项目结构

```
src/
├── components/     # 可复用的组件
│   └── ui/        # UI 组件
├── layouts/        # 页面布局组件
├── pages/         # 页面文件
│   └── api/       # API 路由
├── lib/           # 工具函数和配置
│   ├── stripe.ts  # Stripe 配置
│   └── payment.ts # 支付处理逻辑
└── styles/        # 全局样式
```

## 特性

- 响应式设计
- 现代化 UI/UX
- 优化的性能
- SEO 友好
- Stripe 支付集成
  - 支持订阅和一次性付款
  - 多种支付计划（免费、Pro、企业版）
  - 安全的支付处理
  - 支付状态管理
  - 成功页面处理

## 支付测试

在开发环境中，可以使用以下 Stripe 测试卡号：

- **成功支付**: 4242 4242 4242 4242
- **需要验证**: 4000 0025 0000 3155
- **被拒绝**: 4000 0000 0000 9995

## 安全注意事项

1. 永远不要在客户端代码中暴露 Stripe Secret Key
2. 使用环境变量存储敏感信息
3. 在生产环境中验证 webhook 签名
4. 始终在服务端验证支付状态

## 贡献

欢迎提交 Pull Requests 和 Issues。

## 许可证

[MIT](LICENSE) 
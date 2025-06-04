# Stripe 支付集成设置指南

## 🚀 完成的集成功能

✅ Stripe Checkout Session 集成
✅ 支付按钮状态管理（加载、错误处理）
✅ 不同计划的处理逻辑（免费、付费、企业）
✅ 成功页面
✅ 服务端 API 路由

## 📋 设置步骤

### 1. 创建 Stripe 账户
1. 访问 [stripe.com](https://stripe.com) 并注册账户
2. 完成账户验证（测试模式下可跳过）

### 2. 获取 API 密钥
1. 登录 Stripe Dashboard
2. 点击 "Developers" → "API keys"
3. 复制以下密钥：
   - **Publishable key** (pk_test_... 或 pk_live_...)
   - **Secret key** (sk_test_... 或 sk_live_...)

### 3. 创建产品和价格
1. 在 Stripe Dashboard 中点击 "Products"
2. 点击 "Add product"
3. 创建产品：
   - **Pro Plan**: $49/month
   - **Enterprise Plan**: 自定义价格
4. 复制每个产品的 **Price ID** (price_...)

### 4. 配置环境变量
创建 `.env` 文件并添加以下内容：

```env
# Stripe Configuration
PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_你的发布密钥
STRIPE_SECRET_KEY=sk_test_你的私密密钥

# Stripe Price IDs
STRIPE_PRICE_PRO=price_你的Pro计划价格ID
STRIPE_PRICE_ENTERPRISE=price_你的企业计划价格ID

# 网站URL
PUBLIC_SITE_URL=http://localhost:4321
```

### 5. 更新价格 ID
在 `src/lib/stripe.ts` 中确保价格 ID 正确配置。

### 6. 测试支付流程
1. 启动开发服务器：`npm run dev`
2. 访问 pricing 页面
3. 点击 "Subscribe Now" 按钮
4. 使用 Stripe 测试卡号：`4242 4242 4242 4242`

## 🧪 Stripe 测试卡号

- **成功支付**: 4242 4242 4242 4242
- **需要验证**: 4000 0025 0000 3155
- **被拒绝**: 4000 0000 0000 9995
- **过期日期**: 任何未来日期
- **CVC**: 任何3位数字

## 📂 文件结构

```
src/
├── lib/
│   ├── stripe.ts          # Stripe 配置
│   └── payment.ts         # 支付处理逻辑
├── components/
│   └── ui/
│       └── PaymentButton.tsx  # 支付按钮组件
├── pages/
│   ├── api/
│   │   └── create-checkout-session.ts  # API 路由
│   └── success.astro      # 支付成功页面
```

## 🔧 自定义配置

### 修改支付模式
在 `create-checkout-session.ts` 中修改 `mode` 参数：
- `subscription`: 订阅模式
- `payment`: 一次性付款

### 添加客户信息收集
```typescript
customer_email: userEmail, // 预填邮箱
billing_address_collection: 'required', // 收集账单地址
```

### 启用促销代码
```typescript
allow_promotion_codes: true,
```

## 🔒 安全注意事项

1. ⚠️ **永远不要**在客户端代码中暴露 Secret Key
2. ✅ 使用环境变量存储敏感信息
3. ✅ 在生产环境中验证 webhook 签名
4. ✅ 始终在服务端验证支付状态

## 📞 支持

如果遇到问题，可以：
1. 查看 [Stripe 文档](https://stripe.com/docs)
2. 检查浏览器控制台的错误信息
3. 查看服务端日志 
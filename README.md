# NoBrainer Beta - Next.js Frontend

这是一个基于 React + Next.js + Node.js 的动态前端应用，从原始的静态 HTML 文件转换而来。它提供了一个现代化的聊天界面，支持用户认证和 LLM API 集成。

## 功能特性

- 🔐 **用户认证**: 支持邮箱/密码登录和 Google OAuth
- 💬 **实时聊天**: 与 LLM 模型进行对话
- 📱 **响应式设计**: 适配各种设备屏幕
- 🗂️ **聊天历史**: 保存和管理聊天记录
- 🎨 **现代 UI**: 基于 Tailwind CSS 的深色主题

## 技术栈

- **Frontend**: Next.js 15, React 18, TypeScript
- **Authentication**: NextAuth.js
- **Database**: SQLite + Prisma ORM
- **Styling**: Tailwind CSS
- **API**: RESTful APIs with Next.js API routes

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 环境配置

复制并配置环境变量：

```bash
cp .env.example .env.local
```

编辑 `.env.local` 文件，设置以下变量：

```env
# 数据库
DATABASE_URL="file:./dev.db"

# NextAuth配置
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth (可选)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# LLM API配置
LLM_API_URL=http://localhost:8000/api/chat
LLM_API_KEY=your-llm-api-key
```

### 3. 数据库设置

```bash
# 生成Prisma客户端
npx prisma generate

# 创建数据库表
npx prisma db push
```

### 4. 启动开发服务器

```bash
npm run dev
```

应用将在 `http://localhost:3000` 启动。

## API 接口

### 认证接口

- `POST /api/register` - 用户注册
- `POST /api/auth/signin` - 用户登录 (NextAuth)
- `POST /api/auth/signout` - 用户登出 (NextAuth)

### 聊天接口

- `POST /api/chat` - 发送消息给 LLM
- `GET /api/chat` - 获取聊天历史
- `GET /api/chat?chatId=xxx` - 获取特定聊天记录

### LLM API 集成

在 `src/app/api/chat/route.ts` 中的 `callLLMAPI` 函数配置您的 LLM API：

```typescript
async function callLLMAPI(message: string): Promise<string> {
  const response = await fetch(process.env.LLM_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.LLM_API_KEY}`,
    },
    body: JSON.stringify({
      message,
      // 添加其他LLM API需要的参数
    }),
  });

  const data = await response.json();
  return data.response || data.message || "No response from LLM API";
}
```

## 页面结构

- `/` - 主页 (原 index.html)
- `/login` - 登录页面 (原 login_page.html)
- `/signup` - 注册页面 (原 signup_page.html)
- `/chat` - 聊天界面 (原 convo_page.html)

## 数据库结构

使用 Prisma ORM 管理 SQLite 数据库：

- `User` - 用户信息
- `Account` - OAuth 账户关联
- `Session` - 用户会话
- `Chat` - 聊天记录
- `Message` - 消息内容

## 部署

### Vercel 部署

1. 推送代码到 GitHub
2. 在 Vercel 中导入项目
3. 设置环境变量
4. 部署

### Docker 部署

```bash
# 构建镜像
docker build -t nobrainer-frontend .

# 运行容器
docker run -p 3000:3000 nobrainer-frontend
```

## 开发指南

### 添加新功能

1. 在 `src/app` 下创建新页面
2. 在 `src/app/api` 下添加 API 路由
3. 更新 Prisma schema (如需要)
4. 运行 `npx prisma db push` 更新数据库

### 自定义 LLM 集成

修改 `src/app/api/chat/route.ts` 中的 `callLLMAPI` 函数以适配您的 LLM API 格式。

## 故障排除

### 常见问题

1. **Prisma 错误**: 确保数据库 URL 格式正确
2. **认证问题**: 检查 NEXTAUTH_SECRET 是否设置
3. **LLM API 错误**: 验证 API URL 和密钥是否正确

### 日志查看

开发模式下，查看浏览器控制台和终端输出获取详细错误信息。

## 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目。

## 许可证

MIT License

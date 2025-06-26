# 🧠 NoBrainer - AI Chat Platform

<div align="center">

![NoBrainer Logo](public/image.png)

**一个现代化的全栈 AI 聊天平台，基于 Next.js 15 和 OpenAI API 构建**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[🚀 在线演示](https://your-demo-url.com) • [📖 文档](https://your-docs-url.com) • [🐛 报告问题](https://github.com/your-username/nobrainer/issues)

</div>

---

## 📋 目录

- [✨ 功能特性](#-功能特性)
- [🏗️ 技术架构](#️-技术架构)
- [🚀 快速开始](#-快速开始)
- [⚙️ 环境配置](#️-环境配置)
- [📁 项目结构](#-项目结构)
- [🔗 API 文档](#-api-文档)
- [🗄️ 数据库设计](#️-数据库设计)
- [🎨 UI/UX 设计](#-uiux-设计)
- [🔧 开发指南](#-开发指南)
- [🚀 部署指南](#-部署指南)
- [🔍 测试](#-测试)
- [📊 性能优化](#-性能优化)
- [🔒 安全性](#-安全性)
- [🤝 贡献指南](#-贡献指南)
- [📞 支持与联系](#-支持与联系)

---

## ✨ 功能特性

### 🔐 **身份认证系统**

- ✅ 邮箱/密码注册登录
- ✅ JWT 会话管理
- ✅ 安全密码哈希（bcrypt）
- ✅ 会话持久化
- 🔄 Google OAuth（可选启用）

### 💬 **智能聊天功能**

- ✅ 实时 AI 对话体验
- ✅ OpenAI GPT 模型集成
- ✅ 对话历史记录
- ✅ 多轮对话上下文保持
- ✅ 消息状态实时更新
- ✅ 错误处理和重试机制

### 🗂️ **聊天管理**

- ✅ 创建和管理多个聊天会话
- ✅ 自动生成聊天标题
- ✅ 聊天历史浏览
- ✅ 消息搜索（计划中）
- ✅ 聊天导出（计划中）

### 📱 **现代化界面**

- ✅ 响应式设计，支持移动端
- ✅ 深色主题界面
- ✅ 流畅的动画效果
- ✅ 直观的用户交互
- ✅ 键盘快捷键支持

### 🚀 **性能优化**

- ✅ 服务端渲染（SSR）
- ✅ 自动代码分割
- ✅ 图片优化
- ✅ 缓存策略
- ✅ 渐进式 Web 应用（PWA）

---

## 🏗️ 技术架构

### **前端技术栈**

```
┌─────────────────────────────────────┐
│              Frontend               │
├─────────────────────────────────────┤
│ • React 19 + TypeScript             │
│ • Next.js 15 (App Router)           │
│ • Tailwind CSS 4                    │
│ • React Hooks & Context             │
│ • NextAuth.js                       │
└─────────────────────────────────────┘
```

### **后端技术栈**

```
┌─────────────────────────────────────┐
│              Backend                │
├─────────────────────────────────────┤
│ • Next.js API Routes                │
│ • Prisma ORM                        │
│ • PostgreSQL Database               │
│ • JWT Authentication                │
│ • bcrypt Password Hashing           │
└─────────────────────────────────────┘
```

### **第三方集成**

```
┌─────────────────────────────────────┐
│           External APIs             │
├─────────────────────────────────────┤
│ • OpenAI GPT API                    │
│ • Supabase (可选)                   │
│ • Google OAuth (可选)               │
└─────────────────────────────────────┘
```

### **核心依赖版本**

| 依赖         | 版本    | 说明           |
| ------------ | ------- | -------------- |
| Next.js      | 15.3.3  | React 全栈框架 |
| React        | 19.0.0  | UI 框架        |
| TypeScript   | 5+      | 类型安全       |
| Prisma       | 6.9.0   | 数据库 ORM     |
| NextAuth.js  | 4.24.11 | 身份认证       |
| Tailwind CSS | 4       | CSS 框架       |

---

## 🚀 快速开始

### 📋 **系统要求**

- Node.js 18.17 或更高版本
- npm 或 yarn 包管理器
- PostgreSQL 数据库
- Git

### 🛠️ **安装步骤**

#### 1️⃣ **克隆项目**

```bash
# 克隆仓库
git clone https://github.com/your-username/nobrainer.git
cd nobrainer/frontend-nextjs

# 或者使用 GitHub CLI
gh repo clone your-username/nobrainer
```

#### 2️⃣ **安装依赖**

```bash
# 使用 npm
npm install

# 或使用 yarn
yarn install

# 或使用 pnpm (推荐)
pnpm install
```

#### 3️⃣ **环境配置**

```bash
# 复制环境变量模板
cp .env.example .env.local

# 编辑环境变量文件
nano .env.local  # 或使用你喜欢的编辑器
```

#### 4️⃣ **数据库初始化**

```bash
# 生成 Prisma 客户端
npx prisma generate

# 运行数据库迁移
npx prisma db push

# (可选) 查看数据库
npx prisma studio
```

#### 5️⃣ **启动开发服务器**

```bash
# 启动开发模式
npm run dev

# 带 Turbopack 的快速开发模式
npm run dev --turbo
```

🎉 **应用现在运行在 [http://localhost:3000](http://localhost:3000)**

### 🔧 **开发工具**

```bash
# 代码检查
npm run lint

# 类型检查
npx tsc --noEmit

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

---

## ⚙️ 环境配置

### 📝 **环境变量详解**

创建 `.env.local` 文件并配置以下变量：

```env
# ==========================================
# 🗄️ 数据库配置
# ==========================================
DATABASE_URL="postgresql://username:password@localhost:5432/nobrainer"
# 或使用 Supabase
# DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# ==========================================
# 🔐 NextAuth.js 配置
# ==========================================
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-jwt-secret-key-here"
# 生成秘钥: openssl rand -base64 32

# ==========================================
# 🤖 OpenAI API 配置
# ==========================================
OPENAI_API_KEY="sk-proj-your-openai-api-key-here"
OPENAI_MODEL="gpt-4o-mini"  # 或 gpt-3.5-turbo, gpt-4
OPENAI_TEMPERATURE="0.7"    # 0.0-2.0 之间
OPENAI_MAX_TOKENS="4000"    # 最大 token 数

# ==========================================
# 🔧 系统提示词配置
# ==========================================
SYSTEM_PROMPT="你是一个有用的AI助手，请用中文回答用户的问题。"

# ==========================================
# 🌐 Google OAuth (可选)
# ==========================================
# GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
# GOOGLE_CLIENT_SECRET="your-google-client-secret"

# ==========================================
# ☁️ Supabase 配置 (可选)
# ==========================================
# NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
# NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
# SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# ==========================================
# 🚀 部署配置
# ==========================================
# VERCEL_URL  # Vercel 自动设置
# NODE_ENV="development"  # development | production
```

### 🔑 **获取 API 密钥**

#### **OpenAI API Key**

1. 访问 [OpenAI Platform](https://platform.openai.com/api-keys)
2. 登录或创建账户
3. 点击 "Create new secret key"
4. 复制生成的密钥到 `OPENAI_API_KEY`

#### **Google OAuth (可选)**

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建新项目或选择现有项目
3. 启用 Google+ API
4. 创建 OAuth 2.0 客户端 ID
5. 设置回调 URL: `http://localhost:3000/api/auth/callback/google`

#### **Supabase (可选)**

1. 访问 [Supabase](https://supabase.com)
2. 创建新项目
3. 在设置中获取 URL 和 API 密钥

---

## 📁 项目结构

```
📦 nobrainer/frontend-nextjs/
├── 📁 prisma/                     # 数据库配置
│   └── 📄 schema.prisma          # Prisma 数据模型定义
├── 📁 public/                     # 静态资源
│   ├── 🖼️ favicon.ico            # 网站图标
│   ├── 🖼️ image.png              # 应用 Logo
│   ├── 📄 system_prompt.txt       # 默认系统提示词
│   └── 🎨 *.svg                  # 矢量图标
├── 📁 src/                        # 源代码目录
│   ├── 📁 app/                    # Next.js 13+ App Router
│   │   ├── 📁 api/                # API 路由
│   │   │   ├── 📁 auth/           # 认证相关 API
│   │   │   │   └── 📁 [...nextauth]/
│   │   │   │       └── 📄 route.ts    # NextAuth.js 配置
│   │   │   ├── 📁 chat/           # 聊天 API
│   │   │   │   └── 📄 route.ts    # 聊天消息处理
│   │   │   └── 📁 register/       # 用户注册 API
│   │   │       └── 📄 route.ts    # 用户注册逻辑
│   │   ├── 📁 chat/               # 聊天页面
│   │   │   └── 📄 page.tsx        # 聊天界面组件
│   │   ├── 📁 login/              # 登录页面
│   │   │   └── 📄 page.tsx        # 登录界面组件
│   │   ├── 📁 signup/             # 注册页面
│   │   │   └── 📄 page.tsx        # 注册界面组件
│   │   ├── 📄 globals.css         # 全局样式
│   │   ├── 📄 layout.tsx          # 根布局组件
│   │   ├── 📄 page.tsx            # 首页组件
│   │   └── 📄 scrollbar.css       # 滚动条样式
│   ├── 📁 lib/                    # 工具库
│   │   ├── 📄 prisma.ts           # Prisma 客户端配置
│   │   └── 📄 supabase.ts         # Supabase 客户端配置
│   └── 📁 types/                  # TypeScript 类型定义
│       └── 📄 next-auth.d.ts      # NextAuth 类型扩展
├── 📄 .env.local                  # 环境变量 (需自创建)
├── 📄 .env.example                # 环境变量模板
├── 📄 .gitignore                  # Git 忽略文件
├── 📄 eslint.config.mjs           # ESLint 配置
├── 📄 next.config.js              # Next.js 配置
├── 📄 next.config.ts              # Next.js TypeScript 配置
├── 📄 package.json                # 项目依赖配置
├── 📄 postcss.config.mjs          # PostCSS 配置
├── 📄 README.md                   # 项目文档
├── 📄 tailwind.config.js          # Tailwind CSS 配置
├── 📄 tsconfig.json               # TypeScript 配置
└── 📄 vercel.json                 # Vercel 部署配置
```

### 📁 **核心目录说明**

#### **`src/app/` - 应用主目录**

- 使用 Next.js 13+ App Router 架构
- 每个子目录代表一个路由
- `layout.tsx` 定义页面布局
- `page.tsx` 定义页面内容

#### **`src/app/api/` - API 路由**

- **`auth/[...nextauth]/`**: NextAuth.js 认证处理
- **`chat/`**: 聊天消息的 CRUD 操作
- **`register/`**: 用户注册逻辑

#### **`src/lib/` - 共享库**

- **`prisma.ts`**: 数据库连接和查询
- **`supabase.ts`**: Supabase 客户端配置

#### **`prisma/` - 数据库配置**

- **`schema.prisma`**: 数据模型定义
- 自动生成的迁移文件

---

## 🔗 API 文档

### 🔐 **认证 API**

#### **POST** `/api/register` - 用户注册

```typescript
// 请求体
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "用户名称" // 可选
}

// 成功响应 (201)
{
  "message": "User created successfully",
  "userId": "clxxxxx"
}

// 错误响应 (400)
{
  "error": "User already exists"
}
```

#### **POST** `/api/auth/signin` - 用户登录

```typescript
// NextAuth.js 处理的标准登录端点
// 支持 credentials 和 OAuth 提供商
```

### 💬 **聊天 API**

#### **POST** `/api/chat` - 发送消息

```typescript
// 请求体
{
  "message": "你好，请介绍一下自己",
  "chatId": "clxxxxx", // 可选，不提供则创建新聊天
  "createEmptyChat": false // 可选，仅创建空聊天
}

// 成功响应 (200)
{
  "chatId": "clxxxxx",
  "message": "你好！我是AI助手，很高兴为您服务..."
}

// 错误响应
{
  "error": "Unauthorized" // 401
}
{
  "error": "Message is required" // 400
}
```

#### **GET** `/api/chat` - 获取聊天列表

```typescript
// 成功响应 (200)
[
  {
    id: "clxxxxx",
    title: "关于AI的讨论",
    createdAt: "2025-06-26T10:00:00.000Z",
    updatedAt: "2025-06-26T10:30:00.000Z",
    messages: [
      {
        id: "clxxxxx",
        content: "你好",
        role: "USER",
        createdAt: "2025-06-26T10:00:00.000Z",
      },
    ],
  },
];
```

#### **GET** `/api/chat?chatId=xxx` - 获取特定聊天

```typescript
// 成功响应 (200)
{
  "id": "clxxxxx",
  "title": "关于AI的讨论",
  "messages": [
    {
      "id": "clxxxxx",
      "content": "你好",
      "role": "USER",
      "createdAt": "2025-06-26T10:00:00.000Z"
    },
    {
      "id": "clxxxxx",
      "content": "你好！我是AI助手...",
      "role": "ASSISTANT",
      "createdAt": "2025-06-26T10:00:30.000Z"
    }
  ],
  "createdAt": "2025-06-26T10:00:00.000Z",
  "updatedAt": "2025-06-26T10:30:00.000Z"
}
```

### 🛡️ **API 安全性**

- 所有 API 都需要有效的用户会话
- 用户只能访问自己的数据
- 密码使用 bcrypt 哈希存储
- JWT token 用于会话管理

---

## 🗄️ 数据库设计

### 📊 **数据模型关系图**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│      User       │    │      Chat       │    │    Message      │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ id (PK)         │    │ id (PK)         │    │ id (PK)         │
│ email (unique)  │◄──┐│ userId (FK)     │◄──┐│ chatId (FK)     │
│ name            │   ││ title           │   ││ content         │
│ password        │   ││ createdAt       │   ││ role            │
│ createdAt       │   ││ updatedAt       │   ││ createdAt       │
│ updatedAt       │   │└─────────────────┘   │└─────────────────┘
└─────────────────┘   │                      │
                      │                      │
┌─────────────────┐   │ ┌─────────────────┐  │
│    Account      │   │ │    Session      │  │
├─────────────────┤   │ ├─────────────────┤  │
│ id (PK)         │   └►│ id (PK)         │  │
│ userId (FK)     │─────┤ userId (FK)     │  │
│ provider        │     │ sessionToken    │  │
│ providerAccountId│    │ expires         │  │
│ refresh_token   │     └─────────────────┘  │
│ access_token    │                          │
└─────────────────┘     Relationship:        │
                        User ──► Chat ──► Message
                        (1:N)    (1:N)
```

### 📋 **表结构详解**

#### **User 表** - 用户信息

| 字段            | 类型            | 说明                |
| --------------- | --------------- | ------------------- |
| `id`            | String (PK)     | 用户唯一标识 (cuid) |
| `email`         | String (Unique) | 用户邮箱            |
| `name`          | String?         | 用户显示名称        |
| `password`      | String?         | 加密后的密码        |
| `emailVerified` | DateTime?       | 邮箱验证时间        |
| `image`         | String?         | 用户头像 URL        |
| `createdAt`     | DateTime        | 创建时间            |
| `updatedAt`     | DateTime        | 更新时间            |

#### **Chat 表** - 聊天会话

| 字段        | 类型        | 说明         |
| ----------- | ----------- | ------------ |
| `id`        | String (PK) | 聊天唯一标识 |
| `userId`    | String (FK) | 所属用户 ID  |
| `title`     | String?     | 聊天标题     |
| `createdAt` | DateTime    | 创建时间     |
| `updatedAt` | DateTime    | 最后更新时间 |

#### **Message 表** - 聊天消息

| 字段        | 类型        | 说明                      |
| ----------- | ----------- | ------------------------- |
| `id`        | String (PK) | 消息唯一标识              |
| `chatId`    | String (FK) | 所属聊天 ID               |
| `content`   | String      | 消息内容                  |
| `role`      | MessageRole | 消息角色 (USER/ASSISTANT) |
| `createdAt` | DateTime    | 创建时间                  |

#### **Account & Session 表** - NextAuth.js 认证

用于 OAuth 登录和会话管理，由 NextAuth.js 自动维护。

### 🔧 **数据库操作命令**

```bash
# 查看数据库状态
npx prisma db push

# 重置数据库
npx prisma db push --force-reset

# 生成新的迁移
npx prisma migrate dev --name add_new_feature

# 查看数据库数据
npx prisma studio

# 部署迁移到生产环境
npx prisma migrate deploy
```

---

## 🎨 UI/UX 设计

### 🎯 **设计理念**

- **简洁优雅**: 专注内容，减少视觉干扰
- **深色主题**: 护眼设计，适合长时间使用
- **响应式布局**: 完美适配桌面、平板、手机
- **直观交互**: 符合用户直觉的操作方式

### 🎨 **色彩设计**

```css
:root {
  /* 主色调 */
  --color-primary: #000000; /* 纯黑背景 */
  --color-secondary: #1a1a1a; /* 次级黑色 */

  /* 文字色彩 */
  --color-text-primary: #f5f5f5; /* 主要文字 */
  --color-text-secondary: #a1a1aa; /* 次要文字 */
  --color-text-muted: #71717a; /* 弱化文字 */

  /* 边框色彩 */
  --color-border: #374151; /* 主边框 */
  --color-border-light: #4b5563; /* 亮边框 */

  /* 功能色彩 */
  --color-accent: #6366f1; /* 强调色 */
  --color-success: #10b981; /* 成功色 */
  --color-warning: #f59e0b; /* 警告色 */
  --color-error: #ef4444; /* 错误色 */
}
```

### 📱 **响应式断点**

```css
/* 移动设备 */
@media (max-width: 640px) {
  ...;
}

/* 平板设备 */
@media (min-width: 641px) and (max-width: 1024px) {
  ...;
}

/* 桌面设备 */
@media (min-width: 1025px) {
  ...;
}
```

### 🎭 **组件设计系统**

#### **按钮组件**

- **主要按钮**: 高对比度，用于主要操作
- **次要按钮**: 中等对比度，用于次要操作
- **危险按钮**: 红色主题，用于删除等操作

#### **输入组件**

- **文本输入框**: 深色背景，亮色边框
- **文本域**: 支持多行输入，自适应高度
- **选择器**: 下拉选择，支持搜索

#### **反馈组件**

- **加载状态**: 骨架屏 + 动画指示器
- **消息提示**: Toast 通知系统
- **错误提示**: 内联错误显示

---

## 🔧 开发指南

### 🚀 **开发环境搭建**

#### **推荐开发工具**

- **IDE**: Visual Studio Code
- **浏览器**: Chrome DevTools
- **数据库**: Prisma Studio
- **API 测试**: Postman 或 Insomnia

#### **必备 VS Code 扩展**

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "prisma.prisma",
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

### 📝 **编码规范**

#### **TypeScript 规范**

```typescript
// ✅ 好的实践
interface User {
  id: string;
  email: string;
  name?: string;
}

const fetchUser = async (id: string): Promise<User | null> => {
  try {
    return await prisma.user.findUnique({ where: { id } });
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

// ❌ 避免的写法
const fetchUser = async (id: any) => {
  return await prisma.user.findUnique({ where: { id } });
};
```

#### **React 组件规范**

```tsx
// ✅ 好的实践
interface MessageProps {
  content: string;
  role: "USER" | "ASSISTANT";
  timestamp: Date;
}

const Message: React.FC<MessageProps> = ({ content, role, timestamp }) => {
  return (
    <div className={`message ${role.toLowerCase()}`}>
      <p>{content}</p>
      <time>{timestamp.toLocaleString()}</time>
    </div>
  );
};

export default Message;
```

#### **API 路由规范**

```typescript
// ✅ 好的实践
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { message } = await request.json();
    if (!message?.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // 处理逻辑...

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

### 🔧 **常用开发命令**

```bash
# 开发相关
npm run dev              # 启动开发服务器
npm run dev:turbo        # 使用 Turbopack 启动
npm run build            # 构建生产版本
npm run start            # 启动生产服务器
npm run lint             # 代码检查
npm run type-check       # TypeScript 类型检查

# 数据库相关
npx prisma generate      # 生成 Prisma 客户端
npx prisma db push       # 推送 schema 到数据库
npx prisma studio        # 打开数据库管理界面
npx prisma migrate dev   # 创建并应用迁移

# 测试相关 (如果配置了测试)
npm run test             # 运行测试
npm run test:watch       # 监听模式运行测试
npm run test:coverage    # 生成测试覆盖率报告
```

### 🐛 **调试技巧**

#### **前端调试**

```typescript
// 在组件中添加调试信息
const ChatPage = () => {
  const [messages, setMessages] = useState([]);

  // 开发环境下的调试日志
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Messages updated:', messages);
    }
  }, [messages]);

  return (
    // 组件 JSX...
  );
};
```

#### **API 调试**

```typescript
// 在 API 路由中添加详细日志
export async function POST(request: NextRequest) {
  console.log("API called at:", new Date().toISOString());
  console.log("Request headers:", request.headers);

  const body = await request.json();
  console.log("Request body:", body);

  // 处理逻辑...
}
```

#### **数据库调试**

```bash
# 查看生成的 SQL
DEBUG=prisma:query npx prisma studio

# 查看 Prisma 引擎日志
DEBUG=prisma:engine npm run dev
```

---

## 🚀 部署指南

### ☁️ **Vercel 部署 (推荐)**

#### **自动部署**

1. **连接 GitHub 仓库**

   ```bash
   # 推送代码到 GitHub
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **在 Vercel 中导入项目**

   - 访问 [Vercel Dashboard](https://vercel.com/dashboard)
   - 点击 "New Project"
   - 选择你的 GitHub 仓库
   - Vercel 会自动检测 Next.js 项目

3. **配置环境变量**

   ```env
   # 在 Vercel 设置中添加环境变量
   DATABASE_URL=postgresql://...
   NEXTAUTH_URL=https://your-app.vercel.app
   NEXTAUTH_SECRET=your-production-secret
   OPENAI_API_KEY=sk-...
   ```

4. **部署**
   - 点击 "Deploy"
   - Vercel 会自动构建和部署

#### **自定义域名**

```bash
# 在 Vercel Dashboard 中
1. 进入项目设置
2. 点击 "Domains"
3. 添加自定义域名
4. 配置 DNS 记录
```

### 🐳 **Docker 部署**

#### **Dockerfile**

```dockerfile
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

#### **docker-compose.yml**

```yaml
version: "3.8"
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/nobrainer
      - NEXTAUTH_SECRET=your-secret
      - OPENAI_API_KEY=your-key
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=nobrainer
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

#### **部署命令**

```bash
# 构建和启动
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

### 🌐 **其他部署选项**

#### **Railway**

```bash
# 安装 Railway CLI
npm install -g @railway/cli

# 登录
railway login

# 初始化项目
railway init

# 部署
railway up
```

#### **Heroku**

```bash
# 安装 Heroku CLI
npm install -g heroku

# 登录
heroku login

# 创建应用
heroku create your-app-name

# 设置环境变量
heroku config:set DATABASE_URL=your-db-url
heroku config:set NEXTAUTH_SECRET=your-secret

# 部署
git push heroku main
```

### 🔧 **生产环境优化**

#### **性能优化**

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 压缩图片
  images: {
    formats: ["image/webp"],
    minimumCacheTTL: 60,
  },

  // 启用 SWC 压缩
  swcMinify: true,

  // 输出为独立应用
  output: "standalone",

  // 实验性功能
  experimental: {
    // 启用 Turbopack
    turbo: {
      loaders: {
        ".svg": ["@svgr/webpack"],
      },
    },
  },
};

module.exports = nextConfig;
```

#### **监控设置**

```bash
# 添加错误监控
npm install @sentry/nextjs

# 添加性能监控
npm install @vercel/analytics
```

---

## 🔍 测试

### 🧪 **测试策略**

- **单元测试**: 测试独立函数和组件
- **集成测试**: 测试 API 路由和数据库交互
- **端到端测试**: 测试完整用户流程

### 🛠️ **测试工具配置**

#### **Jest + React Testing Library**

```bash
# 安装测试依赖
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

#### **jest.config.js**

```javascript
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapping: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testEnvironment: "jest-environment-jsdom",
};

module.exports = createJestConfig(customJestConfig);
```

### ✅ **测试示例**

#### **组件测试**

```typescript
// __tests__/components/Message.test.tsx
import { render, screen } from "@testing-library/react";
import Message from "@/components/Message";

describe("Message Component", () => {
  it("renders user message correctly", () => {
    render(
      <Message
        content="Hello, world!"
        role="USER"
        timestamp={new Date("2025-06-26")}
      />
    );

    expect(screen.getByText("Hello, world!")).toBeInTheDocument();
    expect(screen.getByText("6/26/2025")).toBeInTheDocument();
  });
});
```

#### **API 测试**

```typescript
// __tests__/api/chat.test.ts
import { POST } from "@/app/api/chat/route";
import { NextRequest } from "next/server";

jest.mock("@/lib/prisma", () => ({
  user: {
    findUnique: jest.fn(),
  },
  chat: {
    create: jest.fn(),
  },
}));

describe("/api/chat", () => {
  it("creates new chat successfully", async () => {
    const request = new NextRequest("http://localhost:3000/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: "Hello" }),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);
  });
});
```

### 🚀 **运行测试**

```bash
# 运行所有测试
npm test

# 监听模式
npm run test:watch

# 生成覆盖率报告
npm run test:coverage
```

---

## 📊 性能优化

### ⚡ **前端性能优化**

#### **代码分割**

```typescript
// 动态导入组件
import dynamic from "next/dynamic";

const ChatInterface = dynamic(() => import("@/components/ChatInterface"), {
  loading: () => <p>Loading...</p>,
  ssr: false, // 客户端渲染
});
```

#### **图片优化**

```jsx
import Image from "next/image";

// 使用 Next.js Image 组件
<Image
  src="/logo.png"
  alt="NoBrainer Logo"
  width={200}
  height={100}
  priority // 关键图片预加载
/>;
```

#### **缓存策略**

```typescript
// API 路由缓存
export async function GET() {
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "s-maxage=60, stale-while-revalidate",
    },
  });
}

// 静态生成缓存
export const revalidate = 3600; // 1小时重新验证
```

### 🗄️ **数据库性能优化**

#### **索引优化**

```prisma
model Chat {
  id        String   @id @default(cuid())
  userId    String
  title     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // 添加索引提升查询性能
  @@index([userId, updatedAt])
  @@index([createdAt])
}

model Message {
  id        String   @id @default(cuid())
  chatId    String
  content   String
  role      MessageRole
  createdAt DateTime @default(now())

  // 消息查询索引
  @@index([chatId, createdAt])
}
```

#### **查询优化**

```typescript
// ✅ 高效的查询 - 只获取需要的字段
const chats = await prisma.chat.findMany({
  where: { userId },
  select: {
    id: true,
    title: true,
    updatedAt: true,
    _count: {
      select: { messages: true },
    },
  },
  orderBy: { updatedAt: "desc" },
  take: 20, // 限制结果数量
});

// ❌ 低效的查询 - 获取所有字段
const chats = await prisma.chat.findMany({
  where: { userId },
  include: {
    messages: true, // 会加载所有消息
  },
});
```

### 🚀 **API 性能优化**

#### **响应压缩**

```javascript
// next.config.js
module.exports = {
  compress: true, // 启用 gzip 压缩

  // 自定义 headers
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "s-maxage=1, stale-while-revalidate",
          },
        ],
      },
    ];
  },
};
```

#### **请求优化**

```typescript
// 防抖处理用户输入
import { useDebouncedCallback } from "use-debounce";

const debouncedSend = useDebouncedCallback(
  (message: string) => {
    sendMessage(message);
  },
  500 // 500ms 延迟
);
```

### 📈 **监控工具**

#### **Web Vitals**

```typescript
// pages/_app.tsx
import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals";

function sendToAnalytics(metric: any) {
  // 发送到分析服务
  console.log(metric);
}

export function reportWebVitals(metric: any) {
  sendToAnalytics(metric);
}
```

#### **性能监控**

```bash
# 安装 Vercel Analytics
npm install @vercel/analytics

# 安装 Sentry 监控
npm install @sentry/nextjs
```

---

## 🔒 安全性

### 🛡️ **认证安全**

#### **密码安全**

```typescript
import bcrypt from "bcryptjs";

// 安全的密码哈希
const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12; // 高强度加密
  return bcrypt.hash(password, saltRounds);
};

// 密码强度验证
const validatePassword = (password: string): boolean => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSpecialChar
  );
};
```

#### **JWT 安全**

```typescript
// 安全的 JWT 配置
const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 小时
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      // 添加额外的安全检查
      if (user) {
        token.id = user.id;
        token.iat = Math.floor(Date.now() / 1000);
      }
      return token;
    },
  },
};
```

### 🔐 **API 安全**

#### **输入验证**

```typescript
import { z } from "zod"; // 推荐使用 zod 进行验证

const messageSchema = z.object({
  message: z.string().min(1).max(1000),
  chatId: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 验证输入
    const validatedData = messageSchema.parse(body);

    // 处理逻辑...
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }
  }
}
```

#### **权限检查**

```typescript
const checkUserPermission = async (
  userId: string,
  chatId: string
): Promise<boolean> => {
  const chat = await prisma.chat.findUnique({
    where: { id: chatId },
    select: { userId: true },
  });

  return chat?.userId === userId;
};
```

### 🌐 **网络安全**

#### **CORS 配置**

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://yourdomain.com",
          },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,PUT,DELETE" },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type,Authorization",
          },
        ],
      },
    ];
  },
};
```

#### **环境变量安全**

```bash
# .env.local - 敏感信息
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="complex-secret-key"
OPENAI_API_KEY="sk-..."

# .env.example - 公开模板（不包含敏感信息）
DATABASE_URL="postgresql://username:password@localhost:5432/dbname"
NEXTAUTH_SECRET="your-secret-key-here"
OPENAI_API_KEY="your-openai-api-key"
```

### 🔍 **安全检查清单**

- [ ] 所有密码都经过 bcrypt 哈希
- [ ] JWT 密钥足够复杂且定期更换
- [ ] API 路由都有认证检查
- [ ] 用户只能访问自己的数据
- [ ] 输入数据都经过验证和清理
- [ ] 敏感信息不记录在日志中
- [ ] HTTPS 在生产环境中启用
- [ ] 定期更新依赖包
- [ ] 实施 CORS 策略
- [ ] 设置合适的 CSP 头部

---

## 🤝 贡献指南

### 🌟 **如何贡献**

我们欢迎所有形式的贡献！无论是：

- 🐛 报告 Bug
- 💡 提出新功能
- 📝 改进文档
- 🔧 提交代码

### 🚀 **贡献流程**

#### **1. Fork 项目**

```bash
# 在 GitHub 上 Fork 这个仓库
# 克隆你的 Fork
git clone https://github.com/YOUR_USERNAME/nobrainer.git
cd nobrainer
```

#### **2. 创建功能分支**

```bash
# 创建并切换到新分支
git checkout -b feature/amazing-feature

# 或者修复 bug
git checkout -b fix/bug-description
```

#### **3. 提交更改**

```bash
# 添加更改
git add .

# 提交更改 (使用描述性消息)
git commit -m "feat: add amazing new feature"

# 推送到你的 Fork
git push origin feature/amazing-feature
```

#### **4. 创建 Pull Request**

- 在 GitHub 上创建 Pull Request
- 填写详细的描述
- 等待代码审查

### 📝 **提交消息规范**

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### **提交类型**

- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

#### **示例**

```bash
feat(auth): add Google OAuth integration
fix(chat): resolve message ordering issue
docs: update API documentation
style: format code with prettier
refactor(db): optimize database queries
test: add unit tests for chat API
chore: update dependencies
```

### 🔍 **代码审查标准**

#### **代码质量**

- [ ] 代码符合项目风格指南
- [ ] 通过所有 ESLint 检查
- [ ] 添加必要的 TypeScript 类型
- [ ] 包含适当的错误处理

#### **功能性**

- [ ] 功能按预期工作
- [ ] 不破坏现有功能
- [ ] 包含必要的测试
- [ ] 更新相关文档

#### **性能**

- [ ] 不引入性能回归
- [ ] 优化数据库查询
- [ ] 考虑缓存策略

### 🐛 **报告 Bug**

#### **Bug 报告模板**

```markdown
## Bug 描述

简明描述遇到的问题

## 重现步骤

1. 登录应用
2. 点击 '...'
3. 看到错误

## 预期行为

描述你期望发生什么

## 实际行为

描述实际发生了什么

## 环境信息

- OS: [e.g. macOS 14.0]
- Browser: [e.g. Chrome 120]
- Node.js version: [e.g. 18.17.0]

## 附加信息

添加截图或其他相关信息
```

### 💡 **功能请求**

#### **功能请求模板**

```markdown
## 功能描述

清晰描述你想要的功能

## 问题解决

这个功能解决了什么问题？

## 替代方案

你考虑过其他解决方案吗？

## 附加上下文

添加任何其他相关信息
```

---

## 📞 支持与联系

### 🆘 **获取帮助**

#### **社区支持**

- 💬 [GitHub Discussions](https://github.com/your-username/nobrainer/discussions) - 提问和讨论
- 🐛 [GitHub Issues](https://github.com/your-username/nobrainer/issues) - 报告 Bug
- 📧 Email: support@nobrainer.dev

#### **文档资源**

- 📖 [官方文档](https://docs.nobrainer.dev)
- 🎥 [视频教程](https://youtube.com/nobrainer-tutorials)
- 📚 [示例项目](https://github.com/nobrainer-examples)

### 🔗 **相关链接**

#### **技术文档**

- [Next.js 文档](https://nextjs.org/docs)
- [Prisma 文档](https://www.prisma.io/docs)
- [NextAuth.js 文档](https://next-auth.js.org)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [OpenAI API 文档](https://platform.openai.com/docs)

#### **工具和资源**

- [TypeScript 学习资源](https://www.typescriptlang.org/docs)
- [React 最佳实践](https://react.dev)
- [数据库设计指南](https://www.prisma.io/dataguide)

### 👥 **团队信息**

#### **核心维护者**

- **[@your-username](https://github.com/your-username)** - 项目创建者和维护者
- **[@contributor1](https://github.com/contributor1)** - 前端开发
- **[@contributor2](https://github.com/contributor2)** - 后端开发

#### **贡献者**

感谢所有为这个项目做出贡献的开发者！

<a href="https://github.com/your-username/nobrainer/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=your-username/nobrainer" />
</a>

### 📄 **许可证**

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

### 🎯 **路线图**

#### **即将推出的功能**

- [ ] 🔍 消息搜索功能
- [ ] 📤 聊天导出/导入
- [ ] 🎨 自定义主题
- [ ] 🌐 多语言支持
- [ ] 👥 团队协作功能
- [ ] 🔌 插件系统
- [ ] 📱 移动应用

#### **长期计划**

- [ ] 🤖 自定义 AI 模型
- [ ] ☁️ 企业级部署
- [ ] 📊 高级分析
- [ ] 🔗 第三方集成

---

<div align="center">

### 🙏 感谢使用 NoBrainer!

如果这个项目对你有帮助，请考虑给我们一个 ⭐️

**[⬆ 回到顶部](#-nobrainer---ai-chat-platform)**

---

**由 ❤️ 和 ☕ 驱动 | 使用 [Next.js](https://nextjs.org) 构建**

</div>

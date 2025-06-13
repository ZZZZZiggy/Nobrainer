# Vercel 部署指南

## 问题诊断

你在 Vercel 上遇到的 `500 Internal Server Error` 主要原因是：

1. **环境变量未配置** - Vercel 上没有设置必要的环境变量
2. **数据库连接失败** - `DATABASE_URL` 等关键变量缺失

## 解决步骤

### 1. 配置 Vercel 环境变量

在 Vercel 仪表板中：
1. 进入你的项目 → Settings → Environment Variables
2. 添加以下环境变量（从 `.env.local` 复制）：

```bash
# 数据库连接
DATABASE_URL=postgresql://postgres:gxy.2001524@db.udxqhukcbacktvenwakh.supabase.co:5432/postgres

# NextAuth 配置
NEXTAUTH_SECRET=TW6kv56laPdNT0IC6+lc4q+K1RkPq/skIJYSObf3SJ8=
NEXTAUTH_URL=https://nobrainer-orcin.vercel.app

# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=https://udxqhukcbacktvenwakh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkeHFodWtjYmFja3R2ZW53YWtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2OTcwNjYsImV4cCI6MjA2NTI3MzA2Nn0.6wRGVt0dPe1Nxqv-IRxaNUZ45IvTTBDtuv6oNau98kY

# RunPod API 配置（可选）
RUNPOD_ENDPOINT_URL=https://z86bovdwd9d7ez-8000.proxy.runpod.net/generate
RUNPOD_API_KEY=your-secret-api-key
RUNPOD_MODEL_NAME=llama2
```

⚠️ **重要**: 
- 确保所有变量都设置为 "Production" 环境
- `NEXTAUTH_URL` 需要改为你的 Vercel 域名
- 设置完后需要重新部署

### 2. 验证部署

设置好环境变量后：
1. 触发重新部署（在 Vercel 仪表板或推送新的 commit）
2. 测试 API 端点：`https://your-app.vercel.app/api/health`
3. 尝试注册/登录功能

### 3. 调试工具

如果仍有问题，检查：
- Vercel 函数日志：在仪表板的 Functions 标签页
- 浏览器网络标签页：查看具体的错误响应
- 数据库连接：确认 Supabase 数据库正常运行

## 常见错误

1. **500 错误** = 环境变量未设置或数据库连接失败
2. **404 错误** = API 路由问题（已通过 `vercel.json` 修复）
3. **浏览器扩展错误** = 可以忽略，不影响功能

## vercel.json 配置

已更新路由配置以确保 API 路由正常工作：

```json
{
  "version": 2,
  "builds": [
    {
      "src": "next.config.js",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```
# NoBrainer Vercel 部署指南

## 🚀 环境变量配置

在 Vercel Dashboard → Settings → Environment Variables 中添加以下变量：

### 必需的环境变量

```bash
DATABASE_URL
postgresql://postgres:gxy.2001524@db.udxqhukcbacktvenwakh.supabase.co:5432/postgres

NEXTAUTH_SECRET
TW6kv56laPdNT0IC6+lc4q+K1RkPq/skIJYSObf3SJ8=

NEXTAUTH_URL
https://你的vercel域名.vercel.app

RUNPOD_ENDPOINT_URL
https://z86bovdwd9d7ez-8000.proxy.runpod.net/generate

RUNPOD_API_KEY
your-secret-api-key

RUNPOD_MODEL_NAME
llama2

NEXT_PUBLIC_SUPABASE_URL
https://udxqhukcbacktvenwakh.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkeHFodWtjYmFja3R2ZW53YWtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2OTcwNjYsImV4cCI6MjA2NTI3MzA2Nn0.6wRGVt0dPe1Nxqv-IRxaNUZ45IvTTBDtuv6oNau98kY
```

## ⚠️ 重要提醒

1. **NEXTAUTH_URL**: 部署后必须更新为实际的Vercel域名
2. **RUNPOD_API_KEY**: 需要替换为真实的API密钥
3. **不要包含引号**: 在Vercel中设置环境变量时，只复制值部分，不要包含引号

## 🔧 故障排除

### NextAuth 401 错误
- 检查 NEXTAUTH_URL 是否正确
- 检查 NEXTAUTH_SECRET 是否设置
- 检查数据库连接

### Register API 500 错误
- 访问 `/api/test-db` 测试数据库连接
- 检查 DATABASE_URL 环境变量
- 检查 Supabase 数据库是否可访问
- 查看 Vercel Function 日志

### 数据库连接问题
1. 确保 DATABASE_URL 正确设置
2. 确保 Supabase 数据库在线
3. 检查 Prisma schema 是否与数据库同步
4. 运行数据库迁移（如果需要）

### Prisma 错误
- 已添加 postinstall 脚本自动生成 Prisma Client
- 构建脚本会在每次部署时生成 Prisma Client

### Favicon 404 错误
- 已添加 favicon.ico 到 public 目录

## 🛠️ 调试步骤

1. **测试数据库连接**：访问 `https://你的域名.vercel.app/api/test-db`
2. **查看 Vercel 日志**：在 Vercel Dashboard → Functions → View Function Logs
3. **检查环境变量**：确保所有必需的环境变量都已正确设置

# Vercel 部署指南

## 解决的问题
- ✅ Prisma 客户端在 Vercel 部署时未生成
- ✅ 优化了 Vercel serverless 函数配置
- ✅ 配置了正确的构建命令

## 部署步骤

### 1. 环境变量配置
在 Vercel Dashboard 中设置以下环境变量：
```
DATABASE_URL=your_supabase_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=https://your-domain.vercel.app
```

### 2. 自动部署
推送代码到 GitHub，Vercel 会自动：
1. 运行 `npm install`
2. 运行 `postinstall` 脚本生成 Prisma 客户端
3. 运行 `prisma generate && next build`

### 3. 验证部署
- 检查 `/api/health` 端点
- 检查 `/api/test-db` 端点确认数据库连接

## 关键配置文件

### vercel.json
```json
{
  "version": 2,
  "buildCommand": "prisma generate && next build",
  "installCommand": "npm install",
  "env": {
    "PRISMA_GENERATE_DATAPROXY": "true"
  },
  "functions": {
    "src/app/api/**/*.ts": {
      "runtime": "nodejs18.x"
    }
  }
}
```

### package.json scripts
```json
{
  "scripts": {
    "build": "prisma generate && next build",
    "postinstall": "prisma generate"
  }
}
```

### Prisma schema
```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../src/generated/prisma"
  engineType = "library"
}
```

## 故障排除

如果仍然遇到 Prisma 错误：
1. 在 Vercel Dashboard 中重新部署
2. 检查构建日志确认 `prisma generate` 正确执行
3. 确认环境变量正确设置
4. 检查数据库连接字符串格式

## 注意事项
- Vercel 使用 serverless 函数，每次冷启动都需要初始化 Prisma 客户端
- `engineType = "library"` 优化了 serverless 环境的性能
- `postinstall` 脚本确保在每次部署时生成客户端
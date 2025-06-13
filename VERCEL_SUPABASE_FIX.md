# Vercel 环境变量配置指南

## 🚨 Supabase 连接问题解决方案

### 问题症状
- 本地运行正常
- Vercel 部署后无法连接 Supabase
- 数据库相关 API 返回 500 错误

### 🔧 解决方案

#### 1. 在 Vercel Dashboard 设置正确的环境变量

前往 Vercel Dashboard → 你的项目 → Settings → Environment Variables，添加以下变量：

```bash
# 主数据库连接（用于 Prisma）
DATABASE_URL=postgresql://postgres:你的密码@db.udxqhukcbacktvenwakh.supabase.co:5432/postgres

# 直连 URL（提升 serverless 性能）
DIRECT_URL=postgresql://postgres:你的密码@db.udxqhukcbacktvenwakh.supabase.co:5432/postgres

# NextAuth 配置
NEXTAUTH_SECRET=TW6kv56laPdNT0IC6+lc4q+K1RkPq/skIJYSObf3SJ8=
NEXTAUTH_URL=https://你的域名.vercel.app

# Supabase 公开配置
NEXT_PUBLIC_SUPABASE_URL=https://udxqhukcbacktvenwakh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkeHFodWtjYmFja3R2ZW53YWtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2OTcwNjYsImV4cCI6MjA2NTI3MzA2Nn0.6wRGVt0dPe1Nxqv-IRxaNUZ45IvTTBDtuv6oNau98kY

# RunPod API 配置
RUNPOD_ENDPOINT_URL=https://z86bovdwd9d7ez-8000.proxy.runpod.net/generate
RUNPOD_API_KEY=your-secret-api-key
RUNPOD_MODEL_NAME=llama2
```

#### 2. 确保所有环境应用到所有环境

在添加每个环境变量时，确保勾选：
- ✅ Production
- ✅ Preview  
- ✅ Development

#### 3. 检查数据库连接字符串格式

确保 DATABASE_URL 格式正确：
```
postgresql://postgres:密码@db.项目引用.supabase.co:5432/postgres
```

**常见问题**：
- 密码包含特殊字符需要 URL 编码
- 项目引用 ID 错误
- 端口号错误（应该是 5432）

#### 4. Supabase 项目设置检查

在 Supabase Dashboard 检查：

1. **数据库 → 设置 → 连接参数**
   - 确认 Host、Port、Database 名称
   - 复制正确的连接字符串

2. **设置 → API**
   - 确认项目 URL 和 anon key

3. **设置 → 数据库 → 连接池**
   - 启用连接池（推荐用于 serverless）
   - 使用 Transaction 模式

#### 5. 验证部署

部署后访问以下端点验证：

```bash
# 健康检查
curl https://你的域名.vercel.app/api/health

# 数据库连接测试
curl https://你的域名.vercel.app/api/test-db
```

期望的成功响应：
```json
{
  "status": "success",
  "message": "Database connection successful",
  "userCount": 0,
  "environment": "production"
}
```

### 🐛 故障排除

#### 如果仍然连接失败：

1. **检查 Vercel 函数日志**
   ```bash
   vercel logs --follow
   ```

2. **验证环境变量**
   - 在 Vercel Dashboard 检查环境变量是否正确设置
   - 确认没有多余的空格或换行符

3. **检查 Supabase 项目状态**
   - 确认项目没有暂停
   - 检查数据库是否正常运行

4. **网络连接问题**
   - Vercel 函数可能被 Supabase 的防火墙阻止
   - 联系 Supabase 支持检查 IP 白名单

#### 常见错误及解决方案：

**Error: "P1001: Can't reach database server"**
- 检查数据库 URL 格式
- 验证密码中的特殊字符是否正确编码

**Error: "P1017: Server has closed the connection"**
- 启用 Supabase 连接池
- 使用 DIRECT_URL 环境变量

**Error: "Environment variable not found: DATABASE_URL"**
- 确认在 Vercel Dashboard 中设置了环境变量
- 重新部署应用

### 📝 最终检查清单

- [ ] Vercel 环境变量已设置
- [ ] DATABASE_URL 格式正确
- [ ] DIRECT_URL 已添加
- [ ] Supabase 项目运行正常
- [ ] 连接池已启用
- [ ] 应用已重新部署
- [ ] /api/test-db 端点返回成功

完成以上步骤后，你的 Vercel 部署应该能够正常连接 Supabase 数据库。

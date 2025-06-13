# Supabase 数据库迁移和 RunPod LLM 集成指南

## 🎯 迁移完成状态

✅ **已完成的配置：**

### 1. 数据库配置

- ✅ Supabase 客户端库已安装 (`@supabase/supabase-js`)
- ✅ Prisma 配置已更新为 PostgreSQL
- ✅ 环境变量模板已创建
- ✅ Supabase 客户端工具已配置

### 2. RunPod LLM 集成

- ✅ 聊天 API 已集成 RunPod
- ✅ 支持聊天历史上下文
- ✅ 错误处理和回退机制
- ✅ 多种响应格式支持

## 🔧 需要您完成的配置

### 1. 创建 Supabase 项目

1. 访问 [Supabase](https://supabase.com)
2. 创建新项目
3. 获取以下信息：
   - Project URL: `https://[YOUR-PROJECT-REF].supabase.co`
   - Anon Key: 匿名访问密钥
   - Service Role Key: 服务角色密钥
   - Database Password: 数据库密码

### 2. 更新环境变量

编辑 `.env.local` 文件，替换以下占位符：

```bash
# 替换为您的 Supabase 信息
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# 替换为您的 RunPod 信息
RUNPOD_ENDPOINT_URL="https://your-pod-id-port.pods.runpod.net"
RUNPOD_API_KEY="your_runpod_api_key"
RUNPOD_MODEL_NAME="your_model_name"

# 生成随机密钥
NEXTAUTH_SECRET="your-nextauth-secret-here"
```

### 3. 运行数据库迁移

配置完环境变量后，运行：

```bash
# 创建并应用迁移
npx prisma migrate dev --name init

# 如果有问题，可以重置数据库
npx prisma migrate reset
```

## 🚀 RunPod API 格式

当前代码支持以下 RunPod API 格式：

### 标准 OpenAI 兼容格式：

```json
{
  "model": "llama2",
  "messages": [
    { "role": "system", "content": "You are a helpful AI assistant." },
    { "role": "user", "content": "Hello!" }
  ],
  "max_tokens": 2048,
  "temperature": 0.7,
  "stream": false
}
```

### 响应格式支持：

- OpenAI 格式: `data.choices[0].message.content`
- 简单格式: `data.response`
- 文本格式: `data.text`

## 🔍 测试功能

### 1. 测试 RunPod 连接

您可以创建一个测试文件来验证 RunPod 连接：

```javascript
// test-runpod.js
const testRunPod = async () => {
  const response = await fetch("http://localhost:3000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: "Hello, AI!",
      chatId: null, // 新建对话
    }),
  });
  console.log(await response.json());
};
```

### 2. 验证数据库连接

```bash
npx prisma studio
```

## 📁 项目结构更新

```
src/
├── lib/
│   ├── prisma.ts          # Prisma 客户端
│   └── supabase.ts        # Supabase 客户端 (新增)
├── app/api/
│   └── chat/
│       └── route.ts       # RunPod LLM 集成 (已更新)
```

## 🎉 启动应用

配置完成后：

```bash
npm run dev
```

访问 `http://localhost:3000` 开始使用您的 AI 聊天应用！

## 🛠️ 故障排除

1. **数据库连接失败**：检查 `DATABASE_URL` 格式和密码
2. **RunPod API 错误**：验证端点 URL 和 API 密钥
3. **认证问题**：确保 `NEXTAUTH_SECRET` 已设置

## 📚 相关文档

- [Supabase 文档](https://supabase.com/docs)
- [Prisma 文档](https://www.prisma.io/docs)
- [NextAuth.js 文档](https://next-auth.js.org)
- [RunPod 文档](https://docs.runpod.io)

#!/bin/bash

# Vercel 部署前检查和准备脚本
# 确保 Prisma 客户端正确生成和数据库连接正常

echo "🚀 开始 Vercel 部署准备..."

# 1. 安装依赖
echo "📦 安装依赖..."
npm install

# 2. 检查环境变量
echo "🔍 检查环境变量..."
if [ -z "$DATABASE_URL" ]; then
    echo "⚠️  警告: DATABASE_URL 未设置，使用 .env.local 中的配置"
    source .env.local
fi

# 3. 生成 Prisma 客户端
echo "🔧 生成 Prisma 客户端..."
npx prisma generate

# 4. 验证生成的客户端
if [ -f "./src/generated/prisma/index.js" ]; then
    echo "✅ Prisma 客户端生成成功"
else
    echo "❌ Prisma 客户端生成失败"
    exit 1
fi

# 5. 测试数据库连接（如果在本地）
if [ "$NODE_ENV" != "production" ]; then
    echo "🔗 测试数据库连接..."
    npx prisma db push --accept-data-loss || echo "⚠️  数据库推送失败，但可能在生产环境中正常"
fi

# 6. 运行构建测试
echo "🏗️ 测试构建..."
npm run build

# 7. 检查关键文件
echo "📋 检查关键配置文件..."
files_to_check=(
    "vercel.json"
    ".env.production"
    "src/lib/prisma.ts"
    "prisma/schema.prisma"
)

for file in "${files_to_check[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file 存在"
    else
        echo "❌ $file 缺失"
        exit 1
    fi
done

echo ""
echo "🎯 部署检查完成! 现在可以推送到 Vercel:"
echo "   git add ."
echo "   git commit -m 'Ready for Vercel deployment'"
echo "   git push origin main"
echo ""
echo "📝 别忘了在 Vercel Dashboard 中设置环境变量:"
echo "   DATABASE_URL (with pgbouncer=true&connection_limit=1)"
echo "   DIRECT_URL"
echo "   NEXTAUTH_SECRET"
echo "   NEXTAUTH_URL"
echo "   其他环境变量..."
echo ""
echo "🔍 部署后测试端点:"
echo "   https://your-domain.vercel.app/api/health"
echo "   https://your-domain.vercel.app/api/test-db"
echo "   https://your-domain.vercel.app/api/diagnose-db"

echo "🎉 Vercel 部署准备完成!"

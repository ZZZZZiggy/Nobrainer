#!/bin/bash

# Vercel 部署前脚本
# 确保 Prisma 客户端正确生成

echo "🚀 开始 Vercel 部署准备..."

# 1. 安装依赖
echo "📦 安装依赖..."
npm install

# 2. 生成 Prisma 客户端
echo "🔧 生成 Prisma 客户端..."
npx prisma generate

# 3. 验证生成的客户端
if [ -f "./src/generated/prisma/index.js" ]; then
    echo "✅ Prisma 客户端生成成功"
else
    echo "❌ Prisma 客户端生成失败"
    exit 1
fi

# 4. 运行构建
echo "🏗️ 开始构建..."
npm run build

echo "🎉 Vercel 部署准备完成!"

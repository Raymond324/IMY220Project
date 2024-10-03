# 使用官方的 Node.js 作为基础镜像
FROM node:18-slim

# 创建工作目录
WORKDIR /usr/src/app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装所有依赖，包括开发依赖
RUN npm install

# 复制项目的所有文件到容器中
COPY . .

# 构建项目 (确保项目有 build 脚本)
RUN npm run build

# 删除开发依赖以减小镜像大小
RUN npm prune --production

# 设置环境变量，确保生产环境
ENV NODE_ENV=production

# 暴露端口
EXPOSE 3000

# 启动项目
CMD ["npm", "start"]

# 1단계: Build stage
FROM node:18-alpine AS build
WORKDIR /app

# 종속성 설치 (캐시 활용)
COPY package*.json ./
RUN npm install

# 실제 소스 복사 및 빌드
COPY . .
RUN npm run build

# 2단계: Nginx를 통한 정적 파일 서빙
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx 기본 설정 변경 시 여기에 추가 가능
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

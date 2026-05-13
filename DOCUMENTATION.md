# Asy-Syifaa Wal Mahmuudiyyah - Dokumentasi Setup & Deployment

## 📋 Table of Contents
1. [Deskripsi Proyek](#deskripsi-proyek)
2. [Requirements](#requirements)
3. [Setup Development](#setup-development)
4. [Setup Database](#setup-database)
5. [API Documentation](#api-documentation)
6. [Deployment](#deployment)
7. [Troubleshooting](#troubleshooting)

---

## 🎯 Deskripsi Proyek

**Asy-Syifaa Wal Mahmuudiyyah** adalah aplikasi perpustakaan digital modern dengan:
- Frontend PWA (Progressive Web App) menggunakan React
- Backend API menggunakan Node.js/Express
- Database MongoDB
- Storage untuk file PDF menggunakan Cloudinary atau local storage
- Authentication dengan JWT

### Fitur Utama:
✅ User authentication (WhatsApp + Password)
✅ Admin authentication (Username + Password)
✅ Display file PDF dalam grid/list view
✅ Search, filter kategori & tag
✅ PDF viewer dengan page navigation
✅ Bookmark functionality
✅ Admin panel untuk upload/edit/delete file
✅ Reading progress tracking
✅ Islamic theme dengan warna hijau jambrud
✅ Responsive design & PWA support

---

## 🔧 Requirements

### System Requirements:
- Node.js v16+ 
- MongoDB v5+
- npm atau yarn
- Git

### Browser Support:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## 🚀 Setup Development

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/asy-syifaa-library.git
cd asy-syifaa-library
```

### 2. Setup Backend

```bash
cd backend
cp .env.example .env
nano .env  # Edit konfigurasi sesuai kebutuhan

npm install
npm run dev
```

Backend akan berjalan di `http://localhost:5000`

### 3. Setup Frontend

```bash
cd frontend
npm install

# Development mode
npm start

# Production build
npm run build
```

Frontend akan berjalan di `http://localhost:3000`

---

## 🗄️ Setup Database

### MongoDB Setup

#### Local Development:
```bash
# Install MongoDB Community Edition
# macOS
brew tap mongodb/brew
brew install mongodb-community

# Ubuntu/Debian
curl -fsSL https://www.mongodb.org/static/pgp/server-5.0.asc | apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-5.0.list
apt-get update
apt-get install -y mongodb-org

# Start MongoDB
mongod

# Windows - gunakan installer resmi
```

#### MongoDB Atlas (Cloud):
1. Buat akun di https://www.mongodb.com/cloud/atlas
2. Create new cluster
3. Dapatkan connection string
4. Update di `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/asy-syifaa-library
```

### Database Seeding

```bash
cd backend
npm run seed
```

Script ini akan:
- Create admin user (username: admin, password: bismillah)
- Create sample categories (Tafsir, Hadits, Fiqih, Aqidah)
- Create sample files

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Routes

#### User Login
```http
POST /auth/user-login
Content-Type: application/json

{
  "phone": "+62812345678",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "Login berhasil",
  "data": {
    "token": "eyJhbGc...",
    "user": {
      "id": "...",
      "phone": "+62812345678",
      "name": "John Doe"
    }
  }
}
```

#### Admin Login
```http
POST /auth/admin-login
Content-Type: application/json

{
  "username": "admin",
  "password": "bismillah"
}

Response:
{
  "success": true,
  "data": {
    "token": "eyJhbGc...",
    "admin": { ... }
  }
}
```

### File Routes

#### Get All Files
```http
GET /files?category=tafsir&search=quran&sort=newest
Authorization: Bearer {token}

Query Parameters:
- category: filter by category ID
- search: search query
- tags: comma-separated tags
- sort: newest, oldest, popular
- page: pagination
- limit: items per page

Response:
{
  "success": true,
  "data": [
    {
      "id": "...",
      "title": "Tafsir Al-Qur'an Al-Azim",
      "author": "Ibn Katsir",
      "category": { "id": "...", "name": "Tafsir" },
      "description": "...",
      "fileUrl": "https://...",
      "pages": 450,
      "tags": ["tafsir", "quran"],
      "views": 1250,
      "downloads": 320
    }
  ]
}
```

#### Get File Detail
```http
GET /files/:fileId
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "id": "...",
    "title": "...",
    "author": "...",
    "category": { ... },
    "description": "...",
    "fileUrl": "...",
    "pages": 450,
    "publishDate": "2024-01-15T00:00:00Z",
    "views": 1250,
    "downloads": 320,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### View File (increment views)
```http
POST /files/:fileId/view
Authorization: Bearer {token}

Response: { "success": true, "views": 1251 }
```

#### Download File (increment downloads)
```http
POST /files/:fileId/download
Authorization: Bearer {token}

Response: { "success": true, "downloads": 321 }
```

### Admin File Management

#### Upload File
```http
POST /admin/files/upload
Authorization: Bearer {admin_token}
Content-Type: multipart/form-data

{
  "title": "Tafsir Surah Al-Baqarah",
  "author": "Ibn Katsir",
  "description": "...",
  "category": "category_id",
  "tags": "tafsir,quran,surah",
  "file": <binary PDF file>,
  "publishDate": "2024-01-15"
}

Response:
{
  "success": true,
  "data": {
    "id": "...",
    "title": "...",
    "fileUrl": "...",
    "fileSize": 5242880,
    "pages": 150
  }
}
```

#### Update File
```http
PUT /admin/files/:fileId
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description",
  "category": "new_category_id",
  "tags": "updated,tags"
}

Response: { "success": true, "data": { ... } }
```

#### Delete File
```http
DELETE /admin/files/:fileId
Authorization: Bearer {admin_token}

Response: { "success": true, "message": "File deleted" }
```

#### Hide/Unhide File
```http
PATCH /admin/files/:fileId/hide
Authorization: Bearer {admin_token}
Content-Type: application/json

{ "isHidden": true }

Response: { "success": true, "data": { ... } }
```

### Bookmark Routes

#### Get User Bookmarks
```http
GET /bookmarks
Authorization: Bearer {user_token}

Response:
{
  "success": true,
  "data": [
    {
      "id": "...",
      "file": { "id": "...", "title": "..." },
      "page": 45,
      "note": "Important section",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

#### Add Bookmark
```http
POST /bookmarks
Authorization: Bearer {user_token}
Content-Type: application/json

{
  "file": "file_id",
  "page": 45,
  "note": "Important section about tawhid"
}

Response: { "success": true, "data": { ... } }
```

#### Remove Bookmark
```http
DELETE /bookmarks/:fileId
Authorization: Bearer {user_token}

Response: { "success": true, "message": "Bookmark removed" }
```

### Reading Progress Routes

#### Get Reading Progress
```http
GET /reading-progress/:fileId
Authorization: Bearer {user_token}

Response:
{
  "success": true,
  "data": {
    "file": "file_id",
    "currentPage": 45,
    "progress": 30,
    "lastReadAt": "2024-01-15T10:30:00Z"
  }
}
```

#### Save Reading Progress
```http
POST /reading-progress
Authorization: Bearer {user_token}
Content-Type: application/json

{
  "file": "file_id",
  "currentPage": 45,
  "progress": 30
}

Response: { "success": true, "data": { ... } }
```

### Category Routes

#### Get All Categories
```http
GET /categories

Response:
{
  "success": true,
  "data": [
    {
      "id": "...",
      "name": "Tafsir",
      "slug": "tafsir",
      "description": "Tafsir Al-Qur'an",
      "icon": "📖",
      "color": "#10b981",
      "order": 1
    }
  ]
}
```

---

## 🔐 Authentication

### JWT Token
Token akan di-return saat login dan harus disertakan di setiap request:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Token Expiration
Default: 7 hari (dapat diubah di `.env`)

### Refresh Token
Untuk refresh token yang sudah expired, user perlu login ulang.

---

## 🚀 Deployment

### Deploy ke Heroku

```bash
# Install Heroku CLI
curl https://cli-assets.heroku.com/install.sh | sh

# Login
heroku login

# Create app
heroku create asy-syifaa-library

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI="..."
heroku config:set JWT_SECRET="your-secret-key"
heroku config:set CLOUDINARY_CLOUD_NAME="..."

# Push ke Heroku
git push heroku main
```

### Deploy ke Vercel (Frontend)

```bash
# Install Vercel CLI
npm install -g vercel

# Login dan deploy
vercel

# Set environment variables di Vercel dashboard
# REACT_APP_API_URL=https://your-backend.herokuapp.com
```

### Deploy ke AWS (Full Stack)

1. **EC2 untuk Backend:**
   - Create EC2 instance (Ubuntu 20.04)
   - SSH ke instance
   - Clone repo
   - Install Node.js, MongoDB
   - Setup environment variables
   - PM2 untuk process management

2. **S3 untuk File Storage:**
   ```bash
   # Upload folder ke S3
   aws s3 cp ./uploads s3://your-bucket-name --recursive
   ```

3. **CloudFront untuk CDN:**
   - Create distribution pointing to S3
   - Update file URLs di database

### Docker Deployment

```dockerfile
# Dockerfile - Backend
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV NODE_ENV=production
EXPOSE 5000
CMD ["npm", "start"]

# Dockerfile - Frontend
FROM node:16-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
# Docker Compose
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb://mongo:27017/asy-syifaa
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - mongo
    restart: always

  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    restart: always

  mongo:
    image: mongo:5.0
    volumes:
      - mongo_data:/data/db
    restart: always

volumes:
  mongo_data:
```

Deploy dengan: `docker-compose up -d`

---

## 🐛 Troubleshooting

### Backend Issues

#### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:**
- Pastikan MongoDB sudah running: `mongod`
- Check connection string di `.env`
- Untuk Atlas, pastikan IP whitelist sudah ditambah

#### JWT Token Invalid
```
Error: Invalid Token
```
**Solution:**
- Token sudah expired → user harus login ulang
- Check `JWT_SECRET` di `.env` sudah consistent
- Verify token format di request header

#### File Upload Failed
```
Error: File too large
```
**Solution:**
- Increase `MAX_FILE_SIZE` di `.env`
- Default: 50MB (52428800 bytes)
- Update di middleware multer

### Frontend Issues

#### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:**
- Check `CORS_ORIGIN` di backend `.env`
- Pastikan frontend URL sudah ditambah
- Restart backend setelah update

#### PDF Viewer Not Loading
```
Error: Failed to load PDF
```
**Solution:**
- Check file URL valid
- Verify file format adalah PDF
- Check fileUrl di database sudah correct

#### PWA Not Installing
```
No install prompt
```
**Solution:**
- Pastikan HTTPS enabled (production)
- Check manifest.json valid
- Service worker registered dengan benar
- Minimum 30 detik user engagement

---

## 📱 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
BASE_URL=http://localhost:5000

MONGODB_URI=mongodb://localhost:27017/asy-syifaa-library
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRE=7d

CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

ADMIN_USERNAME=admin
ADMIN_PASSWORD=bismillah
ADMIN_EMAIL=admin@asy-syifaa.com

MAX_FILE_SIZE=52428800
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENVIRONMENT=development
```

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Mongoose ODM](https://mongoosejs.com)
- [PDF.js Documentation](https://mozilla.github.io/pdf.js)
- [React Router v6](https://reactrouter.com)
- [Zustand Store](https://github.com/pmndrs/zustand)

---

## 📝 License

MIT License - Feel free to use for personal/commercial projects

---

## 📧 Support

Untuk pertanyaan atau issues:
- Create GitHub issue
- Email: support@asy-syifaa.com
- WhatsApp: +62-812-3456-7890

---

**Last Updated:** January 2024
**Version:** 1.0.0

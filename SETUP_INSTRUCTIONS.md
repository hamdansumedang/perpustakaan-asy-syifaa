# backend/.env
PORT=5000
NODE_ENV=development
BASE_URL=http://localhost:5000
MONGODB_URI=mongodb://localhost:27017/asy-syifaa-library
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-$(date +%s)
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=optional
CLOUDINARY_API_KEY=optional
CLOUDINARY_API_SECRET=optional
ADMIN_USERNAME=admin
ADMIN_PASSWORD=bismillah
ADMIN_EMAIL=admin@asy-syifaa.com
MAX_FILE_SIZE=52428880
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
UPLOAD_FOLDER=./uploads

---

# frontend/.env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENVIRONMENT=development

---

# SETUP_INSTRUCTIONS.md
# 🚀 SETUP INSTRUCTIONS - Asy-Syifaa Digital Library

## Prerequisites

Sebelum memulai, pastikan Anda sudah install:
- Node.js v16+ (dari nodejs.org)
- MongoDB (local atau MongoDB Atlas account)
- Git (dari git-scm.com)
- npm atau yarn package manager

## Step-by-Step Setup

### 1. Extract Project Files
```bash
# Extract zip file
unzip asy-syifaa-library.zip
cd asy-syifaa-library
```

### 2. Setup MongoDB

#### Option A: Local MongoDB
```bash
# macOS dengan Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Ubuntu/Debian
sudo apt-get install -y mongodb
sudo systemctl start mongodb

# Windows
# Download dari: https://www.mongodb.com/try/download/community
# Jalankan installer
```

#### Option B: MongoDB Atlas (Cloud)
```
1. Buka https://www.mongodb.com/cloud/atlas
2. Create account
3. Create new project
4. Create cluster
5. Create database user
6. Get connection string
7. Copy ke backend/.env MONGODB_URI
```

### 3. Setup Backend

```bash
cd backend

# Copy environment file
cp .env.example .env

# Install dependencies
npm install

# Initialize database dengan sample data
npm run seed

# Start development server
npm run dev
```

✅ Backend running di `http://localhost:5000`

**Test dengan curl:**
```bash
curl http://localhost:5000/api/categories
```

### 4. Setup Frontend

```bash
cd ../frontend

# Install dependencies
npm install

# Start development server
npm start
```

✅ Frontend running di `http://localhost:3000`

### 5. Login & Test

**Admin Account:**
- Username: `admin`
- Password: `bismillah`

**Test User Account:**
- Phone: `+62812345678`
- Password: `user123456`

## Features to Test

### User Features
- [ ] Login dengan phone + password
- [ ] Browse file dalam grid view
- [ ] Switch ke list view
- [ ] Search file by title
- [ ] Filter by category
- [ ] View file detail
- [ ] Read PDF page by page
- [ ] Add/remove bookmark
- [ ] View bookmarks

### Admin Features
- [ ] Login dengan username/password
- [ ] Upload PDF file
- [ ] Edit file metadata
- [ ] Delete file
- [ ] Hide/show file
- [ ] View statistics

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Ensure MongoDB is running
```bash
mongod  # Local MongoDB
# or check MongoDB Atlas connection string
```

### CORS Error
```
Access to XMLHttpRequest blocked by CORS
```
**Solution:** Restart backend
```bash
npm run dev  # dalam folder backend
```

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Dependencies Error
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules
rm -rf node_modules
npm install
```

## Development Commands

### Backend
```bash
npm run dev          # Development dengan auto-reload
npm start            # Production mode
npm test             # Run tests
npm run seed         # Initialize database
```

### Frontend
```bash
npm start            # Development server
npm run build        # Build untuk production
npm test             # Run tests
```

## Docker Alternative

Jika prefer menggunakan Docker:
```bash
docker-compose up -d

# Seeding database
docker-compose exec backend npm run seed

# View logs
docker-compose logs -f
```

## Next Steps

1. ✅ Setup selesai
2. Test semua features
3. Customize branding (warna, logo)
4. Add your own PDF files
5. Setup file storage (Cloudinary)
6. Deploy ke production

## Helpful Resources

- API Documentation: DOCUMENTATION.md
- Database Schema: DATABASE_SCHEMA.md
- Deployment Guide: DEPLOYMENT_GUIDE.md
- Project Summary: PROJECT_SUMMARY.md

## Support

Jika ada error:
1. Check DOCUMENTATION.md troubleshooting section
2. Check browser console (F12)
3. Check terminal/console logs
4. Verify ports 3000 & 5000 not in use
5. Verify MongoDB running

---

## Quick Command Reference

```bash
# Terminal 1: Backend
cd backend
npm install
npm run seed
npm run dev

# Terminal 2: Frontend
cd frontend
npm install
npm start

# Browser
http://localhost:3000
```

---

Good luck! 🚀 Happy coding!

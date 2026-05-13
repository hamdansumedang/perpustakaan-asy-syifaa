# 📚 Asy-Syifaa Wal Mahmuudiyyah - Perpustakaan Digital Islam

Aplikasi web perpustakaan digital modern untuk koleksi buku-buku Islam dengan interface yang beautiful, user-friendly, dan PWA-enabled.

## ✨ Features

- 👤 **User Authentication** - Login dengan nomor WhatsApp + password
- 🔐 **Admin Panel** - Upload, edit, delete file PDF dengan mudah
- 📄 **PDF Viewer** - Baca PDF lembar demi lembar dengan navigation
- 🔍 **Smart Search** - Cari berdasarkan judul, penulis, kategori, tag
- 🏷️ **Filter & Categories** - Filter berdasarkan kategori dan tag
- ⭐ **Bookmark** - Tandai file favorit dan akses dengan cepat
- 📊 **Reading Progress** - Tracking posisi pembacaan otomatis
- 📱 **PWA** - Install sebagai aplikasi di smartphone
- 🎨 **Islamic Theme** - Desain dengan warna hijau jambrud yang elegan
- 📱 **Responsive** - Bekerja sempurna di desktop, tablet, dan mobile
- ⚡ **Fast** - Optimized loading dengan caching strategy
- 🌙 **Dark Mode** - Support dark mode untuk kenyamanan mata

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- MongoDB v5+ atau MongoDB Atlas
- npm atau yarn

### 1. Setup Backend

```bash
cd backend
cp .env.example .env

# Edit .env dengan konfigurasi Anda
nano .env

npm install
npm run dev
```

Backend akan running di `http://localhost:5000`

### 2. Setup Frontend

```bash
cd frontend
npm install
npm start
```

Frontend akan running di `http://localhost:3000`

### 3. Database Seeding

```bash
cd backend
npm run seed
```

Ini akan membuat:
- Admin user (username: `admin`, password: `bismillah`)
- Sample categories
- Sample files

### 4. Login

**User:**
- Phone: Gunakan nomor valid (format +62...)
- Password: Bebas (untuk testing)

**Admin:**
- Username: `admin`
- Password: `bismillah`

## 📁 Project Structure

```
asy-syifaa-digital-library/
├── backend/                 # Node.js/Express API
│   ├── models.js           # Database schemas
│   ├── middleware.js       # Auth & utilities
│   ├── server.js           # Main server file
│   ├── package.json        # Dependencies
│   └── .env.example        # Environment template
│
├── frontend/               # React PWA
│   ├── public/            # Static files
│   ├── src/
│   │   ├── store/         # Zustand state management
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── styles/        # CSS & theme
│   │   └── App.jsx        # Main app
│   ├── package.json       # Dependencies
│   └── tailwind.config.js # Tailwind configuration
│
├── docs/                  # Documentation
├── DOCUMENTATION.md       # Detailed docs
└── README.md             # This file
```

## 🎨 Design & Theming

### Color Palette
- **Primary:** Hijau Jambrud (#10b981)
- **Primary Dark:** #047857
- **Light:** #d1fae5
- **Background:** #f8fafc
- **Text:** #1e293b

### Typography
- **Font:** Roboto
- **Headings:** 500 weight
- **Body:** 400 weight

### Icons
- Outline style icons (Tabler Icons)
- 24px untuk decorative, 16px untuk inline

## 📡 API Endpoints

### User Authentication
- `POST /api/auth/user-login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### Admin Authentication
- `POST /api/auth/admin-login` - Admin login
- `GET /api/auth/admin/me` - Get current admin

### Files
- `GET /api/files` - Get all files
- `GET /api/files/:id` - Get file detail
- `POST /api/files/:id/view` - Track view
- `POST /api/files/:id/download` - Track download

### Admin Files
- `POST /api/admin/files/upload` - Upload file
- `PUT /api/admin/files/:id` - Update file
- `DELETE /api/admin/files/:id` - Delete file
- `PATCH /api/admin/files/:id/hide` - Hide/Show file

### Bookmarks
- `GET /api/bookmarks` - Get user bookmarks
- `POST /api/bookmarks` - Add bookmark
- `DELETE /api/bookmarks/:fileId` - Remove bookmark

### Reading Progress
- `GET /api/reading-progress/:fileId` - Get progress
- `POST /api/reading-progress` - Save progress

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/admin/categories` - Create category
- `PUT /api/admin/categories/:id` - Update category
- `DELETE /api/admin/categories/:id` - Delete category

Lihat [DOCUMENTATION.md](./DOCUMENTATION.md) untuk API details lengkap.

## 🚀 Deployment

### Heroku
```bash
heroku create asy-syifaa-library
heroku config:set MONGODB_URI="..."
git push heroku main
```

### Vercel (Frontend)
```bash
vercel
# Set REACT_APP_API_URL di environment variables
```

### Docker
```bash
docker-compose up -d
```

Lihat [DOCUMENTATION.md](./DOCUMENTATION.md) untuk detail deployment.

## 🛠️ Technologies

### Backend
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT
- **File Upload:** Multer, Cloudinary
- **API Validation:** Express Validator

### Frontend
- **Framework:** React 18
- **State Management:** Zustand
- **Styling:** Tailwind CSS
- **PDF Viewer:** react-pdf
- **HTTP Client:** Axios
- **Router:** React Router v6
- **Icons:** Lucide React / Tabler Icons

### DevOps
- **Server:** Node.js
- **Database:** MongoDB Atlas
- **Storage:** Cloudinary / AWS S3
- **Deployment:** Heroku, Vercel, AWS, Docker

## 📦 File Upload

### Local Storage
File disimpan di `/backend/uploads`

### Cloudinary (Recommended)
1. Create account di https://cloudinary.com
2. Dapatkan credentials
3. Update di `.env`

### AWS S3
1. Create S3 bucket
2. Setup IAM credentials
3. Update di `.env`

## 🔒 Security

- ✅ JWT Token authentication
- ✅ Password hashing dengan bcryptjs
- ✅ CORS protection
- ✅ Helmet.js untuk security headers
- ✅ Input validation & sanitization
- ✅ Rate limiting
- ✅ HTTPS recommended

## 📱 PWA Features

- ✅ Install to home screen
- ✅ Offline support dengan Service Workers
- ✅ Push notifications
- ✅ Fast loading
- ✅ App-like experience

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED
```
**Solution:** Pastikan MongoDB sudah running atau gunakan MongoDB Atlas

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:** Update `CORS_ORIGIN` di `.env` backend

### PDF Not Loading
```
Error: Failed to load PDF
```
**Solution:** Verify file URL dan format PDF valid

Lihat [DOCUMENTATION.md](./DOCUMENTATION.md) untuk troubleshooting lengkap.

## 📝 Environment Variables

### Backend
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/asy-syifaa
JWT_SECRET=your-secret-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-key
CLOUDINARY_API_SECRET=your-secret
```

### Frontend
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🤝 Contributing

Pull requests welcome! Untuk perubahan besar, buka issue dulu untuk diskusi.

## 📄 License

MIT License - Silakan gunakan untuk project pribadi atau komersial

## 📧 Support

- Email: support@asy-syifaa.com
- WhatsApp: +62-812-3456-7890
- GitHub Issues: Create issue di repo ini

## 🎯 Roadmap

- [ ] Multi-language support (English, Arabic)
- [ ] Advanced search with NLP
- [ ] Community comments & discussions
- [ ] Social sharing
- [ ] Reading statistics & insights
- [ ] Mobile app (React Native)
- [ ] Audio version dengan TTS
- [ ] Integration dengan Islamic APIs

---

Made with ❤️ untuk perpustakaan digital Islam

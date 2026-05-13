# 🗄️ DATABASE SCHEMA - Asy-Syifaa Digital Library

## ER (Entity Relationship) Diagram

```
┌─────────────────────┐
│      ADMIN          │
├─────────────────────┤
│ _id (PK)            │
│ username (unique)   │
│ password (hashed)   │
│ email (unique)      │
│ name                │
│ role                │
│ permissions         │
│ isActive            │
│ lastLogin           │
│ createdAt           │
│ updatedAt           │
└──────────┬──────────┘
           │
           │ (1:N)
           ▼
┌─────────────────────────────────┐
│          FILE                   │
├─────────────────────────────────┤
│ _id (PK)                        │
│ title                           │
│ description                     │
│ author                          │
│ category_id (FK → CATEGORY)     │
│ tags []                         │
│ fileUrl                         │
│ fileName                        │
│ fileSize                        │
│ pages                           │
│ thumbnail                       │
│ coverImage                      │
│ publishDate                     │
│ language                        │
│ isPublished                     │
│ isHidden                        │
│ views                           │
│ downloads                       │
│ uploadedBy_id (FK → ADMIN)      │
│ createdAt                       │
│ updatedAt                       │
└────────────┬────────────────────┘
             │
          (1:N)
             │
┌────────────┴─────────────────────┐
│          CATEGORY                │
├──────────────────────────────────┤
│ _id (PK)                         │
│ name (unique)                    │
│ slug (unique)                    │
│ description                      │
│ icon                             │
│ color                            │
│ order                            │
│ createdAt                        │
└──────────────────────────────────┘


┌─────────────────────────────────────┐
│          USER                       │
├─────────────────────────────────────┤
│ _id (PK)                            │
│ phone (unique)                      │
│ password (hashed)                   │
│ name                                │
│ email                               │
│ isActive                            │
│ lastLogin                           │
│ createdAt                           │
│ updatedAt                           │
└──────────────┬──────────────────────┘
               │
         (1:N) │
               ▼
    ┌──────────────────────────┐
    │     BOOKMARK             │
    ├──────────────────────────┤
    │ _id (PK)                 │
    │ user_id (FK → USER)      │
    │ file_id (FK → FILE)      │
    │ page                     │
    │ note                     │
    │ createdAt                │
    │ (Unique: user_id+file_id)│
    └──────────────────────────┘

               │
         (1:N) │
               ▼
    ┌──────────────────────────────┐
    │   READING_PROGRESS           │
    ├──────────────────────────────┤
    │ _id (PK)                     │
    │ user_id (FK → USER)          │
    │ file_id (FK → FILE)          │
    │ currentPage                  │
    │ progress (%)                 │
    │ lastReadAt                   │
    │ (Unique: user_id+file_id)    │
    └──────────────────────────────┘


┌────────────────────────────────────┐
│     ACTIVITY_LOG                   │
├────────────────────────────────────┤
│ _id (PK)                           │
│ userId (FK → USER)                 │
│ adminId (FK → ADMIN)               │
│ action (enum)                      │
│ fileId (FK → FILE)                 │
│ ipAddress                          │
│ userAgent                          │
│ createdAt (TTL: 30 days)           │
└────────────────────────────────────┘
```

---

## Collection Schema Details

### ADMIN
```javascript
{
  _id: ObjectId,
  username: String,              // unique, required
  password: String,              // hashed, required
  email: String,                 // unique, required
  name: String,
  role: 'super_admin' | 'editor', // default: 'editor'
  permissions: {
    canUpload: Boolean,          // default: true
    canEdit: Boolean,            // default: true
    canDelete: Boolean,          // default: true
    canManageUsers: Boolean,     // default: false
    canManageAdmins: Boolean     // default: false
  },
  isActive: Boolean,             // default: true
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### USER
```javascript
{
  _id: ObjectId,
  phone: String,                 // unique, required, pattern: /^(\+62|62|0)[0-9]{9,12}$/
  password: String,              // hashed, required
  name: String,
  email: String,
  isActive: Boolean,             // default: true
  lastLogin: Date,
  createdAt: Date,               // default: now
  updatedAt: Date                // default: now
}
```

### CATEGORY
```javascript
{
  _id: ObjectId,
  name: String,                  // unique, required
  slug: String,                  // unique, required
  description: String,
  icon: String,                  // emoji or icon name
  color: String,                 // hex color
  order: Number,                 // for sorting
  createdAt: Date
}
```

### FILE
```javascript
{
  _id: ObjectId,
  title: String,                 // required
  description: String,
  author: String,
  category: ObjectId,            // ref: Category, required
  tags: [String],                // lowercase
  fileUrl: String,               // required
  fileName: String,              // required
  fileSize: Number,              // bytes
  pages: Number,
  thumbnail: String,             // URL
  coverImage: String,            // URL
  publishDate: Date,
  language: String,              // ISO 639-1 code (id, en, ar)
  isPublished: Boolean,          // default: true
  isHidden: Boolean,             // default: false
  views: Number,                 // default: 0
  downloads: Number,             // default: 0
  uploadedBy: ObjectId,          // ref: Admin, required
  createdAt: Date,               // default: now
  updatedAt: Date                // default: now
  
  // Indexes
  // text index: title, description, author, tags
  // compound index: category, isPublished, isHidden
}
```

### BOOKMARK
```javascript
{
  _id: ObjectId,
  user: ObjectId,                // ref: User, required
  file: ObjectId,                // ref: File, required
  page: Number,                  // default: 1
  note: String,
  createdAt: Date                // default: now
  
  // Unique index: (user, file)
}
```

### READING_PROGRESS
```javascript
{
  _id: ObjectId,
  user: ObjectId,                // ref: User, required
  file: ObjectId,                // ref: File, required
  currentPage: Number,           // default: 1
  lastReadAt: Date,              // default: now
  progress: Number               // percentage, default: 0
  
  // Unique index: (user, file)
}
```

### ACTIVITY_LOG
```javascript
{
  _id: ObjectId,
  userId: ObjectId,              // ref: User
  adminId: ObjectId,             // ref: Admin
  action: String,                // enum: login, logout, view_file, download_file, bookmark, upload, edit, delete
  fileId: ObjectId,              // ref: File
  ipAddress: String,
  userAgent: String,
  createdAt: Date                // default: now, TTL: 30 days
}
```

---

## Database Indexes

```javascript
// FILE
db.files.createIndex({ title: "text", description: "text", author: "text", tags: "text" });
db.files.createIndex({ category: 1, isPublished: 1, isHidden: 1 });

// BOOKMARK
db.bookmarks.createIndex({ user: 1, file: 1 }, { unique: true });

// READING_PROGRESS
db.readingprogresses.createIndex({ user: 1, file: 1 }, { unique: true });

// ADMIN
db.admins.createIndex({ username: 1 }, { unique: true });
db.admins.createIndex({ email: 1 }, { unique: true });

// USER
db.users.createIndex({ phone: 1 }, { unique: true });

// CATEGORY
db.categories.createIndex({ name: 1 }, { unique: true });
db.categories.createIndex({ slug: 1 }, { unique: true });

// ACTIVITY_LOG
db.activitylogs.createIndex({ createdAt: 1 }, { expireAfterSeconds: 2592000 });
```

---

## Project File Structure

```
asy-syifaa-digital-library/
│
├── 📄 README.md
├── 📄 DOCUMENTATION.md
├── 📄 docker-compose.yml
├── 📄 Dockerfiles.txt
│
├── 📁 backend/
│   ├── 📄 server.js              # Main Express server
│   ├── 📄 models.js              # Mongoose schemas & models
│   ├── 📄 middleware.js          # Auth & response utilities
│   ├── 📄 package.json           # Dependencies
│   ├── 📄 .env.example           # Environment template
│   ├── 📄 Dockerfile             # Docker configuration
│   │
│   ├── 📁 middleware/
│   │   ├── auth.js               # User authentication
│   │   └── adminAuth.js          # Admin authentication
│   │
│   ├── 📁 routes/
│   │   ├── 📁 auth/
│   │   │   ├── userLogin.js
│   │   │   ├── userRegister.js
│   │   │   ├── adminLogin.js
│   │   │   ├── logout.js
│   │   │   ├── getMe.js
│   │   │   └── getAdminMe.js
│   │   │
│   │   ├── 📁 files/
│   │   │   ├── getFiles.js
│   │   │   ├── getFileDetail.js
│   │   │   ├── searchFiles.js
│   │   │   ├── viewFile.js
│   │   │   └── downloadFile.js
│   │   │
│   │   ├── 📁 admin/
│   │   │   ├── uploadFile.js
│   │   │   ├── updateFile.js
│   │   │   ├── deleteFile.js
│   │   │   ├── hideFile.js
│   │   │   ├── getAllFiles.js
│   │   │   ├── getStats.js
│   │   │   ├── createCategory.js
│   │   │   ├── updateCategory.js
│   │   │   └── deleteCategory.js
│   │   │
│   │   ├── 📁 bookmarks/
│   │   │   ├── getBookmarks.js
│   │   │   ├── addBookmark.js
│   │   │   ├── removeBookmark.js
│   │   │   └── updateBookmark.js
│   │   │
│   │   ├── 📁 reading/
│   │   │   ├── getProgress.js
│   │   │   └── saveProgress.js
│   │   │
│   │   ├── 📁 categories/
│   │   │   └── getCategories.js
│   │   │
│   │   └── 📁 stats/
│   │       └── getPublicStats.js
│   │
│   ├── 📁 utils/
│   │   ├── generateToken.js
│   │   ├── response.js
│   │   └── validators.js
│   │
│   ├── 📁 config/
│   │   ├── database.js
│   │   └── cloudinary.js
│   │
│   ├── 📁 scripts/
│   │   └── seedData.js           # Database initialization
│   │
│   └── 📁 uploads/               # Local file storage
│
├── 📁 frontend/
│   ├── 📄 package.json           # Dependencies
│   ├── 📄 .env                   # Environment variables
│   ├── 📄 Dockerfile             # Docker configuration
│   ├── 📄 nginx.conf             # Nginx configuration
│   ├── 📄 tailwind.config.js     # Tailwind CSS config
│   │
│   ├── 📁 public/
│   │   ├── index.html
│   │   ├── manifest.json         # PWA manifest
│   │   ├── service-worker.js     # Service worker
│   │   │
│   │   └── 📁 images/
│   │       ├── icon-192x192.png
│   │       ├── icon-512x512.png
│   │       ├── icon-maskable.png
│   │       ├── favicon.ico
│   │       └── logo.svg
│   │
│   └── 📁 src/
│       ├── 📄 index.js           # React entry point
│       ├── 📄 App.jsx            # Main App component
│       │
│       ├── 📁 store/
│       │   └── useStore.js       # Zustand global state
│       │
│       ├── 📁 components/
│       │   ├── Header.jsx
│       │   ├── Sidebar.jsx
│       │   ├── FileGrid.jsx
│       │   ├── FileList.jsx
│       │   ├── PDFViewer.jsx
│       │   ├── LoginForm.jsx
│       │   ├── AdminPanel.jsx
│       │   └── FileUploader.jsx
│       │
│       ├── 📁 pages/
│       │   ├── HomePage.jsx
│       │   ├── LoginPage.jsx
│       │   ├── AdminPage.jsx
│       │   ├── DetailPage.jsx
│       │   └── NotFoundPage.jsx
│       │
│       ├── 📁 hooks/
│       │   ├── useAuth.js
│       │   ├── useFetch.js
│       │   └── useLocalStorage.js
│       │
│       ├── 📁 styles/
│       │   ├── globals.css
│       │   ├── theme.js
│       │   └── animations.css
│       │
│       ├── 📁 utils/
│       │   ├── api.js            # Axios instance
│       │   ├── formatters.js
│       │   ├── validators.js
│       │   └── storage.js
│       │
│       └── 📁 assets/
│           ├── 📁 icons/
│           ├── 📁 fonts/
│           └── 📁 images/
│
└── 📁 docs/
    ├── 📄 API.md
    ├── 📄 DEPLOYMENT.md
    ├── 📄 DATABASE.md
    ├── 📄 ARCHITECTURE.md
    └── 📄 CONTRIBUTING.md
```

---

## Data Migration Checklist

- [ ] Backup existing database
- [ ] Update schema version
- [ ] Run migration script
- [ ] Verify data integrity
- [ ] Update API version
- [ ] Deploy backend
- [ ] Update frontend
- [ ] Test all features
- [ ] Monitor error logs

---

## Performance Optimization

### Database Queries
- ✅ Use indexes for frequently searched fields
- ✅ Implement pagination for file lists
- ✅ Use projections to limit returned fields
- ✅ Enable query caching where possible

### Caching Strategy
- ✅ Cache categories (TTL: 1 hour)
- ✅ Cache popular files (TTL: 2 hours)
- ✅ Cache search results (TTL: 30 minutes)
- ✅ Cache user bookmarks (client-side)

### File Storage
- ✅ Use CDN for PDF delivery
- ✅ Compress PDFs before storage
- ✅ Generate thumbnails for preview
- ✅ Implement lazy loading for images

---

## Backup & Recovery

### Automated Backups
```bash
# Backup MongoDB
mongodump --uri mongodb://localhost:27017/asy-syifaa-library --out ./backup

# Schedule with cron (every day at 2 AM)
0 2 * * * mongodump --uri $MONGODB_URI --out /backups/asy-syifaa-$(date +\%Y\%m\%d)
```

### Recovery Procedure
```bash
# Restore from backup
mongorestore --uri mongodb://localhost:27017/asy-syifaa-library ./backup/asy-syifaa-library
```

---

**Last Updated:** January 2024

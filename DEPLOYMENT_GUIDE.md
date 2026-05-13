# 🚀 DEPLOYMENT CHECKLIST & TESTING GUIDE

## Pre-Development Setup

### ✅ Initial Setup Checklist
- [ ] Fork/Clone repository
- [ ] Create `.env` file dari `.env.example`
- [ ] Install Node.js v16+ dan npm
- [ ] Install MongoDB atau create MongoDB Atlas account
- [ ] Setup Git dan SSH keys
- [ ] Create GitHub Personal Access Token (untuk CI/CD)

### ✅ Backend Setup
```bash
cd backend
npm install
npm run seed  # Initialize database
npm run dev   # Start development server
```
- [ ] Server running di http://localhost:5000
- [ ] MongoDB connected
- [ ] Admin user created (admin / bismillah)
- [ ] Sample data seeded

### ✅ Frontend Setup
```bash
cd frontend
npm install
npm start  # Start development server
```
- [ ] App running di http://localhost:3000
- [ ] Can login dengan admin / bismillah
- [ ] API calls working
- [ ] No console errors

---

## Testing Checklist

### 🧪 Unit Testing

#### Backend
```bash
npm test -- --coverage
```
- [ ] All models tested
- [ ] All middleware tested
- [ ] All routes tested
- [ ] Coverage >80%

#### Frontend
```bash
npm test -- --coverage
```
- [ ] All components tested
- [ ] All hooks tested
- [ ] All store actions tested
- [ ] Coverage >80%

### 🔗 Integration Testing

#### Authentication Flow
- [ ] User registration works
- [ ] User login works
- [ ] Admin login works
- [ ] JWT token generated correctly
- [ ] Token validation works
- [ ] Logout clears token

#### File Management
- [ ] Admin can upload PDF
- [ ] File appears in list
- [ ] User can view file detail
- [ ] User can view file pages
- [ ] View counter increments
- [ ] Download counter increments

#### Bookmark Feature
- [ ] User can add bookmark
- [ ] Bookmark appears in list
- [ ] User can remove bookmark
- [ ] Bookmark removes from list

#### Search & Filter
- [ ] Search by title works
- [ ] Search by author works
- [ ] Filter by category works
- [ ] Filter by tags works
- [ ] Multiple filters work together
- [ ] Results update correctly

### ✅ Cross-Browser Testing

- [ ] Chrome 90+
- [ ] Firefox 88+
- [ ] Safari 14+
- [ ] Edge 90+
- [ ] Mobile Chrome
- [ ] Mobile Safari

### ✅ Device Testing

- [ ] Desktop (1920x1080)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)
- [ ] Landscape orientation
- [ ] Touch interactions

### ✅ Performance Testing

```bash
# Frontend performance audit
npm run build
npm run analyze

# Lighthouse audit
lighthouse http://localhost:3000
```

Target scores:
- [ ] Performance: >90
- [ ] Accessibility: >95
- [ ] Best Practices: >90
- [ ] SEO: >90

### ✅ Security Testing

- [ ] No sensitive data in console
- [ ] No XSS vulnerabilities
- [ ] CSRF protection enabled
- [ ] SQL injection prevention
- [ ] Rate limiting working
- [ ] HTTPS redirect working (production)

### ✅ API Testing

```bash
# Using Postman or curl
curl -X POST http://localhost:5000/api/auth/admin-login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "bismillah"
  }'
```

- [ ] All endpoints accessible
- [ ] Authentication required where needed
- [ ] Error handling correct
- [ ] CORS working
- [ ] Response formats correct

---

## Pre-Production Deployment Checklist

### 📋 Code Review
- [ ] Code quality checked (ESLint, Prettier)
- [ ] No console.log statements
- [ ] No hardcoded credentials
- [ ] No unused imports
- [ ] Comments are clear
- [ ] PR reviewed and approved

### 🔐 Security Checklist
- [ ] All `.env` variables set
- [ ] JWT_SECRET changed to strong key
- [ ] Database credentials secured
- [ ] API keys properly protected
- [ ] CORS_ORIGIN restricted
- [ ] Rate limiting enabled
- [ ] Helmet.js security headers enabled
- [ ] Input validation enabled
- [ ] HTTPS enabled

### 📦 Dependencies
- [ ] All dependencies up to date
- [ ] No vulnerable packages: `npm audit`
- [ ] Package-lock.json committed
- [ ] No unnecessary dependencies

### 🗄️ Database
- [ ] MongoDB production setup
- [ ] Database backups configured
- [ ] Indexes created
- [ ] Connection pooling configured
- [ ] Replica set enabled (if using Cloud)
- [ ] Data retention policies set

### 📄 Documentation
- [ ] README updated
- [ ] API documentation complete
- [ ] Deployment guide written
- [ ] Troubleshooting guide written
- [ ] Architecture documented
- [ ] Environment variables documented

### 🚀 Deployment Infrastructure

#### Server Requirements
- [ ] Server OS: Ubuntu 20.04+
- [ ] Node.js v16+
- [ ] MongoDB v5+
- [ ] Nginx for reverse proxy
- [ ] SSL certificate (Let's Encrypt)
- [ ] Firewall configured
- [ ] SSH keys setup

#### CDN & Storage
- [ ] Cloudinary account setup (file storage)
- [ ] CloudFront configured (optional)
- [ ] AWS S3 bucket created (optional)
- [ ] Backup storage configured

#### Monitoring
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring (New Relic)
- [ ] Log aggregation (ELK Stack)
- [ ] Uptime monitoring (UptimeRobot)
- [ ] Alert thresholds configured

---

## Deployment Steps

### Step 1: Backend Deployment (Heroku Example)

```bash
# Login to Heroku
heroku login

# Create app
heroku create asy-syifaa-library

# Add buildpacks
heroku buildpacks:add heroku/nodejs
heroku buildpacks:add heroku/python

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI="mongodb+srv://user:pass@cluster.mongodb.net/asy-syifaa"
heroku config:set JWT_SECRET="$(openssl rand -base64 32)"
heroku config:set CLOUDINARY_CLOUD_NAME="your-cloud"
heroku config:set CLOUDINARY_API_KEY="your-key"
heroku config:set CLOUDINARY_API_SECRET="your-secret"

# Deploy
git push heroku main

# Run migrations
heroku run npm run seed

# View logs
heroku logs --tail
```

### Step 2: Frontend Deployment (Vercel Example)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod

# Set environment variables di Vercel dashboard
# REACT_APP_API_URL=https://your-backend.herokuapp.com
```

### Step 3: Custom Server Deployment

```bash
# SSH to server
ssh -i ~/.ssh/id_rsa root@your-server.com

# Install Node.js
curl https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 16

# Install PM2
npm install -g pm2

# Clone repository
git clone https://github.com/yourrepo/asy-syifaa.git
cd asy-syifaa

# Setup backend
cd backend
npm install
echo "PORT=5000
MONGODB_URI=..." > .env

# Start with PM2
pm2 start server.js --name "asy-syifaa-api"
pm2 save
pm2 startup

# Setup frontend
cd ../frontend
npm install
npm run build
pm2 serve build 3000 --spa --name "asy-syifaa-web"

# Setup Nginx
sudo apt-get install nginx
# Create /etc/nginx/sites-available/asy-syifaa
# Enable with: sudo ln -s ... /etc/nginx/sites-enabled/

# Setup SSL
sudo apt-get install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d yourdomain.com

# Start Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Step 4: Docker Deployment

```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Run seed script
docker-compose exec backend npm run seed

# Stop services
docker-compose down
```

---

## Post-Deployment Verification

### ✅ Frontend Checks
- [ ] Site loads without errors
- [ ] PWA installs correctly
- [ ] Service Worker registered
- [ ] Login page renders
- [ ] File list displays
- [ ] Search works
- [ ] PDF viewer loads
- [ ] Mobile responsive

### ✅ Backend Checks
- [ ] API responds to requests
- [ ] Database connected
- [ ] Authentication working
- [ ] File upload working
- [ ] Bookmarks working
- [ ] Reading progress saved
- [ ] Logs clean (no errors)

### ✅ Performance Checks
- [ ] Page load time <3s
- [ ] Lighthouse score >90
- [ ] No 404 errors
- [ ] No CORS errors
- [ ] API response time <500ms

### ✅ Security Checks
- [ ] HTTPS working
- [ ] Security headers present
- [ ] No sensitive data exposed
- [ ] Rate limiting active
- [ ] CSRF tokens working

---

## Post-Launch Monitoring

### Daily Checks
- [ ] No error spikes
- [ ] Uptime >99.9%
- [ ] Load times normal
- [ ] User count growing

### Weekly Checks
- [ ] Database size healthy
- [ ] Backup completed
- [ ] Security updates available
- [ ] API performance stable

### Monthly Checks
- [ ] Full security audit
- [ ] Performance optimization review
- [ ] User feedback analysis
- [ ] Feature usage analysis

---

## Rollback Procedure

If something goes wrong:

```bash
# Git rollback
git log --oneline
git revert <commit-hash>
git push

# Heroku rollback
heroku releases
heroku rollback v123

# Database rollback
mongorestore --uri $MONGODB_URI ./backup-folder

# Docker rollback
docker-compose down
git checkout previous-tag
docker-compose build
docker-compose up -d
```

---

## Quick Reference Commands

```bash
# Backend
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server
npm test                 # Run tests
npm run seed             # Initialize database
npm run health           # Health check

# Frontend
npm start                # Development server
npm run build            # Build for production
npm test                 # Run tests
npm run analyze          # Bundle analysis
npm run eject            # Eject from CRA

# Docker
docker-compose up -d     # Start all services
docker-compose down      # Stop all services
docker-compose logs -f   # View logs
docker-compose exec backend npm run seed  # Seed DB

# Git
git clone [url]          # Clone repository
git pull                 # Get latest changes
git push                 # Push changes
git branch -a            # List branches
git checkout -b feature  # Create new branch
```

---

## Common Issues & Solutions

### Issue: MongoDB Connection Failed
```
Solution: Check MONGODB_URI, ensure MongoDB running, verify IP whitelist
```

### Issue: CORS Error
```
Solution: Update CORS_ORIGIN in .env, restart backend
```

### Issue: PDF Not Loading
```
Solution: Verify fileUrl valid, check Cloudinary account, ensure file exists
```

### Issue: Service Worker Not Registering
```
Solution: Ensure HTTPS, check manifest.json valid, clear browser cache
```

### Issue: High Database Load
```
Solution: Check query indexes, enable caching, optimize queries
```

---

## Success Criteria

✅ **MVP Launch Success When:**
- 100% of features working as specified
- All tests passing
- Performance scores >90
- No critical security issues
- Database optimized
- Documentation complete
- Team trained
- Monitoring active
- Backup system working
- Support procedures documented

---

**Last Updated:** January 2024
**Status:** Ready for Production

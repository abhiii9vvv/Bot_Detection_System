# Bot Detection System

A MERN stack application that detects and prevents bot activities through behavioral analysis and real-time monitoring.

## Features

- 🤖 **Backend Bot Detection** - Express middleware analyzes behavioral patterns
- ⌨️ **Keystroke Analysis** - Detects inhuman typing patterns
- 🖱️ **Mouse Tracking** - Identifies scripted cursor movements
- 🔒 **Rate Limiting** - Prevents brute-force attacks
- 🎯 **Risk Scoring** - Cumulative threat assessment (0-100)
- 📊 **Interactive Flowchart** - Visual detection workflow
- 🔐 **JWT Authentication** - Secure session management
- 💾 **MongoDB Storage** - Logs and analytics

## Tech Stack

**Frontend:** React, CSS3  
**Backend:** Node.js, Express  
**Database:** MongoDB Atlas  
**Security:** JWT, bcrypt

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/abhiii9vvv/Bot_Detection_System.git
cd Bot_Detection_System
```

2. **Install dependencies**
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. **Configure environment variables**

**Backend** - Create `backend/.env`:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret_key
CORS_ORIGIN=http://localhost:3000
```

**Frontend** - Create `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000
```

> **Note:** Use `.env.example` files as templates. Never commit `.env` files to Git.

4. **Run the application**

```bash
# Start backend (from backend folder)
npm start

# Start frontend (from frontend folder, new terminal)
npm start
```

The app will run on:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

## Project Structure

```
Bot_Detection_System/
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── App.js
│       └── App.css
└── README.md
```

## Key Components

### Backend Middleware
- Request fingerprinting
- Behavioral signal analysis
- Rate limiting enforcement
- Session validation

### Frontend Features
- Real-time event tracking
- Interactive detection flowchart
- Responsive navigation
- Login form with bot detection

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Header validation
- User-Agent verification
- Session fingerprinting
- CAPTCHA triggers for suspicious activity

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Backend server port | Yes |
| `MONGO_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | JWT signing key | Yes |
| `NODE_ENV` | Environment (development/production) | No |
| `CORS_ORIGIN` | Frontend URL for CORS | No |

### Frontend (`frontend/.env`)

| Variable | Description | Required |
|----------|-------------|----------|
| `REACT_APP_API_URL` | Backend API base URL | Yes |

## Deployment

### Backend (Render/Railway/Heroku)
1. Connect your GitHub repository
2. Set environment variables:
   - `PORT` (usually auto-set)
   - `MONGO_URI` (MongoDB Atlas connection string)
   - `JWT_SECRET` (strong random string)
   - `NODE_ENV=production`
   - `CORS_ORIGIN` (your frontend URL)
3. Build command: `npm install`
4. Start command: `npm start`

### Frontend (Vercel/Netlify)

**Vercel (Recommended - Auto-configured):**
1. Import project from GitHub
2. Vercel will auto-detect the configuration from `vercel.json`
3. Add environment variable:
   - `REACT_APP_API_URL` = your deployed backend URL (e.g., `https://your-backend.onrender.com`)
4. Deploy

**If manual configuration needed:**
- Build Command: `cd frontend && npm run build`
- Output Directory: `frontend/build`
- Install Command: `cd frontend && npm install`

**Netlify:**
1. Import from GitHub
2. Base directory: `frontend`
3. Build command: `npm run build`
4. Publish directory: `frontend/build`
5. Add environment variable:
   - `REACT_APP_API_URL` = your deployed backend URL
6. Deploy

### Important Deployment Notes
- Update `CORS_ORIGIN` in backend to match your deployed frontend URL
- Ensure MongoDB Atlas allows connections from all IPs (0.0.0.0/0) or your server IPs
- Use strong JWT_SECRET in production (generate random string)
- Test API health endpoint: `https://your-backend.com/health`

## Author

**Abhinav Tiwary**  
- GitHub: [@abhiii9vvv](https://github.com/abhiii9vvv)
- LinkedIn: [abhinavtiwary](https://linkedin.com/in/abhinavtiwary/)
- Email: abhinavv8975@gmail.com

## License

MIT License - Feel free to use for learning and projects.

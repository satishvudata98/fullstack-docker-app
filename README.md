# Fullstack Docker App - Rock Paper Scissors Game

A complete fullstack application built with modern technologies, containerized using Docker and Compose, featuring a React frontend, Express backend, PostgreSQL database, and Nginx reverse proxy.

## 📋 Project Overview

This is a Rock-Paper-Scissors game application with the following features:
- **Interactive Game UI**: Play rock-paper-scissors against the computer
- **Score Tracking**: Keep track of wins, losses, and draws
- **Server Health Check**: Monitor API connectivity with server time display
- **Fully Containerized**: Run the entire application with a single Docker Compose command
- **CI/CD Pipeline**: Automated deployment to AWS EC2 using GitHub Actions

## 🏗️ Project Architecture

```
fullstack-docker-app/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions CI/CD workflow
├── backend/
│   ├── Dockerfile                  # Backend container configuration
│   ├── index.js                    # Express server entry point
│   └── package.json                # Backend dependencies
├── frontend/
│   ├── Dockerfile                  # Frontend container (multi-stage build)
│   ├── package.json                # React dependencies
│   ├── public/
│   │   ├── index.html              # Main HTML file
│   │   ├── manifest.json           # PWA manifest
│   │   └── robots.txt              # SEO robots configuration
│   └── src/
│       ├── App.js                  # Main React component
│       ├── App.css                 # Application styles
│       ├── App.test.js             # React component tests
│       ├── index.js                # React DOM render
│       ├── index.css               # Global styles
│       ├── reportWebVitals.js      # Performance monitoring
│       └── setupTests.js           # Test configuration
├── db/
│   └── init.sql                    # Database initialization script
├── nginx/
│   └── default.conf                # Nginx reverse proxy configuration
├── docker-compose.yml              # Docker Compose orchestration
└── README.md                        # This file
```

## 🛠️ Technology Stack

### Frontend
- **React** (v19.2.4): UI library
- **React DOM** (v19.2.4): React rendering
- **React Scripts** (v5.0.1): Build and dev tooling
- **Testing Library**: Unit and integration testing

### Backend
- **Express** (v5.2.1): Web framework
- **Node.js** (v20): JavaScript runtime
- **PostgreSQL Driver** (pg v8.17.2): Database connectivity
- **dotenv** (v17.2.3): Environment variable management

### Database
- **PostgreSQL** (v15): Relational database

### Infrastructure
- **Docker**: Container runtime
- **Docker Compose** (v3.9): Container orchestration
- **Nginx**: Reverse proxy and load balancer
- **GitHub Actions**: CI/CD automation

## 🚀 Getting Started

### Prerequisites
- Docker Desktop (includes Docker and Docker Compose)
- Git
- (Optional) Node.js and npm for local development

### Installation & Running

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd fullstack-docker-app
   ```

2. **Create an environment file** (`.env` in root directory):
   ```bash
   # Database Configuration
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=your_secure_password
   POSTGRES_DB=myapp_db

   # Backend Configuration
   DB_HOST=db
   DB_USER=postgres
   DB_PASS=your_secure_password
   DB_NAME=myapp_db
   ```

3. **Start the application:**
   ```bash
   docker-compose up -d --build
   ```

   The application will be available at:
   - **Frontend**: http://localhost/
   - **API**: http://localhost/api/
   - **Server Health**: http://localhost/api/health

4. **View logs:**
   ```bash
   docker-compose logs -f
   ```

5. **Stop the application:**
   ```bash
   docker-compose down
   ```

## 📝 Environment Variables

### Backend & Database

| Variable | Description | Example |
|----------|-------------|---------|
| `POSTGRES_USER` | PostgreSQL username | `postgres` |
| `POSTGRES_PASSWORD` | PostgreSQL password | `secure_password` |
| `POSTGRES_DB` | Database name | `myapp_db` |
| `DB_HOST` | Database host (Docker service name) | `db` |
| `DB_USER` | Backend DB user | `postgres` |
| `DB_PASS` | Backend DB password | `secure_password` |
| `DB_NAME` | Backend database name | `myapp_db` |

**Note**: For local development, create a `.env` file in the root directory. For production deployments, use GitHub Secrets.

## 🏃 Service Details

### Frontend Service
- **Port**: 80 (internal), exposed via Nginx on port 80
- **Build**: Multi-stage Docker build
- **Features**:
  - React SPA with game logic
  - Server health status monitoring
  - Score persistence (in-memory, per session)
  - Responsive UI with emoji-based game choices

### Backend Service
- **Port**: 5000
- **Entry Point**: `npm start` → `node index.js`
- **Endpoints**:
  - `GET /api/health` - Returns current server time from database
- **Dependencies**: PostgreSQL, Express

### Database Service
- **Image**: PostgreSQL 15
- **Port**: 5432 (internal only)
- **Persistence**: `db_data` volume
- **Initialization**: Automatically runs `db/init.sql`
- **Tables**:
  - `logs`: Message logging table with timestamps

### Nginx Service
- **Port**: 80 (exposed to host)
- **Configuration**: `nginx/default.conf`
- **Routing**:
  - `/` → Frontend (port 80)
  - `/api/` → Backend (port 5000)

## 📦 Volumes

| Volume Name | Mount Point | Purpose |
|------------|-------------|---------|
| `db_data` | `/var/lib/postgresql/data` | PostgreSQL data persistence |

## 🔄 CI/CD Pipeline

**Workflow File**: `.github/workflows/deploy.yml`

Triggers on push to the `main` branch:

1. **Checkout code** from repository
2. **SSH into EC2 instance** using GitHub Secrets
3. **Pull latest code** from main branch
4. **Stop running containers**: `docker-compose down`
5. **Build and start containers**: `docker-compose up -d --build`

### Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `EC2_HOST` | AWS EC2 public IP or hostname |
| `EC2_USER` | SSH username (typically `ubuntu`) |
| `EC2_KEY` | Private SSH key for EC2 access |

## 🎮 Game Features

- **Three Choices**: Rock 🪨, Paper 📄, Scissors ✂️
- **Score Board**: Track wins, losses, and draws
- **Play Again**: Re-play without resetting scores
- **Reset Score**: Start fresh with all stats at zero
- **Server Status**: Real-time server time display showing API connectivity

## 📂 File Descriptions

### Backend (`backend/`)
- **index.js**: Express server with PostgreSQL pool, health check endpoint
- **Dockerfile**: Node.js 20 image, runs `npm install` and starts server
- **package.json**: Dependencies (express, pg, dotenv)

### Frontend (`frontend/`)
- **App.js**: Main React component with game logic and state management
- **App.css**: Component styling (games states, score board, buttons)
- **Dockerfile**: Multi-stage build (Node.js build stage → Nginx production stage)
- **package.json**: React and testing dependencies

### Database (`db/`)
- **init.sql**: Creates `logs` table on container startup

### Nginx (`nginx/`)
- **default.conf**: Reverse proxy configuration routing frontend and API requests

## 🔒 Security Considerations

- Store credentials in `.env` file and GitHub Secrets
- Never commit `.env` file to version control
- Use strong PostgreSQL passwords in production
- Restrict SSH key access (EC2_KEY) to authorized personnel only
- Consider adding HTTPS/SSL in production

## 🧪 Testing

### Frontend Tests
```bash
docker-compose exec frontend npm test
```

### Backend Tests
Currently no tests configured. To add:
```bash
# Inside backend/ directory
npm install --save-dev jest supertest
```

## 🐛 Troubleshooting

### Port already in use
```bash
# Kill container using port 80
docker ps
docker kill <container-id>
```

### Database connection failed
- Check `.env` file variables match `docker-compose.yml`
- Ensure `db` service is running: `docker-compose ps`
- Check backend logs: `docker-compose logs backend`

### Frontend not connecting to backend
- Verify Nginx configuration in `nginx/default.conf`
- Check backend service name resolution: `docker-compose exec frontend ping backend`

### Images not building
```bash
# Clean up and rebuild
docker-compose down -v
docker system prune -a
docker-compose up -d --build
```

## 📚 Useful Docker Commands

```bash
# View all services status
docker-compose ps

# View logs for specific service
docker-compose logs backend
docker-compose logs frontend
docker-compose logs db

# Execute command in running container
docker-compose exec backend npm list
docker-compose exec frontend npm list

# Stop all services
docker-compose stop

# Remove all containers and volumes
docker-compose down -v
```

## 🚢 Deployment

The application is configured for automated deployment to AWS EC2:

1. Push changes to `main` branch
2. GitHub Actions workflow triggers automatically
3. Pulls code on EC2, rebuilds containers, and restarts services

Deployment happens within minutes without manual intervention.

## 📝 Notes

- This is a demonstration of fullstack containerized development
- All services communicate via Docker network
- Database data persists in the `db_data` volume even after container restarts
- Frontend assets are pre-built in the Docker image for production efficiency

## 📄 License

ISC

---

**Created**: February 2026
**Technology Focus**: Docker, Docker Compose, React, Express, PostgreSQL

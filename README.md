# 🔗 mLink

URL shortener service managed entirely through Discord Built with NestJS, Discord.js, and MongoDB.

## 🚀 Features

- **Discord Bot Interface** - Manage all URL shortening through Discord
- **Custom Short URLs** - Create memorable short links with custom aliases
- **MongoDB Storage** - Reliable database for storing links and analytics
- **Docker Ready** - Multi-platform Docker images for easy deployment

## 🎯 Discord Commands

The bot provides intuitive slash commands for URL management:

- `/link add` - Create a short link with optional custom code
- `/link list` - List and manage all your created short links

## 📋 Prerequisites

- Node.js
- MongoDB
- Discord Application (both `User install` and `Bot install` modes supported)
- pnpm package manager

## ⚙️ Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/magicman517/mLink.git
   cd mLink
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Configuration**

   Copy `.env.example` to `.env` and configure:
   ```env
   DISCORD_BOT_TOKEN='your_discord_bot_token'
   DATABASE_CONNECTION_STRING='mongodb://localhost:27017/mLink'

   # Optional: set custom port
   PORT=3000
   ```

4. **Start the application**
   ```bash
   # Development mode
   pnpm run start:dev

   # Production mode
   pnpm run build
   pnpm run start:prod
   ```

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

```yaml
services:
  m-link:
    image: ghcr.io/magicman517/mlink:latest
    ports:
      - "3000:3000"
    environment:
      - DISCORD_BOT_TOKEN=your_discord_bot_token
      - DATABASE_CONNECTION_STRING=mongodb://mongo:27017/mLink
    depends_on:
      - mongo

  mongo:
    image: mongo:7
    volumes:
      - mongo_data:/data/db

    # Uncomment the following lines to expose MongoDB port if needed
    #ports:
    #  - "27017:27017"

volumes:
  mongo_data:
```

## 📝 License

This project is licensed under the [UNLICENSED](LICENSE) license.

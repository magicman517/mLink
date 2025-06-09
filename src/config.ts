export default () => ({
  discord: {
    bot_token: process.env.DISCORD_BOT_TOKEN || '',
  },
  database: {
    connection_string:
      process.env.DATABASE_CONNECTION_STRING ||
      'mongodb://localhost:27017/mLink',
  },
});

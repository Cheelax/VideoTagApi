const env = {
  conString: 'postgres://fzqvnnvw:uzxNpaadzzcbV8r-XMq9mJpp-etg8GLg@rogue.db.elephantsql.com:5432/fzqvnnvw',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

module.exports = env;
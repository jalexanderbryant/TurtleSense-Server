/*
  * DESC: Production environment configurations
*/

module.exports = {
  // false logging for development
  logging: true,
  db: {
    url: process.env.MONGODB_URI
  }

}
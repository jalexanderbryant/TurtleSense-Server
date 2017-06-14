/*
  * DESC: Production environment configurations
*/

module.exports = {
  // false logging for development
  logging: false,
  db: {
    url: process.env.MONGODB_URI
  }

}
/*
  * DESC: Production environment configurations
*/

module.exports = {
  // false logging for development
  db: {
    url: process.env.MONGODB_URI
  }

}
const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '../..', 'config', 'sequelize.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);

//모델간의 관계를 정의한다.
// db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
// db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id' });

module.exports = db;
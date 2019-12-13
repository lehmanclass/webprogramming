import Sequelize from 'sequelize';

const sequelize = new Sequelize('test_graphql_db', 'postgres', 'Tiger12345', {
    host: 'localhost',
    dialect: 'postgres'
});

const db = {
    User: sequelize.import('./user'),
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
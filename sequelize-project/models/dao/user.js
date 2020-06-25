module.exports = function (sequelize, DataTypes) {
    const user = sequelize.define('User', {
        userIdx: {
            field: 'userIdx',
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        id: {
            field: 'id',
            type: DataTypes.STRING(50),
            unique: true,
            allowNull: false
        },
        name: {
            field: 'name',
            type: DataTypes.STRING(50),
            allowNull: false
        },
        password: {
            field: 'password',
            type: DataTypes.STRING(200),
            allowNull: false
        },
        salt: {
            field: 'salt',
            type: DataTypes.STRING(200),
            allowNull: false
        },
        email: {
            field: 'email',
            type: DataTypes.STRING(20),
            allowNull: true
        },
        image: {
            field: 'image',
            type: DataTypes.STRING(200),
            allowNull: true
        },
    }, {
        // don't use camelcase for automatically added attributes but underscore style
        // so updatedAt will be updated_at
        underscored: true,
        timestamps: false,
        // disable the modification of tablenames; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true,
        // define the table's name
        tableName: 'user'
    });

    return user;
};
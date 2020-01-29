const user = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        displayName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
        {
            indexes: [
                {
                    unique: true,
                    name: 'unique_email',
                    fields: [sequelize.fn('lower', sequelize.col('email'))]
                }
            ],
        },
    );
    return User;
};

module.exports = user;
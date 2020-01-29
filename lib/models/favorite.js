const favorite = (sequelize, DataTypes) => {
    const Favorite = sequelize.define('favorite', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        bookId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
        {
            indexes: [
                {
                    unique: true,
                    name: 'unique_user_favorite',
                    fields: ['userId', 'bookId']
                }
            ],
        },
    );
    return Favorite;
};

module.exports = favorite;
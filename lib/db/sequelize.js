const Sequelize = require('sequelize');

const BookModel = require('../models/book');
const FavoriteModel = require('../models/favorite')
const NoteModel = require('../models/note')
const UserModel = require('../models/user')

const keys = require('../../config/keys')
const sequelize = new Sequelize(
    keys.POSTGRES_DATABASE_NAME,
    keys.POSTGRES_DATABASE_USERNAME,
    keys.POSTGRES_DATABASE_PASSWORD,
    {
        dialect: 'postgres',
    },
);


const Book = BookModel(sequelize, Sequelize);
const Favorite = FavoriteModel(sequelize, Sequelize);
const Note = NoteModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);

User.belongsToMany(Book, { through: Favorite, as: `favorites`, foreignKey: 'userId', onDelete: 'CASCADE', otherKey: 'bookId' });
Book.belongsToMany(User, { through: Favorite, as: `favoredBy`, foreignKey: 'bookId', onDelete: 'CASCADE', otherKey: 'userId' });

User.hasMany(Favorite, { foreignKey: 'userId', onDelete: 'cascade'})
User.hasMany(Note, { foreignKey: 'userId', onDelete: 'cascade' })

Note.belongsTo(User, { foreignKey: 'userId' })

Book.hasMany(Favorite, { foreignKey: 'bookId', onDelete: 'cascade' })
Book.hasMany(Note, { foreignKey: 'bookId', onDelete: 'cascade' })


module.exports = {
    sequelize,
    User,
    Book,
    Favorite,
    Note
}
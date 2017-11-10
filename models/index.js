var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');

const Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {notEmpty: true},
    },
    urlTitle: {
        validate: {isUrl: true, notEmpty: true},
        type: Sequelize.STRING,
        allowNull: false,
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed'),
        defaultValue: 'closed'
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
});

const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
            notEmpty: true
        }
    }
});

module.exports = {
    db: db,
    Page: Page,
    User: User
};


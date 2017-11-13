var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});

const Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { notEmpty: true },
    },
    urlTitle: {
        //validate: {isUrl: true, notEmpty: true},
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
    },
}, {
        hooks: {
            beforeValidate: (page, options) => page.setDataValue('urlTitle', generateUrlTitle(page.getDataValue('title'))),
        },
        getterMethods: {
            route() {
                return '/wiki/' + this.urlTitle
            }
        },
    });

function generateUrlTitle(title) {
    if (title) {
        // Removes all non-alphanumeric characters from title
        // And make whitespace underscore
        return title.replace(/\s+/g, '_').replace(/\W/g, '');
    } else {
        // Generates random 5 letter string
        return Math.random().toString(36).substring(2, 7);
    }
}

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


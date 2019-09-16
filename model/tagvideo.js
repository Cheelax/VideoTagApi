module.exports = (sequelize, Sequelize) => {
    const Tagvideo = sequelize.define("tagvideo", {
        videoid: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        tagid: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    }, {
        timestamps: false
    });
    return Tagvideo;
};
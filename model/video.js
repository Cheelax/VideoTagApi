module.exports = (sequelize, Sequelize) => {
  const Video = sequelize.define("video", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING
    },
    url: {
      type: Sequelize.STRING,
      allowNull: false
    },
    createdat: {
      type: Sequelize.DATE,

    },
    updatedat: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
  }, {
    timestamps: false,
    underscored: false
  });
  return Video;
};
// * id (clé primaire obligatoire)
// * valeur (obligatoire, unique)
module.exports = (sequelize, Sequelize) => {
  const Tag = sequelize.define("tag", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    valeur: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
  }, {
    timestamps: false
  });
  return Tag;
};
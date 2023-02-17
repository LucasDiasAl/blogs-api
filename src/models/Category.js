module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: DataTypes.STRING
    },
    {
      tableName: 'categories',
      undescored: true,
      timestamps: false,
    }
  );
  return Category;
};
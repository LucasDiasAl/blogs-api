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
      underscored: true,
      timestamps: false,
    }
  );
  return Category;
};
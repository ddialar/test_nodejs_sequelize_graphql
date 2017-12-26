import Sequelize from 'sequelize';

const conexion = new Sequelize(
  'testsqlite3', 'testsqlite3', 'testsqlite3',
  {
    host: 'localhost',
    dialect: 'sqlite',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    storage: './server/sequelize/database/testsqlite3.sqlite',
  },
);

const User = conexion.define('user', {
  firstname: { type: Sequelize.STRING, allownull: false },
  lastname: { type: Sequelize.STRING, allownull: false },
  email: { type: Sequelize.STRING, allownull: false },
});

const Post = conexion.define('post',{
  title: { type: Sequelize.STRING, allownull: false },
  content: { type: Sequelize.STRING, allownull: false },
});

User.hasMany(Post);
Post.belongsTo(User);

conexion.sync({ force: true }).then(() => {
  return User.create({
    firstname: 'prueba',
    lastname: 'prueba',
    email: 'email@email.com',
  }).then((person) => {
    return person.createPost({
      title: 'Post de prueba',
      content: 'Esto es un post de prueba',
    });
  });
});

export default conexion;

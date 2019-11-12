import mongoose from 'mongoose';

const mongo = async () => {
  console.log(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mongo:${process.env.DB_PORT}/${process.env.DB_NAME}`
  );
  return mongoose
    .connect(`mongodb://mongo:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('Erro', err));
};

export default {
  mongo,
};

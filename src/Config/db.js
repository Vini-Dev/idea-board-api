import mongoose from 'mongoose';

export const mongo = async () => {
    return mongoose
        .connect('mongodb://mongo:27017/idea', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log('MongoDB Connected'))
        .catch(err => console.log('Erro', err));
};

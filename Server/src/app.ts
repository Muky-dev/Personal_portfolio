import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import projectsRouter from './routes/projects';
import authRouter from './routes/auth';

const app: Express = express();

const PORT: string | number = process.env.PORT || 4000;

app.use(cors());
app.use(express.urlencoded({ extended: false, limit: '10mb' }));
app.use(express.json());

app.use('/', projectsRouter);
app.use('/', authRouter);

const uri: string = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6smfd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const db = mongoose.connection;

db.on('error', error => console.log(error));
db.once('open', () => {
    console.log("Database connected");
});

app.listen(PORT, () => {
    console.log(`Server running on localhost:${PORT}`);
});
import express, {Express} from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import moviesRoute from "./src/v1/routes/movies/moviesRoute";

const app: Express = express();
const port = 3010;

app.use(cors({
    origin: '*',
    credentials: true,
    methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE'
}));
app.use(bodyParser.json());

app.use('/api/v1', moviesRoute);

app.listen(port, () => {
    console.log(`Running on port ${port}.`);
});

export default app;

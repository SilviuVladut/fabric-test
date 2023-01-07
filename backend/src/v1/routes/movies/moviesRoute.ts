import {Router, Request, Response} from "express";
import {getMovies} from "../../controllers/movies/moviesController";

const moviesRoute: Router = Router();

moviesRoute.get('/movies', (req: Request, res: Response) => {
    getMovies(req,res);
});

export default moviesRoute;

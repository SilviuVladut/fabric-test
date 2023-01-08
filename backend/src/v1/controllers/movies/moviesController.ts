import dotenv from "dotenv";
import mysql from "mysql2";
import axios from "axios";
import { Request, Response } from "express";
import { Movie } from "../../types/movies/IMovies";

dotenv.config();
const dbCredentials = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
};

const addMovieInDB = async (movie: Movie) => {
  const dbConnection = await mysql.createConnection(dbCredentials);
  dbConnection.query(
    "INSERT INTO movies_table(imdbID, title, year, type) VALUES (?,?,?,?)",
    [movie.imdbID, movie.Title, movie.Year, movie.Type],
    (dbErr, dbRes) => {
      if (dbErr) {
        console.error(dbErr);
      }
    }
  );
  if (movie.Poster.length > 3) {
    dbConnection.query(
      "INSERT INTO posters_table(imdbID,poster) VALUES (?,?)",
      [movie.imdbID, movie.Poster],
      (dbErr, dbRes) => {
        if (dbErr) {
          console.error(dbErr);
        }
      }
    );
  }

  dbConnection.end();
};

const checkIfDataExists = async (data: Movie[]) => {
  const dbConnection = await mysql.createConnection(dbCredentials);
  data.map((movie) => {
    dbConnection.query(
      "SELECT COUNT(imdbID) AS moviesCounter FROM movies_table WHERE imdbID = ?",
      [movie.imdbID],
      (dbErr, dbRes) => {
        if (dbErr) {
          console.error(dbErr);
        }
        if (dbRes[0].moviesCounter < 1) {
          addMovieInDB(movie);
        }
      }
    );
  });
  dbConnection.end();
};

const sendDataSorted = (
  res: Response,
  data: Movie[],
  sortBy: string,
  sortMode?: string
) => {
  sortMode ? sortMode : (sortMode = "asc");
  // I put an if condition, becuase in future if will be more params about by we can sort, we can reuse the code block
  // In this case from my perspective only by year we can sort
  if (sortBy === "year") {
   const sortedData =
      sortMode === "asc"
        ? data.sort((a, b) => parseFloat(a.Year) - parseFloat(b.Year))
        : data.sort((a, b) => parseFloat(b.Year) - parseFloat(a.Year));

    res.status(200).send({response: sortedData});
  }

};

const getExternalData = (
  res: Response,
  movieName: string,
  sortBy?: string,
  sortMode?: string
) => {
  const params = {
    s: movieName,
    apikey: process.env.API_KEY,
  };
  const externalApi = axios
    .get(process.env.API_BASE, { params })
    .then((resp) => {
      return resp.data;
    })
    .catch((err) => {
      console.error(err);
      res.status(503).send("Service unavailable! Please try again!");
    });

  externalApi.then((response) => {
    const externalData: Movie[] = response.Search;
    sortBy
      ? sendDataSorted(res, externalData, sortBy, sortMode)
      : res.status(200).send({ response: externalData });

    externalData && checkIfDataExists(externalData);
  });
};

export const getMovies = async (req: Request, res: Response) => {
  const movieName: string | undefined = req.query.movie as string | undefined;
  const sortBy: string | undefined = req.query.sortBy as string | undefined;
  const sortMode: string | undefined = req.query.sortMode as string | undefined;

  if (!movieName) {
    res.statusMessage = "Invalid query!";
    res.status(400).end();
  } else getExternalData(res, movieName, sortBy, sortMode);
};

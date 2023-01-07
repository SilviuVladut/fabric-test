import React, { useState } from "react";
import {
  Container,
  Divider,
  Grid,
  Loader,
  Title,
} from "@mantine/core";
import fabricLogo from "../../utils/fabric-logo.png";
import { CustomHeader } from "../Header/CustomHeader";
import { Actions } from "../Actions/Actions";
import { CustomCard } from "../Items/CustomCard";
import { CustomFooter } from "../CustomFooter/CustomFooter";
import { Movie } from "./IMainPage";

export interface QueryParams {
  movie: string | null;
  sortBy?: string;
  sortMode?: string;
}

export const MainPage = () => {
  const [dataArray, setDataArray] = useState<Movie[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [currentMovie, setCurrentMovie] = useState<string | null>(null);

  const getApiData = (params: any) => {
    fetch("http://localhost:3010/api/v1/movies?" + new URLSearchParams(params))
      .then((resp) => resp.json())
      .then((response: { response: Movie[] }) => {
        setDataArray(response.response);
        setIsDataLoading(false);
      })
      .catch((err) => console.error(err));
  };

  const onBtnClick = (movie: string) => {
    setIsDataLoading(true);
    const params: QueryParams = {
      movie,
    };
    setCurrentMovie(movie);
    getApiData(params);
  };

  const onSortClick = (sortBy: string, sortMode?: string) => {
    setIsDataLoading(true);
    const params: QueryParams = {
      movie: currentMovie,
      sortBy,
      sortMode,
    };
    getApiData(params);
  };

  return (
    <>
      <Container size="xl" bg="gray.0">
        <CustomHeader logo={fabricLogo} />
        <Actions
          onBtnClick={onBtnClick}
          onSortClick={onSortClick}
          sortDisabled={dataArray.length === 0}
        />
        <Divider mb="md" />

        {isDataLoading ? (
          <Loader ml="50%" />
        ) : dataArray.length ? (
          <Grid align="center" gutter="xl">
            {dataArray.map((movie) => {
              return (
                <>
                  <Grid.Col md={4} sm={6}>
                    <CustomCard
                      title={movie.Title}
                      imdbID={movie.imdbID}
                      year={movie.Year}
                      poster={movie.Poster}
                    />
                  </Grid.Col>
                </>
              );
            })}
          </Grid>
        ) : (
          <Title order={5} color="blue.8" align="center">
            We don't have data yet, press a button.
          </Title>
        )}
        <CustomFooter />
      </Container>
    </>
  );
};

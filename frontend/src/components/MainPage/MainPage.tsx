import React, { useState } from "react";
import { Container, Divider, Grid, Loader, Title, Alert } from "@mantine/core";
import fabricLogo from "../../utils/fabric-logo.png";
import { CustomHeader } from "../Header/CustomHeader";
import { Actions } from "../Actions/Actions";
import { CustomCard } from "../Items/CustomCard";
import { CustomFooter } from "../CustomFooter/CustomFooter";
import { Movie } from "./IMainPage";
import { IconAlertCircle } from "@tabler/icons";

export interface QueryParams {
  movie: string | null;
  sortBy?: string;
  sortMode?: string;
}

export const MainPage = () => {
  const [dataArray, setDataArray] = useState<Movie[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [currentMovie, setCurrentMovie] = useState<string | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);

  const getApiData = (params: any) => {
    fetch("http://localhost:3010/api/v1/movies?" + new URLSearchParams(params))
      .then((resp) => resp.json())
      .then((response: { response: Movie[] }) => {
        setDataArray(response.response);
        setIsDataLoading(false);
      })
      .catch((err) => {
        console.error(err)
        setAlertVisible(true);
      });
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
      <Container size="xl" bg="gray.0" data-testid="mainpage-test-id">
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
            {dataArray.map((movie, index) => {
              return (
                <>
                  <Grid.Col md={4} sm={6} key={index}>
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
          <Title
            order={5}
            color="blue.8"
            align="center"
            data-testid="default-msg-test-id"
          >
            We don't have data yet, press a button.
          </Title>
        )}
        {alertVisible && (
            <Alert
                icon={<IconAlertCircle size={16} />}
                withCloseButton
                onClose={() => setAlertVisible(false)}
                title="Service unavailable!"
                color="red"
            >
              Unfortunately, our service is unavailable in this moment! <br />{" "}
              Please, try again!
            </Alert>
        )}
        <CustomFooter />
      </Container>
    </>
  );
};

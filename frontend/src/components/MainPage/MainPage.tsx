import React, { useState } from "react";
import {
  Container,
  createStyles,
  Divider,
  Grid,
  Loader,
  Title,
} from "@mantine/core";
import fabricLogo from "../../utils/fabric-logo.png";
import { CustomHeader } from "../Header/CustomHeader";
import { Actions } from "../Actions/Actions";
import { CustomCard } from "../Items/CustomCard";
import {CustomFooter} from "../CustomFooter/CustomFooter";

export interface data {
    Title: string
    Poster: string
    Year: string
    imdbID: string
    Type?: string
}

export const MainPage = () => {
  const [dataArray, setDataArray] = useState<data[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(false);

  const onBtnClick = (movie: string) => {
    setIsDataLoading(true);
    fetch(` http://www.omdbapi.com/?s=${movie}&apikey=720c3666`)
      .then((resp) => resp.json())
      .then((response) => {
        setIsDataLoading(false);
        setDataArray(response.Search);
        console.log(response);
      })
      .catch((err) => console.error(err));
  };

  return (
    <Container size="xl" bg="gray.0">
      <CustomHeader logo={fabricLogo} />
      <Actions onBtnClick={onBtnClick} />
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
  );
};

import { CircularProgress, Container, createStyles, Grid, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";
import Header from "../components/Header";
import InfiniteList from "../components/infinite-list/InfiniteList";
import { useFetchUser } from "../services";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(2.5),
    },
    loader: {
      padding: theme.spacing(2.5),
      width: '100%',
      textAlign: 'center',
      background: theme.palette.background.paper,
    },
    error: {
      padding: theme.spacing(2.5),
      width: '100%',
      textAlign: 'center',
      background: theme.palette.background.paper,
    },
  })
);

const Home: React.FC = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useFetchUser();
  const classes = useStyles();
  return (
    <>
      <Header />
      <Container>
        {" "}
        {status === "loading" ? (
          <Typography className={classes.loader}><CircularProgress /></Typography>
        ) : status === "error" ? (
          <Typography className={classes.error}>Error: {error?.message}</Typography>
        ) : (
          <Grid className={classes.container} container direction="row" justifyContent="center" >
            <InfiniteList
              data={data!}
              hasNextPage={hasNextPage!}
              isNextPageLoading={isFetchingNextPage}
              loadNextPage={fetchNextPage}
            />
          </Grid>
        )}
      </Container>
    </>
  );
};

export default Home;

import {
  Avatar,
  createStyles,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Theme,
} from "@material-ui/core";
import * as React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { InfiniteData } from "react-query";
import { UserPage } from "../../model";

interface IInfiniteListProps {
  /** Are there more items to load? (This information comes from the most recent API request.) */
  hasNextPage: boolean;
  /** Are we currently loading a page of items? (This may be an in-flight flag in your Redux store for example.) */
  isNextPageLoading: boolean;
  /** List of items loaded so far */
  data: InfiniteData<UserPage>;
  /** Callback function (eg. Redux action-creator) responsible for loading the next page of items */
  loadNextPage: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      minWidth: 320,
      maxWidth: 500,
      backgroundColor: theme.palette.background.paper,
    },
    listItem: {
        padding: theme.spacing(1.5),
    }
  })
);

const InfiniteList: React.FunctionComponent<IInfiniteListProps> = ({
  hasNextPage,
  isNextPageLoading,
  data,
  loadNextPage,
}) => {
    const classes = useStyles();
  if (data === undefined) {
    return null;
  }
  const dataLength = data.pages.reduce((counter, page) => {
    return counter + page.results.length;
  }, 0);
  return (
    <InfiniteScroll
      dataLength={dataLength}
      next={loadNextPage}
      hasMore={!!hasNextPage}
      loader={<div>Loading...</div>}
    >
      <List dense className={classes.root}>
        {data.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.results.map((character) => (
              <ListItem key={character.id} button className={classes.listItem}>
                <ListItemAvatar>
                  <Avatar
                    alt={`Avatar n°${character.firstName}`}
                    src={character.picture}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={`${character.firstName} ${character.lastName}`}
                />
              </ListItem>
            ))}
          </React.Fragment>
        ))}
      </List>
    </InfiniteScroll>
  );
};

export default InfiniteList;

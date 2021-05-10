import moviesAction from "./responses/action.json";

export const getMovies = async ({ genre }) => {
  if (genre == "action") {
    return moviesAction;
  }
};

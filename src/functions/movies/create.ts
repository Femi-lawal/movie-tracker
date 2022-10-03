import "source-map-support/register";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { CreateMovieRequest } from "../../requests/CreateMovieRequest";
import { createMovie } from "../../businessLogic/movie";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const newMovie: CreateMovieRequest = JSON.parse(event.body)?.movie || {};
    console.log(newMovie);
    const { name } = newMovie;

    if (!name) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Movie name is required",
        }),
      };
    }

    const movieItem = await createMovie(newMovie);

    return {
      statusCode: 201,
      body: JSON.stringify({
        item: movieItem,
      }),
    };
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: {
        error: error,
      },
    };
  }
};

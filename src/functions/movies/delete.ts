import "source-map-support/register";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { deleteMovie } from "../../businessLogic/movie";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { movieId } = event.pathParameters;
    const movieItem = await deleteMovie(movieId);

    return {
      statusCode: 204,
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

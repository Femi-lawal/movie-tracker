import "source-map-support/register";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { getMovie } from "../../businessLogic/movie";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { movieId } = event.pathParameters;
    const movieItem = await getMovie(movieId);
    let statusCode = 200;

    if (!movieItem) {
      statusCode = 404;
    }
    return {
      statusCode,
      body: JSON.stringify({
        item: movieItem,
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: {
        error: error,
      },
    };
  }
};

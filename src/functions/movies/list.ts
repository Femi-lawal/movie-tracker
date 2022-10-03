import "source-map-support/register";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { listMovies } from "../../businessLogic/movie";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const movieItems = await listMovies();

    return {
      statusCode: 200,
      body: JSON.stringify({
        items: movieItems,
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

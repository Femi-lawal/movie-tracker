import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { UpdateMovieRequest } from '../../requests/UpdateMovieRequest'
import { updateMovie } from '../../businessLogic/movie'


export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try{
    const { movieId } = event.pathParameters
    const updatedMovie: UpdateMovieRequest = JSON.parse(event.body)?.movie || {};
    console.log(updatedMovie)
    const movieItem = await updateMovie(movieId, updatedMovie)
    console.log(movieItem)

    return {
      statusCode: 200,
      body: JSON.stringify({
        item: movieItem
      })
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: {
        error: error,
      },
    };
  }
}
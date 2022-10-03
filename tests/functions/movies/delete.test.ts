import { handler } from '../../../src/functions/movies/delete';

describe('Movies Delete', () => {
  it('should return status 204', async () => {

    const response = await handler(
      {
        pathParameters: {
          movieId: '1'
      }
    }
    );

    expect(response['statusCode']).toEqual(204);
  });
});
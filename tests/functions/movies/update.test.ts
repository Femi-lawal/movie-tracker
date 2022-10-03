import { handler } from '../../../src/functions/movies/list';

describe('Movies List', () => {
  it('should return status 200', async () => {

    const res = await handler(
      {
        // @ts-expect-error dummy user
        requestContext: {
          authorizer: {
            claims: {
              'custom:role': 'client',
            },
          },
        },
      }
    );

    expect(res['statusCode']).toEqual(200);
  });
});
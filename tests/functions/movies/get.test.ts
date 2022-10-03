import { handler } from "../../../src/functions/movies/get";
let response;

describe("Movies Get", () => {
  beforeAll(async () => {
    response = await handler({
      pathParameters: {
        movieId: "1",
      },
    });
  });

  it("should return status 404", async () => {
    expect(response["statusCode"]).toEqual(404);
  });
});

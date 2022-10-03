import { handler } from "../../../src/functions/movies/list";
let response;

describe("Movies List", () => {
  beforeAll(async () => {
    response = await handler({});
  });

  it("should return status 200", async () => {
    expect(response["statusCode"]).toEqual(200);
  });

  it("should return an array of movies", async () => {
    const parsedBody = JSON.parse(response.body);
    expect(parsedBody?.items).toBeDefined();
  });
});

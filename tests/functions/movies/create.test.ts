import { handler } from "../../../src/functions/movies/create";

const movieObject = {
  movie: {
    name: "RED 2",
    description:
      "Retired CIA agent Frank Moses reunites his unlikely team of elite operatives for a global quest to track down a missing portable nuclear device.",
  },
}
const stringBody = JSON.stringify(movieObject)
let response, parsedBody;

describe("Movies Create", () => {
  beforeAll(async () => {
    response = await handler({
      body: stringBody,
    })
    parsedBody = JSON.parse(response.body);
  })

  it("should return 201", async () => {
    expect(response["statusCode"]).toEqual(201);
  })
  it("should have name and description", async () => {
    expect(parsedBody?.item?.name).toEqual(movieObject?.movie?.name);
    expect(parsedBody?.item?.description).toEqual(movieObject?.movie?.description);
  })
  it("should have movieId and timestamps", async () => {
    expect(parsedBody?.item?.movieId).toBeDefined();
    expect(parsedBody?.item?.createdAt).toBeDefined(); 
    expect(parsedBody?.item?.updatedAt).toBeDefined(); 
  });
});

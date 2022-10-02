/**
 * Fields in a request to update a single movie item.
 */
export interface UpdateMovieRequest {
  name?: string
  description?: string
  genre?: string
  watched?: boolean
  releaseDate?: string
}
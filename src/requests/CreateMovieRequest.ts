/**
 * Fields in a request to create a single movie item.
 */
export interface CreateMovieRequest {
  name: string
  description?: string
  genre?: string
  watched?: boolean
  releaseDate?: string
}

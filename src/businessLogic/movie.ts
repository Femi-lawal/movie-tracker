import { MovieItem } from '../models/MovieItem'
import { MovieAccess } from '../dataLayer/movieAccess'
import { CreateMovieRequest } from '../requests/CreateMovieRequest'
import { UpdateMovieRequest } from '../requests/UpdateMovieRequest'
import * as crypto from 'crypto'

const movieAccess = new MovieAccess()

export async function listMovies (): Promise<MovieItem[]> {
  return movieAccess.listMovies()
}

export async function getMovie (movieId: string): Promise<MovieItem> {
  return movieAccess.getMovie(movieId)
}

export function createMovie (CreateMovieRequest: CreateMovieRequest): Promise<MovieItem> {
  const id = crypto.randomUUID()
  return movieAccess.createMovie({
    movieId: id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...CreateMovieRequest
  })
}

export function updateMovie ( movieId: string, UpdateMovieRequest: UpdateMovieRequest): Promise<MovieItem> {
  return movieAccess.updateMovie(movieId, UpdateMovieRequest)
}

export function deleteMovie (movieId: string): Promise<void> {
  return movieAccess.deleteMovie(movieId)
}

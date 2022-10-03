import * as AWS  from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { DynamoDBClient, UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { MovieItem } from '../models/MovieItem'
import { MovieUpdate } from '../models/MovieUpdate'

export class MovieAccess {

  constructor(
    private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
    private readonly  client = new DynamoDBClient({ region: process.env.AWS_REGION }),
    private readonly moviesTable = process.env.MOVIES_TABLE
  ) {}

  async listMovies(): Promise<MovieItem[]> {

    const result = await this.docClient.scan({
      TableName: this.moviesTable
    }).promise()

    const items = result.Items

    return items as MovieItem[]
  }

  async getMovie(movieId: string): Promise<MovieItem> {
    
    const result = await this.docClient.get({
      TableName: this.moviesTable,
      Key: {
        movieId
      }
    }).promise()

    const item = result.Item

    return item as MovieItem
  }

  async createMovie(MovieItem: MovieItem) {

    await this.docClient.put({
      TableName: this.moviesTable,
      Item: MovieItem,
    }).promise()

    return MovieItem
  }

  async updateMovie(movieId: string, movieUpdate: MovieUpdate) {
    try{
    const itemKeys = Object.keys(movieUpdate);
  
    const { Attributes } = await this.client.send(
      new UpdateItemCommand({
        TableName: this.moviesTable,
        Key: marshall(movieId),
        ReturnValues: 'ALL_NEW',
        UpdateExpression: `SET ${itemKeys.map((_, index) => `#field${index} = :value${index}`).join(', ')}`,
        ExpressionAttributeNames: itemKeys.reduce(
          (previousValues, currentValue, index) => ({ ...previousValues, [`#field${index}`]: currentValue }),
          {}
        ),
        ExpressionAttributeValues: marshall({
          ...itemKeys.reduce(
            (previousValues, currentValue, index) => ({ ...previousValues, [`:value${index}`]: movieUpdate[currentValue] }),
            {}
          )
        }),
      }) 
    );
  
    return unmarshall(Attributes);
    } catch (error) {
      console.log(error)
    }
  }

  async deleteMovie(movieId: string, ) {

    await this.docClient.delete({
      TableName: this.moviesTable,
      Key: {
        movieId
      }
    }).promise()

  }

}
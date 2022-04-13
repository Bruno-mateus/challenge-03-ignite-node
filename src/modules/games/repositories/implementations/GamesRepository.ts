import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    // Complete usando query builder
    /*A consulta também deve ser feita de forma case insensitive, ignorando caixa alta onde no banco não existe. Para exemplo, considerando a busca exemplificada acima, o retorno deve ser o mesmo caso o parâmetro passado seja uma string `"nEEd"`. 
    Você pode buscar pelo uso do **ILIKE** no Postgres para resolver esse problema. Lembre-se que aqui deve ser usado **query builder** para realizar a consulta. */
    return this.repository
      .createQueryBuilder("games")
      .where(`games.title ILIKE '%${param}%'`)
      .getMany();
  }

  async countAllGames(): Promise<[{ count: string }]> {
    // Esse método deve retornar uma contagem do total de games existentes no banco. Deve ser usada raw query para essa consulta.
    // Complete usando raw query
    return this.repository.query(
      `
        SELECT COUNT(*)
        FROM  games
      `
    );
  }

  async findUsersByGameId(id: string): Promise<User[]> {

    // Esse método deve receber o `Id` de um game e retornar uma lista de todos os usuários que possuem o game do `Id` informado. 

    // Complete usando query builder
    return this.repository
      .createQueryBuilder("games")
      .relation(Game, "users")
      .of(id)
      .loadMany()

  }
}

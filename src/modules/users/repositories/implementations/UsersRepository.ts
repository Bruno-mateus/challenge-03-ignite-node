import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    // Esse método deve receber o Id de um usuário e retornar os dados do usuário encontrado juntamente com os dados de todos os games que esse usuário possui.
    const find = await this.repository.findOneOrFail({ id: user_id }, { relations: ["games"] })

    return find

  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    // Complete usando raw query
    //Esse método deve retornar a listagem de usuários cadastrados em ordem alfabética (ASC).

    return this.repository.query(
      `
        SELECT *
        FROM users
        ORDER BY first_name ASC
      `
    );
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    /*
    Esse método deve receber `first_name` e `last_name` e retornar um usuário que possua os mesmos `first_name` e `last_name`. Aqui você deve encontrar o usuário ignorando se o argumento passado está em caixa alta ou não. 
    Por exemplo, suponhamos que existe um usuário onde o `first_name` é `Danilo` e o `last_name` é `Vieira`. O método deve retornar o usuário mesmo que os argumentos passados sejam `daNiLo` para `first_name` e `vIeiRA` para `last_name`
*/
    return this.repository.query(
      `
      SELECT * 
      FROM users
      WHERE LOWER(first_name) = LOWER($1)
      AND LOWER(last_name) = LOWER($2)
      `, [first_name, last_name]
    ); // Complete usando raw query
  }
}

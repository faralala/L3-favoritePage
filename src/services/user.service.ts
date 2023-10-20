import localforage from 'localforage';
import { genUUID } from '../utils/helpers';

const ID_DB = '__wb-userId';

class UserService {
  private userId: string | null = null;

  async init() {
    this.userId = await this.getId();
    console.warn('UserID: ', this.userId);
  }

  async getUserId(): Promise<string> {
    if (!this.userId) {
      this.userId = await this.getId();
    }
    return this.userId;
  }

  async getId(): Promise<string> {
    let id = (await localforage.getItem(ID_DB)) as string;

    if (!id) id = await this._setId();

    return id;
  }

  private async _setId(): Promise<string> {
    const id = genUUID();
    await localforage.setItem(ID_DB, id);
    return id;
  }
}

export const userService = new UserService();

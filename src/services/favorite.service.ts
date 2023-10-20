import localforage from 'localforage';
import { ProductData } from 'types';

const DB = '__wb-favorite';

class FavoriteService {
  static maxItems: number = 100;
  init() {
    this._checkAndDisplayFavoriteLink();
  }

  async get(): Promise<ProductData[]> {
    try {
      const items = await localforage.getItem<Array<ProductData>>(DB);
      return items || [];
    } catch (error) {
      return [];
    }
  }

  async set(data: Array<ProductData>) {
    await localforage.setItem(DB, data);
  }

  async add(product: ProductData) {
    try {
      const data = await this.get();
      const isProductInFavorites = data.some((item) => item.id === product.id);
      if (!isProductInFavorites) {
        data.unshift(product);
        if (data.length > FavoriteService.maxItems) {
          data.pop();
        }
        await this.set(data);
        this._checkAndDisplayFavoriteLink();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async remove(product: ProductData) {
    try {
        const data = await this.get();
        const updatedData = data.filter((item) => item.id !== product.id);
        await this.set(updatedData);
        this._checkAndDisplayFavoriteLink();
    } catch (error) {
        console.error(error);
    }
}

  async check(product: ProductData) {
    const data = await this.get();
    return data.some((item) => item.id === product.id);
  }

  async hasFavorites() {
    const data = await this.get();
    return data.length > 0;
  }

  async _checkAndDisplayFavoriteLink() {
    const favoriteLink = document.querySelector('.favorite-link') as HTMLElement;
  
    if (favoriteLink) {
      const hasFavorites = await this.hasFavorites();
        if (hasFavorites) {
          favoriteLink.style.display = '';
        } else {
          favoriteLink.style.display = 'none';
        }
    }
  }
}


export const favoriteService = new FavoriteService();

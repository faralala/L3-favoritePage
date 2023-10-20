import { favoriteService } from '../../services/favorite.service';
import { Component } from '../component';
import html from './favorite.tpl.html';
import { ProductData } from 'types';
import { ProductList } from '../productList/productList';

class Favorite extends Component {
  products!: ProductData[];
  favoriteList: ProductList;

  constructor() {
    super(html);
    this.favoriteList = new ProductList();
    this.favoriteList.attach(this.view.favorite);
  }

  async render() {
    const favoriteItems = await favoriteService.get();
    this.products = favoriteItems;
    this.favoriteList.update(this.products);
  }
}


export const favoriteComp = new Favorite();

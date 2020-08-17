import { StorageService } from "./storage.service";
import { Cart } from "../models/cart.model";
import { ProdutoDTO } from "../models/produto.dto";
import { Injectable } from "@angular/core";

@Injectable()
export class CartService {

  constructor(public localStorage: StorageService) {
  }

  createOrClearCart(): Cart {
    let cart: Cart = {itens: []};
    this.localStorage.setCart(cart);
    return cart;
  }

  getCart(): Cart {
    let cart: Cart = this.localStorage.getCart();
    if(cart == null) {
      cart = this.createOrClearCart();
    }
    return cart;
  }

  addProduto(prod: ProdutoDTO): Cart {
    let cart = this.getCart();
    let position = cart.itens.findIndex(c => c.produto.id == prod.id);
    if(position == -1) {
      cart.itens.push({quantidade: 1, produto: prod})
    }
    this.localStorage.setCart(cart);
    return cart;
  }

  removeProduto(prod: ProdutoDTO): Cart {
    let cart = this.getCart();
    let position = cart.itens.findIndex(c => c.produto.id == prod.id);
    if(position != -1) {
      cart.itens.splice(position, 1);
    }
    this.localStorage.setCart(cart);
    return cart;
  }

  increaseQuantity(prod: ProdutoDTO): Cart {
    let cart = this.getCart();
    let position = cart.itens.findIndex(c => c.produto.id == prod.id);
    if(position != -1) {
      cart.itens[position].quantidade++;
    }
    this.localStorage.setCart(cart);
    return cart;
  }

  decreaseQuantity(prod: ProdutoDTO): Cart {
    let cart = this.getCart();
    let position = cart.itens.findIndex(c => c.produto.id == prod.id);
    if(position != -1) {
      cart.itens[position].quantidade--;
      if(cart.itens[position].quantidade < 1) {
        cart = this.removeProduto(prod);
      }
    }
    this.localStorage.setCart(cart);
    return cart;
  }

  total(): number {
    let cart = this.getCart();
    let sum: number = 0;
    cart.itens.forEach(c => sum += c.produto.preco * c.quantidade);
    return sum;
  }

}

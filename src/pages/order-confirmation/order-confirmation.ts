import { ClienteService } from './../../services/domain/cliente.service';
import { EnderecoDTO } from './../../models/endereco.dto';
import { CartService } from './../../services/cart.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartItem } from '../../models/cartItem.model';
import { ClienteDTO } from '../../models/cliente.dto';

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  pedido: PedidoDTO;
  cartItems: CartItem[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartService,
    public clienteService: ClienteService) {
    this.pedido = this.navParams.get('pedido');
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().itens;
    this.clienteService.findById(this.pedido.cliente.id)
      .subscribe(response => {
        this.cliente = response as ClienteDTO;
        this.endereco = this.findEnderecoById(this.pedido.enderecoDeEntrega.id, response['enderecos']);
      },
      error => {
        this.navCtrl.setRoot('HomePage');
      })
  }

  private findEnderecoById(id: string, list: EnderecoDTO[]): EnderecoDTO {
    let position = list.findIndex(x => x.id === id);
    return list[position];
  }

  total(){
    this.cartService.total();
  }

}

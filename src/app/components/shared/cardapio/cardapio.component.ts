import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../services/produto.service';

interface ProdutoResponse {
  success: boolean;
  message: string;
  data: Produto[];
}

interface Produto {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
}

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.scss'],
})
export class CardapioComponent implements OnInit {
  produtos: Produto[] = [];

  constructor(private produtoService: ProdutoService) {}

  ngOnInit() {
    this.produtoService.getProdutos().subscribe((response: ProdutoResponse) => {
      if (response.success) {
        this.produtos = response.data;
      }
    });
  }
}

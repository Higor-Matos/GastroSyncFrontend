import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ServicoDeNavegacao } from '../../services/servicodenavegacao.service';

@Component({
  selector: 'barradenavegacaoinferior',
  templateUrl: './barradenavegacaoinferior.component.html',
  styleUrls: ['./barradenavegacaoinferior.component.scss'],
})
export class BarradeNavegacaoInferiorComponent implements OnInit {
  opcoesEsquerda: any[] = [];
  opcoesDireita: any[] = [];

  constructor(
    private router: Router,
    private servicodenavegacao: ServicoDeNavegacao
  ) {}

  ngOnInit(): void {
    // Configuração inicial com base na rota atual
    this.servicodenavegacao.definirTipoUsuarioComBaseNaRota(this.router.url);
    this.atualizarOpcoesDeNavegacao();

    // Adiciona um listener para mudanças de rota
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.servicodenavegacao.definirTipoUsuarioComBaseNaRota(
          event.urlAfterRedirects
        );
        this.atualizarOpcoesDeNavegacao();
      }
    });
  }

  private atualizarOpcoesDeNavegacao(): void {
    const todasOpcoes = this.servicodenavegacao.obterOpcoesDeNavegacao();
    this.opcoesEsquerda = todasOpcoes.slice(0, 2);
    this.opcoesDireita = todasOpcoes.slice(2);
  }
}

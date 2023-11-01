import { Component, OnInit } from '@angular/core';
import { ServicoDeNavegacao } from '../../services/servicodenavegacao.service';
import { RotaService } from '../../services/rota.service';

@Component({
  selector: 'barradenavegacaoinferior',
  templateUrl: './barradenavegacaoinferior.component.html',
  styleUrls: ['./barradenavegacaoinferior.component.scss'],
})
export class BarradeNavegacaoInferiorComponent implements OnInit {
  opcoesEsquerda: any[] = [];
  opcoesDireita: any[] = [];

  constructor(
    private servicodenavegacao: ServicoDeNavegacao,
    private rotaService: RotaService // Injete o RotaService aqui
  ) {}

  ngOnInit(): void {
    // Configuração inicial com base na rota atual
    this.servicodenavegacao.definirTipoUsuarioComBaseNaRota(
      this.rotaService.urlAtual()
    );
    this.atualizarOpcoesDeNavegacao();
  }

  get tipoUsuario(): 'admin' | 'client' {
    return this.servicodenavegacao.tipoUsuario;
  }

  private atualizarOpcoesDeNavegacao(): void {
    const todasOpcoes = this.servicodenavegacao.obterOpcoesDeNavegacao();
    this.opcoesEsquerda = todasOpcoes.slice(0, 2);
    this.opcoesDireita = todasOpcoes.slice(2);
  }
}

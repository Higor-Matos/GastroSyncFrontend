import { Component, Inject } from '@angular/core';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-painel-opcoes-superior',
  templateUrl: './painelopcoescliente.component.html',
})
export class PainelOpcoesSuperiorComponent {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<PainelOpcoesSuperiorComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public dados: { opcoes: string[] }
  ) {}

  realizarAcao(opcao: string): void {
    this.bottomSheetRef.dismiss();
  }
}

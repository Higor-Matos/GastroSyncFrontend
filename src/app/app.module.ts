import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
// Importando corretamente os módulos do Angular Material
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';

// Componentes e módulos da aplicação
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuSuperiorComponent } from './components/shared/config/menusuperior/menusuperior.component';
import { BarradeNavegacaoInferiorComponent } from './components/shared/config/barradenavegacaoinferior/barradenavegacaoinferior.component';
import { SharedModule } from './components/shared/module/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { PagamentoDialogComponent } from './components/modules/client/pagamentos/pagamentodialog/pagamento-dialog.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    MenuSuperiorComponent,
    BarradeNavegacaoInferiorComponent,
    PagamentoDialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    RouterModule,
    SharedModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: true,
      preventDuplicates: true,
    }),
    FontAwesomeModule,
    MatBottomSheetModule,
    MatExpansionModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

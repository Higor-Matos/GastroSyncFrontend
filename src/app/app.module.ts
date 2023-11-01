import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

// Importando corretamente os módulos do Angular Material
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

// Componentes e módulos da aplicação
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlterarTemaComponent } from './components/modules/alternartema/alternartema.component';
import { BarradeNavegacaoInferiorComponent } from './components/modules/barradenavegacaoinferior/barradenavegacaoinferior.component';
import { SharedModule } from './components/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    AlterarTemaComponent,
    BarradeNavegacaoInferiorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    RouterModule,
    SharedModule,

    MatBottomSheetModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

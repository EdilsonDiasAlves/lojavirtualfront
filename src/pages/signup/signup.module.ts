import { CidadeService } from './../../services/domain/cidade.service';
import { EstadoService } from './../../services/domain/estado.service';
import { CategoriaService } from './../../services/domain/categoria.service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
  ],
  providers: [
    EstadoService,
    CidadeService
  ]
})
export class SignupPageModule {}

import { Component } from '@angular/core';
import {PageTemplateComponent} from '../../../components/templates/page-template/page-template.component';
import {ButtonOrderComponent} from '../../../components/atoms/button-order/button-order.component';
import {TitleComponent} from '../../../components/atoms/title/title.component';
import {ModalComponent} from '../../../components/molecules/modal/modal.component';

@Component({
  selector: 'ventas-page',
  imports: [
    PageTemplateComponent,
    ButtonOrderComponent,
    TitleComponent,
    ModalComponent
  ],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.scss'
})
export class VentasComponent {

  ngOnInit() : void{
    console.log("init.....");
  }

  onClickCreate = () => {
    console.log("ventas!!");
  }
}

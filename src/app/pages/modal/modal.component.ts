import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export default class ModalComponent {

  @Input() showModal!: boolean; // Propiedad de entrada para controlar la visibilidad del modal
  @Output() closeModal = new EventEmitter<void>(); // Evento para cerrar el modal

  cerrarModal() {
    this.closeModal.emit(); // Emitir el evento para cerrar el modal

  }
}

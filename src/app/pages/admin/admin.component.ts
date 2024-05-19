import { Component, Input, inject } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  storeService = inject(StoreService);
  editMode = this.storeService.editMode();
  router = inject(Router);
  addEditForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    quantity: new FormControl(0, [Validators.required]),
  });

  ngOnInit() {

    const product = this.storeService.item$.value;
    this.editMode ? this.addEditForm.setValue({
      name: product?.name ?? '',
      description: product?.description ?? '',
      price: Number(product?.price) ?? '',
      quantity: Number(product?.quantity) ?? ''
    }) : '';
  }

  editItem() {
    this.storeService.saveItem({
      id: this.storeService.item$.value?.id ?? 0,
      name: this.addEditForm?.value.name ?? '',
      description: this.addEditForm?.value.description ?? '',
      price: Number(this.addEditForm?.value.price) ?? 0,
      quantity: Number(this.addEditForm?.value.quantity) ?? 0
    });
    this.router.navigate(['/shop']);
  }

  addItem() {
    this.storeService.addItem({
      id: Date.now(),
      name: this.addEditForm?.value.name ?? '',
      description: this.addEditForm?.value.description ?? '',
      price: Number(this.addEditForm?.value.price) ?? 0,
      quantity: Number(this.addEditForm?.value.quantity) ?? 0
    });
    this.router.navigate(['/shop']);
  }
}

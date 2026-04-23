import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './confirmation.html',
  styleUrl: './confirmation.css',
})
export class Confirmation {
  total: number = 0;
  name: string = '';

  constructor() {}

  ngOnInit() {
    const nav = history.state;

    this.name = nav?.name || 'Customer';
    this.total = nav?.total || 0;
  }
}

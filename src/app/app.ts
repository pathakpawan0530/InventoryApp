import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Inventory } from './pages/inventory/inventory';
import { Bill } from './pages/bill/bill';
import { Customer } from './pages/customer/customer';
import { Home } from './pages/home/home';
import { Header } from './pages/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink,Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}

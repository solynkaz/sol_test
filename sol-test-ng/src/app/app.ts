import {Component, inject, signal} from '@angular/core';
import {environment} from './environments/environment';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly _httpClient = inject(HttpClient);
  protected response = signal<string | null>(null);

  protected async tryToSendRequest(): Promise<void> {
    this._httpClient.get(`${environment.dotnetUrl}/hp`, { responseType: 'text' }).subscribe({
      next: (value) => this.response.set(value),
      error: (error) => this.response.set(`Request failed: ${error.message}`),
    });
  }
}

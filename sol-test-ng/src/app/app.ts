import {Component, inject, isDevMode, signal} from '@angular/core';
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
  protected readonly environment = environment;

  protected response = signal<string | null>(null);
  protected backendUrl = signal<string>(isDevMode() ? '' : environment.dotnetUrl + '/hp');

  protected async tryToSendRequest(): Promise<void> {
    this._httpClient.get(`${environment.dotnetUrl}/hp`, { responseType: 'text' }).subscribe({
      next: (value) => this.response.set(value),
      error: (error) => this.response.set(`Request failed: ${error.message}`),
    });
  }

}

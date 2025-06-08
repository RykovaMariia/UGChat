import { storageService } from '@/services/storage.service';

class AuthService {
  private readonly STORAGE_KEY = 'userName';
  private userName: string | null = null;

  constructor() {
    this.load();
  }

  private load(): void {
    this.userName = storageService.getData(this.STORAGE_KEY);
  }

  public login(name: string): void {
    this.userName = name;
    storageService.saveData(this.STORAGE_KEY, name);
  }

  public logout(): void {
    this.userName = null;
    storageService.removeData(this.STORAGE_KEY);
  }

  public getUserName(): string | null {
    return this.userName;
  }

  public isAuthorized(): boolean {
    return !!this.userName;
  }
}

export const authService = new AuthService();

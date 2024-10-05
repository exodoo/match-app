import { ApiClientService } from "../service";

export class Auth {
    private static _instance: Auth;
    private apiClient: ApiClientService;
    
    private constructor() {
        this.apiClient = ApiClientService.getInstance();
    }
    
    static getInstance() {
        if (!Auth._instance) {
        Auth._instance = new Auth();
        }
        return Auth._instance;
    }
    
    async signUp(name: string) {
        const response = await this.apiClient.post<{ id: string }>('/api/games/tinder/gamers', {
            name: name,
            username: name
        });
        localStorage.setItem('id', response.id);
    }
    
    async logout() {
        localStorage.removeItem('id');
    }
    
    async isLoggedIn() {
        return !!localStorage.getItem('id');
    }
}
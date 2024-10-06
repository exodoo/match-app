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
        const response = await this.apiClient.post<{ id: string }>('/games/tinder/gamers', {
            name: name,
            username: name
        }, true);
        localStorage.setItem('id', response.id);
        return Promise.resolve(response);
    }
    
    async logout() {
        localStorage.removeItem('id');
    }
    
    isLoggedIn() {
        return !!localStorage.getItem('id');
    }
}
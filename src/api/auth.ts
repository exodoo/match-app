import { ApiClientService } from "../service";
import { Planets } from "./planets";

export class Auth {
    private static _instance: Auth;
    private apiClient: ApiClientService;

    private static readonly _authKey = 'id';
    
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
        localStorage.setItem(Auth._authKey, response.id);
        return Promise.resolve(response);
    }
    
    async logout() {
        localStorage.removeItem(Auth._authKey);
        Planets.getInstance().clearRatedPlanets();
    }
    
    isLoggedIn() {
        return !!localStorage.getItem(Auth._authKey);
    }
}
import { ApiClientService } from "../service";

export class Planets {
    private static _instance: Planets;
    private apiClient: ApiClientService;
    
    private constructor() {
        this.apiClient = ApiClientService.getInstance();
    }
    
    static getInstance() {
        if (!Planets._instance) {
            Planets._instance = new Planets();
        }
        return Planets._instance;
    }
    
    async getPlanets() {
        const response = await this.apiClient.get('/exoplanets/', {}, true);
        return response;
    }

    async getPlanet(id: string) {
        const response = await this.apiClient.get(`/exoplanets/${id}`, {}, true);
        return response;
    }
}
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
        const response = await this.apiClient.post<{ id: string }>('/api/planets/', {});
        return response;
    }
}
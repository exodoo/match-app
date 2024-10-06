import { ApiClientService } from "../service";

// TODO: Add Planet type
type PlanetListResponse = {
    items: Array<{ id: number } & unknown>;
    total: number;
};

export class Planets {
    private static _instance: Planets;
    private apiClient: ApiClientService;

    private static RATE_PLANETS_KEY = 'ratedPlanets';

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
        const { items } = await this.apiClient.get<PlanetListResponse>('/exoplanets', {}, true);
        const ratedPlanets = this.getRatedPlanets();
        return items.filter((planet) => !ratedPlanets.includes(planet.id));
    }

    async getPlanet(id: string) {
        const response = await this.apiClient.get(`/exoplanets/${id}`, {}, true);
        return response;
    }

    getRatedPlanets() {
        const rawRatedPlanets = localStorage.getItem(Planets.RATE_PLANETS_KEY);
        const ratedPlanets = new Array();
        try {
            if (rawRatedPlanets) {
                ratedPlanets.push(...JSON.parse(rawRatedPlanets));
            }
        } catch (e) {
            console.error('Error parsing rated planets', e);
        }
        return ratedPlanets;
    }

    async ratePlanet(id: string, rating: number) {
        const ratedPlanets = this.getRatedPlanets();
        ratedPlanets.push(id);
        localStorage.setItem(Planets.RATE_PLANETS_KEY, JSON.stringify(ratedPlanets));
        return Promise.resolve();
    }
}
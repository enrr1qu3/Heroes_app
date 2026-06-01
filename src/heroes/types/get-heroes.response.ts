import type { Hero } from "./hero.interface";

export interface HeroesResponse {
    heroes: Hero[];
    pages: number;
    total: number;
}

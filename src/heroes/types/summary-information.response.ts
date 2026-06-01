import type { Hero } from "./hero.interface";

export interface SummaryInformationResponse {
    heroCount: number;
    smartestHero: Hero;
    strongestHero: Hero;
    totalHeroes: number;
    villainCount: number;
}


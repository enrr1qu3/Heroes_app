import { describe, expect, test } from "vitest";
import { getHero } from "./get-heroes.action";

// const BASE_URL = import.meta.env.VITE_API_URL;

describe('getHeroAction', () => {
    test('should fetch hero data and return with complet image url', async () => {
        // const heroId = 1;
        // const hero = await getHero(heroId.toString());
        // console.log(hero);
        // expect(hero.alias).toBe('Superman');
        // expect(hero.image).toBe(`${BASE_URL}/images/${heroId}.jpeg`);
        // expect(typeof hero.id).toBe('string');

        const result = await getHero('clark-kent');
        const resultImageUrl = result.image;
        expect(resultImageUrl).toContain('http')
        expect(result).toStrictEqual({
            id: expect.any(String),
            name: expect.any(String),
            slug: expect.any(String),
            alias: 'Superman',
            powers: [
                'Súper fuerza',
                'Vuelo',
                'Visión de calor',
                'Visión de rayos X',
                'Invulnerabilidad',
                'Súper velocidad'
            ],
            description: 'El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.',
            strength: 10,
            intelligence: 8,
            speed: 9,
            durability: 10,
            team: 'Liga de la Justicia',
            image: 'http://localhost:3001/images/1.jpeg',
            firstAppearance: '1938',
            status: 'Active',
            category: 'Hero',
            universe: 'DC'
        });


    });
    test('should throw an error if hero is not found', async () => {
        const errorMenssage = {
            message: 'Hero not found',
            error: 'Not Found',
            statusCode: 404
        };
        // try {
        //     await getHero('Superman2');
        // } catch (error) {
        //     console.error('El error de la petición es:', error);
        //     // Forzamos el fallo para que Vitest muestre el error en la consola
        //     throw error;
        // }
        // FORMA CORRECTA DE VERIFICAR LA RESPUESTA 
        // await expect(getHero('Superman2'))
        //     .rejects
        //     .toHaveProperty(['response', 'data'], errorMenssage);
        // Funciona por si solo
        // await getHero('batman-2').catch(error => {
        //     // console.log(error)
        //     expect(error.response.data).toStrictEqual(errorMenssage);
        //     expect(error).toBeDefined();
        //     expect(error.status).toBe(404);
        //     expect(error.message).toBe('Request failed with status code 404')
        // })
        const result = await getHero('batman-2').catch(error => {
            // console.log(error)
            expect(error.response.data).toStrictEqual(errorMenssage);
            expect(error).toBeDefined();
            expect(error.status).toBe(404);
            expect(error.message).toBe('Request failed with status code 404')
        })

        expect(result).toBeUndefined();
    });
});
import { use } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { FavoriteHeroContext, FavoriteHeroProvider } from "./FavoriteHeroContext";
import type { Hero } from "../types/hero.interface";

const mockHero = {
    id: '1',
    name: 'Batman',
} as Hero;


const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
})

const TestComponent = () => {
    const { favoriteCount, favorites, isFavorite, toggleFavorite } = use(FavoriteHeroContext);
    return (
        <div>
            <div data-testid="favorite-count">{favoriteCount}</div>
            <div data-testid="favorite-list">{favorites.map(hero => (
                <div key={hero.id} data-testid={`hero-${hero.id}`}>
                    {hero.name}
                </div>
            ))}
            </div>
            <button data-testid="toggle-favorite"
                onClick={() => toggleFavorite(mockHero)}
            >
                Toggle Favorite
            </button>
            <div data-testid='is-favorite'>
                {isFavorite(mockHero).toString()}
            </div>

        </div>
    )
};

const renderContextTest = () => {
    return render(
        <FavoriteHeroProvider>
            <TestComponent />
        </FavoriteHeroProvider>
    )
};


describe('FavoriteHeroProvider', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    })

    test('should initialize with default values', () => {
        renderContextTest();
        // screen.debug();
        expect(screen.getByTestId('favorite-count').textContent).toBe('0');
        expect(screen.getByTestId('favorite-list').children.length).toBe(0);
    });

    test('should add hero to favorites when toggleFavorite is called with new Heroes', () => {
        renderContextTest();
        const button = screen.getByTestId('toggle-favorite');
        fireEvent.click(button);
        // screen.debug();
        // console.log(localStorage.getItem('favorites'));
        expect(screen.getByTestId('favorite-count').textContent).toBe('1');
        expect(screen.getByTestId('is-favorite').textContent).toBe('true');
        expect(screen.getByTestId('hero-1').textContent).toBe('Batman');

        expect(localStorageMock.setItem).toHaveBeenCalled();
        expect(localStorageMock.setItem).toHaveBeenCalledWith('favorites', '[{"id":"1","name":"Batman"}]',)
        // expect(localStorage.getItem('favorites')).toBe('[{"id":"1","name":"Batman"}]');

    });

    test('should remove hero to favorites when toggleFavorite is called ', () => {
        // localStorage.setItem('favorites', JSON.stringify([mockHero]));
        localStorageMock.getItem.mockReturnValue(JSON.stringify([mockHero]));
        renderContextTest();

        const button = screen.getByTestId('toggle-favorite');
        fireEvent.click(button);

        expect(screen.getByTestId('favorite-count').textContent).toBe('0');
        expect(screen.getByTestId('is-favorite').textContent).toBe('false');
        expect(screen.queryByTestId('hero-1')).toBeNull();
        expect(localStorageMock.setItem).toHaveBeenCalled();
        expect(localStorageMock.setItem).toHaveBeenCalledWith('favorites', '[]');
        // expect(localStorage.getItem('favorites')).toBe('[]');
        // screen.debug();
    })
});
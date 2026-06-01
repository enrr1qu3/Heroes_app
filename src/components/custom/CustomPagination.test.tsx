import { describe, expect, test, vi } from "vitest";
import { MemoryRouter } from 'react-router'
import { fireEvent, render, screen } from "@testing-library/react";
import { CustomPagination } from './CustomPagination';
import type { PropsWithChildren } from "react";

vi.mock('../ui/button', () => ({
    Button: ({ children, ...props }: PropsWithChildren) => (<button {...props}>{children}</button>),
}))

const renderWithRouter = (
    component: React.ReactElement,
    initialEntries: string[] = ['']
) => {
    return render(
        <MemoryRouter
            initialEntries={initialEntries}
        >
            {component}
        </MemoryRouter>
    )
};

describe('CustomPagination', () => {
    test('should render component with default values', () => {
        renderWithRouter(<CustomPagination totalPages={5} />,);

        expect(screen.getByText('Anteriores')).toBeDefined();
        expect(screen.getByText('Siguientes')).toBeDefined();

        expect(screen.getByText('1')).toBeDefined();
        expect(screen.getByText('2')).toBeDefined();
        expect(screen.getByText('3')).toBeDefined();
        expect(screen.getByText('4')).toBeDefined();
        expect(screen.getByText('5')).toBeDefined();
    });

    test('should desabled previous buttom when page is 1', () => {
        renderWithRouter(<CustomPagination totalPages={5} />);
        const previousButtom = screen.getByText('Anteriores');
        expect(previousButtom.getAttributeNames()).toContain('disabled');
    });

    test('should disabled next button when we are in the last page', () => {
        renderWithRouter(<CustomPagination totalPages={5} />, ['/?page=5']);
        const nextButtom = screen.getByText('Siguientes');
        // screen.debug(nextButtom);
        expect(nextButtom.getAttributeNames()).toContain('disabled');
    });

    test('should disabled button 3 when we are in page 3', () => {
        renderWithRouter(<CustomPagination totalPages={10} />, ['/?page=3']);
        const button3 = screen.getByText('3');
        expect(button3.getAttribute('variant')).toBe('default');
    });

    test('should change page when click on number button', () => {
        renderWithRouter(<CustomPagination totalPages={10} />, ['/?page=3']);
        const button2 = screen.getByText('2');
        const button3 = screen.getByText('3');
        expect(button2.getAttribute('variant')).toBe('outline');
        expect(button3.getAttribute('variant')).toBe('default');
        fireEvent.click(button2);
        expect(button2.getAttribute('variant')).toBe('default');
         expect(button3.getAttribute('variant')).toBe('outline');
    });

});
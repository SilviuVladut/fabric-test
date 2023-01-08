import "@testing-library/jest-dom";
import * as React from "react";
import { render, screen } from "@testing-library/react";
import {CustomFooter} from "../../components/CustomFooter/CustomFooter";


test('footer is render', () => {
    render(<CustomFooter />);
    const footer = screen.getByTestId('footer-test-id');
    expect(footer).toBeInTheDocument();
})

test('footer render text', () => {
    render(<CustomFooter />);
    const content = screen.getByTestId('content-test-id');

    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent('Fabric - Technical Test © 2023');
})

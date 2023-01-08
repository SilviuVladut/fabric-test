import "@testing-library/jest-dom";
import * as React from "react";
import { CustomHeader } from "../../components/Header/CustomHeader";
import { render, screen } from "@testing-library/react";

const logo: string = "https://www.fabricdata.com/images/fabric-logo.png";


test('header is render', () => {
    render(<CustomHeader logo={logo} />);
    const header = screen.getByTestId('test-logo-1');
    expect(header).toBeInTheDocument();
})

test('header have a link', () => {
    render(<CustomHeader logo={logo} />);
    const header = screen.getByTestId('test-logo-1');
    expect(header.children[0]).toHaveAttribute('href',"/");
    expect(header.children[0].children[0]).toHaveAttribute('src',logo);
})

test('header have a link and an img', () => {
    render(<CustomHeader logo={logo} />);
    const header = screen.getByTestId('test-logo-1');
    expect(header.children[0].children[0]).toHaveAttribute('src',logo);
})

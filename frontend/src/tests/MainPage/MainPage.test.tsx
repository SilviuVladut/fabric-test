import "@testing-library/jest-dom";
import * as React from "react";
import { fireEvent, render, screen} from "@testing-library/react";
import {MainPage} from "../../components/MainPage/MainPage";


test('mainpage is render', () => {
    render(<MainPage />);
    const mainPageContainer = screen.getByTestId('mainpage-test-id');
    expect(mainPageContainer).toBeInTheDocument();
})

test('show `Matrix` movies', async () => {
    render ( <MainPage/> );
    const infoForMatrix = screen.getByTestId('actions-btn1');
    const noDataMsg = screen.getByTestId('default-msg-test-id');
    expect (noDataMsg).toBeInTheDocument();
    fireEvent.click(infoForMatrix);
    expect(await screen.findByText("The Matrix Reloaded")).toBeInTheDocument();
})

test('show `Matrix Revolutions` movies', async () => {
    render ( <MainPage/> );
    const infoForMatrix = screen.getByTestId('actions-btn1');
    const noDataMsg = screen.getByTestId('default-msg-test-id');
    expect (noDataMsg).toBeInTheDocument();
    fireEvent.click(infoForMatrix);
    expect(await screen.findByText("The Matrix Revolutions")).toBeInTheDocument();
})

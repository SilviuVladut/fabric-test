import "@testing-library/jest-dom";
import * as React from "react";
import { render, screen} from "@testing-library/react";
import { Actions } from "../../components/Actions/Actions";

test("actions is render", () => {
  render(
    <Actions
      onBtnClick={() => alert("test1")}
      onSortClick={() => alert("test2")}
      sortDisabled={false}
    />
  );
  const container = screen.getByTestId("actions-test-id");
  expect(container).toBeInTheDocument();
});

test("actions have 3 btns", () => {
  render(
    <Actions
      onBtnClick={() => alert("test1")}
      onSortClick={() => alert("test2")}
      sortDisabled={false}
    />
  );
  const btn1 = screen.getByTestId("actions-btn1");
  const btn2 = screen.getByTestId("actions-btn2");
  const btn3 = screen.getByTestId("actions-btn3");
  expect(btn1).toBeInTheDocument();
  expect(btn2).toBeInTheDocument();
  expect(btn3).toBeInTheDocument();
});

test("actions have sort btn and change value", () => {
  render(
      <Actions
          onBtnClick={() => alert("test1")}
          onSortClick={() => alert("test2")}
          sortDisabled={false}
      />
  );
  const btn4 = screen.getByTestId("actions-btn4");
  expect(btn4).toBeInTheDocument();
});

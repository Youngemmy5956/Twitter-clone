import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "./Counter";

test("increase counter", () => {
  render (<Counter/>);


const counter = screen.getByTestId("counter");
const increamentBtn = screen.getByTestId("increament");

fireEvent.click(increamentBtn);

expect(counter).toHaveTextContent("1");

});

describe("Counter component", () => {
  test("renders with initial value of 0", () => {
    render(<Counter />);
    const counterElement = screen.getByTestId("counter");
    expect(counterElement).toHaveTextContent("0");
  });


  test("decrease counter", () => {
    render (<Counter/>);
  
    const counter = screen.getByTestId("counter");
    const decreamentBtn = screen.getByTestId("decreament");
  
    fireEvent.click(decreamentBtn);
  
    expect(counter).toHaveTextContent("-1");
  
  });
  
});






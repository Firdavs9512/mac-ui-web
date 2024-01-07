import cn from "@/Utils/class-names";
import "./style.css";
import {
  ActionT,
  CalculatorKeyT,
  calculatorReducer,
  initialState,
  IState,
} from "./calculatorReducer";
import { useReducer } from "react";
import { AppIcon } from "@/Components/ui/app-icon";
import {
  mdiClose,
  mdiDivision,
  mdiMinus,
  mdiPercentOutline,
  mdiPlusMinusVariant,
} from "@mdi/js";

const Calculator = () => {
  const [state, dispatch] = useReducer<React.Reducer<IState, ActionT>>(
    calculatorReducer,
    initialState
  );

  const { result } = state;

  function handlePress(key: CalculatorKeyT) {
    dispatch({ type: "Press", payload: key });
  }

  return (
    <section className="border-inherit rounded-[inherit] h-full w-full bg-[hsla(0,0%,27%,0.7)] backdrop-blur-2xl grid grid-rows-[auto_auto_1fr] font-sans">
      <header className={cn("app-window-drag-handle", "p-4")} />
      <section className="min-h-[4rem] text-5xl text-[white] text-end font-extralight overflow-auto px-4 py-2">
        {result}
      </section>
      <section className="buttonsContainer">
        <button className="topRowButton" onClick={() => handlePress("AC")}>
          {Number(result) > 0 ? "C" : "AC"}
        </button>
        <button className="topRowButton" onClick={() => handlePress("+/-")}>
          <AppIcon path={mdiPlusMinusVariant} />
        </button>
        <button className="topRowButton" onClick={() => handlePress("%")}>
          <AppIcon path={mdiPercentOutline} />
        </button>
        <button className="operationButton" onClick={() => handlePress("/")}>
          <AppIcon path={mdiDivision} />
        </button>
        <button className="numberButton" onClick={() => handlePress(7)}>
          7
        </button>
        <button className="numberButton" onClick={() => handlePress(8)}>
          8
        </button>
        <button className="numberButton" onClick={() => handlePress(9)}>
          9
        </button>
        <button className="operationButton" onClick={() => handlePress("*")}>
          <AppIcon path={mdiClose} />
        </button>
        <button className="numberButton" onClick={() => handlePress(4)}>
          4
        </button>
        <button className="numberButton" onClick={() => handlePress(5)}>
          5
        </button>
        <button className="numberButton" onClick={() => handlePress(6)}>
          6
        </button>
        <button className="operationButton" onClick={() => handlePress("-")}>
          <AppIcon path={mdiMinus} size={24} />
        </button>
        <button className="numberButton" onClick={() => handlePress(1)}>
          1
        </button>
        <button className="numberButton" onClick={() => handlePress(2)}>
          2
        </button>
        <button className="numberButton" onClick={() => handlePress(3)}>
          3
        </button>
        <button className="operationButton" onClick={() => handlePress("+")}>
          +
        </button>
        <button
          className={cn("numberButton", "curvedBottomLeftButton")}
          style={{ gridColumn: "1 / span 2" }}
          onClick={() => handlePress(0)}
        >
          0
        </button>
        <button className="numberButton" onClick={() => handlePress(".")}>
          .
        </button>
        <button
          className={cn("operationButton", "curvedBottomRightButton")}
          onClick={() => handlePress("=")}
        >
          =
        </button>
      </section>
    </section>
  );
};

export default Calculator;

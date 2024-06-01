import { Button, Stack, Typography } from "@mui/material";
import { useReducer } from "react";

// useState
// 1. Init state: 0
// 2. Actions: Up (state + 1) / Down (state -1)

// useReducer
// 1. Init state: 0
// 2. Actions: Up (state + 1) / Down (state -1)
// 3. Reducer
// 4. Dispatch

// Init state
const initState = 1;

// Actions
const UP_ACTION = "up";
const DOWN_ACTION = "down";

// Define action type
type ActionType = "up" | "down";

// Reducer
const reducer = (state: number, action: ActionType): number => {
  console.log("reducer running...");

  switch (action) {
    case UP_ACTION:
      return state + 1;
    case DOWN_ACTION:
      return state > 1 ? state - 1 : state;
    default:
      throw new Error("Invalid action");
  }
};

function CountItem({ className }: { className?: string }) {
  const [count, dispatch] = useReducer(reducer, initState);
  return (
    <Stack direction={"row"} alignItems={"center"} className={className}>
      <Button onClick={() => dispatch(DOWN_ACTION)}>-</Button>
      <Typography>{count}</Typography>
      <Button onClick={() => dispatch(UP_ACTION)}>+</Button>
    </Stack>
  );
}

export default CountItem;

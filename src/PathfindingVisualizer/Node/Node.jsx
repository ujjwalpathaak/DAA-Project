import React from "react";
import "./Node.css";

export default function Node({
  col,
  isFinish,
  isStart,
  isWall,
  onMouseDown,
  onMouseEnter,
  doubleClick,
  onMouseUp,
  row,
  SetFINISH_NODE_ROW,
  SetFINISH_NODE_COL,
  SetSTART_NODE_ROW,
  endNode,
  startNode,
  setStartNode,
  setEndNode,
  SetSTART_NODE_COL,
}) {
  const extraClassName = isFinish
    ? "node-finish"
    : isStart
    ? "node-start"
    : isWall
    ? "node-wall"
    : "";

  return (
    <>
      {startNode ? (
        <div
          id={`node-${row}-${col}`}
          className={`node ${extraClassName}`}
          onMouseDown={() => onMouseDown(row, col)}
          onMouseEnter={() => onMouseEnter(row, col)}
          onMouseUp={() => onMouseUp()}
          onClick={() => {
            console.log(col, row);
            SetSTART_NODE_COL(col);
            SetSTART_NODE_ROW(row);
            setStartNode(!startNode);
          }}
        ></div>
      ) : endNode ? (
        <div
          id={`node-${row}-${col}`}
          className={`node ${extraClassName}`}
          onMouseDown={() => onMouseDown(row, col)}
          onMouseEnter={() => onMouseEnter(row, col)}
          onMouseUp={() => onMouseUp()}
          onClick={() => {
            console.log(col, row);
            SetFINISH_NODE_COL(col);
            SetFINISH_NODE_ROW(row);
            setEndNode(!endNode);
          }}
        ></div>
      ) : (
        <div
          id={`node-${row}-${col}`}
          className={`node ${extraClassName}`}
          onMouseDown={() => onMouseDown(row, col)}
          onMouseEnter={() => onMouseEnter(row, col)}
          onMouseUp={() => onMouseUp()}
        ></div>
      )}
    </>
  );
}

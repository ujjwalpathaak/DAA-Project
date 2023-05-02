import React, { useState, useEffect } from "react";
import Node from "./Node/Node";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./PathfindingVisualizer.css";

const PathfindingVisualizer = () => {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [startNode, setStartNode] = useState(false);
  const [endNode, setEndNode] = useState(false);
  // const [makeWalls, setMakeWalls] = useState(false);
  const [START_NODE_ROW, SetSTART_NODE_ROW] = useState();
  const [START_NODE_COL, SetSTART_NODE_COL] = useState();
  const [FINISH_NODE_ROW, SetFINISH_NODE_ROW] = useState();
  const [FINISH_NODE_COL, SetFINISH_NODE_COL] = useState();

  useEffect(() => {
    const initialGrid = getInitialGrid();
    setGrid(initialGrid);
  }, [startNode, endNode]);

  const handleMouseDown = (row, col) => {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 18; row++) {
      const currentRow = [];
      for (let col = 0; col < 40; col++) {
        currentRow.push(createNode(col, row));
      }
      grid.push(currentRow);
    }
    return grid;
  };

  function animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    return new Promise(function (resolve, reject) {
      for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        if (i === visitedNodesInOrder.length) {
          setTimeout(() => {
            animateShortestPath(nodesInShortestPathOrder)
              .then((val) => { if (val === true) { resolve(nodesInShortestPathOrder.length); } }).catch((err) => console.log(err))
          }, 10 * i);
          return;
        }
        setTimeout(() => {
          const node = visitedNodesInOrder[i];
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-visited";
        }, 10 * i);
        console.log("reach")
      }
    });
  };
  const visualizeDijkstra = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder).then((val) => {
      toast("Length of shortest path: " + val, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    })
      .catch((err) => console.log(err));
  };

  function animateShortestPath(nodesInShortestPathOrder) {
    return new Promise(function (resolve, reject) {
      for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
        if (i === 0) {
          setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
              "node node-shortest-path-start";
          }, 50 * i);
        }
        else if (i === nodesInShortestPathOrder.length - 1) {
          setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
              "node node-shortest-path-end";
          }, 50 * i);
        }
        else {
          setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
              "node node-shortest-path";
          }, 50 * i);
        }
      }
      resolve(true)
    });
  }
  const selectStartNode = () => {
    setStartNode(true);
  };
  const selectEndNode = () => {
    setEndNode(true);
  };

  const createNode = (col, row) => {
    return {
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  };

  return (
    <>
      <div className="wrapper-1">
        <button className="button" onClick={visualizeDijkstra}>
          <span> Visualize Dijkstra's Algorithm</span>
        </button>
        <div id="button-wrapper">
          <button className="button2" onClick={selectStartNode}>
            <span>Select Start Node</span>
          </button>
          <button className="button2" onClick={selectEndNode}>
            <span>Select End Node</span>
          </button>
        </div>
      </div>
      <div className="wrapper-2">

        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isWall } = node;

                  if (startNode == true) {
                    return (
                      <Node
                        key={nodeIdx}
                        col={col}
                        isFinish={isFinish}
                        isStart={isStart}
                        isWall={isWall}
                        mouseIsPressed={mouseIsPressed}
                        onMouseDown={() => handleMouseDown(row, col)}
                        onMouseEnter={() => handleMouseEnter(row, col)}
                        onMouseUp={handleMouseUp}
                        startNode={startNode}
                        SetSTART_NODE_ROW={SetSTART_NODE_ROW}
                        SetSTART_NODE_COL={SetSTART_NODE_COL}
                        row={row}
                        setStartNode={setStartNode}
                      ></Node>
                    );
                  } else if (endNode === true) {
                    return (
                      <Node
                        key={nodeIdx}
                        col={col}
                        isFinish={isFinish}
                        isStart={isStart}
                        isWall={isWall}
                        endNode={endNode}
                        mouseIsPressed={mouseIsPressed}
                        onMouseDown={() => handleMouseDown(row, col)}
                        onMouseEnter={() => handleMouseEnter(row, col)}
                        onMouseUp={handleMouseUp}
                        SetFINISH_NODE_COL={SetFINISH_NODE_COL}
                        SetFINISH_NODE_ROW={SetFINISH_NODE_ROW}
                        row={row}
                        setEndNode={setEndNode}
                      ></Node>
                    );
                  } else {
                    return (
                      <Node
                        key={nodeIdx}
                        col={col}
                        isFinish={isFinish}
                        isStart={isStart}
                        isWall={isWall}
                        mouseIsPressed={mouseIsPressed}
                        onMouseDown={() => handleMouseDown(row, col)}
                        onMouseEnter={() => handleMouseEnter(row, col)}
                        onMouseUp={handleMouseUp}
                        row={row}
                      ></Node>
                    );
                  }
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default PathfindingVisualizer;

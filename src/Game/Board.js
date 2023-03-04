import React , {useState , useEffect, useCallback} from "react";
import classes from "./Board.module.css";
import Cell from "./Cell";


const allColors = ['red' , 'green' , 'purple' , 'yellow' ,'orange' ,'blue'];
const Board = ()=>{
    const [cells , setCells] = useState([]);

    useEffect(()=>{
        let currentCell = [];
        for(let i = 0 ; i < 81 ; i++){
            let index = Math.floor(Math.random() * (4 - 0 + 1) + 0);
            let id    = Math.floor(Math.random() * (100 - 1 + 1) + 1);
            currentCell.push({id : `color-${index}-${id}-${i}` , color: allColors[index] , position : i , isHighlighted: false , isLoading : false});
            if(((i+1) % 9) === 0){   
                let temp = currentCell;
                currentCell = []; 
                ((currentCell , i)=>{
                        setTimeout(()=>{
                            setCells(prevState=>{
                                return [
                                    ...prevState,
                                    ...currentCell
                                ]
                            });
                        },i*10);
                })(temp , i);
                currentCell = [];
            }
        }
    },[]);


    const checkForThreeColumns = useCallback(()=>{
        for(let i = 0 ; i <= 62 ; i++){ // For the rows
            const toCheck = [i , i+9 , (i+18)];
            let result = (cells[toCheck[0]].color === cells[toCheck[1]].color) && (cells[toCheck[1]].color === cells[toCheck[2]].color);
            if(result){
                toCheck.forEach(item =>{
                    cells[item].isHighlighted = true;
                    // cells[item] = {};
                });

            }
        }
    },[cells]);


    const checkForThreeRows = useCallback(()=>{
        const avoidRows = [7,16,25,34,43,52,61,70,79,8,17,26,35,44,53,62,71,80];
        for(let i = 0 ; i <= 78 ; i++){ // For the rows
            if(avoidRows.includes(i)) continue;
            const toCheck = [i , i+1 , (i+2)];
            let result = (cells[toCheck[0]].color === cells[toCheck[1]].color) && (cells[toCheck[1]].color === cells[toCheck[2]].color);
            if(result){
                toCheck.forEach(item =>{
                    cells[item].isHighlighted = true;
                    // cells[item] = {};
                })
            }
        }
    },[cells]);

    useEffect(()=>{
        const identifier = setTimeout(()=>{
            checkForThreeColumns();
            checkForThreeRows();
            setCells([...cells]);
        },1000);

        return ()=>{
            clearTimeout(identifier);
        }
    },[checkForThreeColumns,checkForThreeRows, cells]);
    return (
        <div className={`${classes.board} ${classes.box}`}>
            <div className={classes.content}>
                {cells.map(eachCell => <Cell color={eachCell.color} key={eachCell.id} index={eachCell.position} isHighlighted={eachCell.isHighlighted} isLoading={eachCell.isLoading}/>)}
                <div className={classes.cell}></div>
            </div>
        </div>
    )
}

export default Board;
import classes from "./Cell.module.css";
const Cell = (props)=>{
    let containerClass = `${classes.cell} ${props.isHighlighted ? classes.highlighted : ''}`;
    containerClass    += `${props.isLoading ? classes.isLoading : ''}`;
    return (
        <div className={containerClass}>
            <img 
                 src={`/images/${props.color}.png`} 
                 alt={props.color} 
                 height="40" 
                 width="40" 
                 index = {props.index}
                //  draggable="true"
                //  onDragStart={dragStartHandler}
                />
        </div>
    )
}

export default Cell;
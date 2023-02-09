let initailState={todo:[],inprogress:[],completed:[]}

export default function reducer(state=initailState,action){
    if(action.type==="ADD"){
          return {
            ...state,
            todo: action.payload
          }
    }
    if(action.type==="MOVE_INPROGRESS"){
      let newCards = state.todo.filter(ele => ele.id !== action.payload.id );
      return{
        ...state,
        todo:newCards,
        inprogress:state.inprogress.concat(action.payload)
      }
  }
      if(action.type==="MOVECOMPLETE"){
        let removeCard = state.inprogress.filter(ele => ele.id !== action.payload.id );
        return{
          todo:state.todo,
          inprogress:removeCard,
          completed: state.completed.concat(action.payload)
        }
    }
    if(action.type==="MOVE_BACK_TODO"){
      let removeCard = state.inprogress.filter(ele => ele.id !== action.payload.id );
      return{
        todo:state.todo.concat(action.payload),
        inprogress:removeCard,
        completed: state.completed
      }
  }
  }


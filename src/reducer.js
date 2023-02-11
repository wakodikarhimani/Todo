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
      console.log("action",action)
      let removeCard = state.inprogress.filter(ele => ele.id !== action.payload.id );
      console.log("state",state)
      let state1={
        todo:state.todo.concat(action.payload),
        inprogress:removeCard,
        completed: state.completed
      }
      console.log("state1",state1)
      return{
        todo:state.todo.concat(action.payload),
        inprogress:removeCard,
        completed: state.completed
      }
    }
    if(action.type==="EDIT_TODO"){
      console.log("inside")
      let todo=action.payload.state=="todo" ? state.todo[state.todo.findIndex((ele)=>ele.id==action.payload.id)].title=action.payload.value : null;
      let inprogress=action.payload.state=="inprogress" ? state.inprogress[state.inprogress.findIndex((ele)=>ele.id==action.payload.id)].title=action.payload.value : null;
      return{
        todo:state.todo,
        inprogress:state.inprogress,
        completed: state.completed
      }
    }
  }


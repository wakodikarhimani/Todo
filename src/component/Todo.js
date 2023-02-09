import React, { useState } from "react";
import axios from 'axios';
import { useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from './Modal';


let Todo=()=>{
    let dispatch=useDispatch();
    let [showAlert,setModalOpen]=useState(false);
    let [todoAction,saveTodoAction]=useState('');
    useEffect(()=>{
        axios.get("https://jsonplaceholder.typicode.com/todos?size=20").then((res)=>{
        let slicedData=res.data.slice(0,20);
        dispatch({type:"ADD",payload:slicedData});
    }).catch((err)=>{
        console.log(err);
    })
    },[]);

    let data=[];
    data=useSelector((state)=>{
        return state?.todo;
    })

    let inprogressData=[];
    inprogressData = useSelector((state)=>{
        return state?.inprogress;
    })

    let completedData=[];
    completedData = useSelector((state)=>{
        return state?.completed;
    })



    let handleTodo=(e)=>{
        let selecteddata=data.find((ele)=>ele.id==e.target.value)
        let getIndex=data.indexOf(selecteddata)
        let newData= data.splice(getIndex,1)
        dispatch({type:"MOVE_INPROGRESS",payload:newData});
    }

    let moveComplete=(e)=>{
        let completeddata=inprogressData.find((ele)=>ele.id==todoAction)
        dispatch({type:"MOVECOMPLETE",payload:completeddata})
        setModalOpen(false)

    }

    let btns;
    let handleInProgress=(e)=>{
        setModalOpen(true)
        saveTodoAction(e.target.value);
    }

    let moveBack=()=>{
        let moveBackData=inprogressData.find((ele)=>ele.id==todoAction)
        let newTodoData= data.concat(moveBackData);
        dispatch({type:"MOVE_BACK_TODO",payload:moveBackData})
        setModalOpen(false)
    }

    return(
        <div>

        <Row xs={1} md={3} className="g-4">
      {/* {data?.map((_, idx) => ( */}
        <Col>
          <Card>
            <Card.Body>
              <Card.Title style= { {backgroundColor:"yellow"}}>Todo</Card.Title>
              {data?.map((ele) => (
              !ele.completed && <div><Card.Text >
                <Button variant="light" onClick={handleTodo}value={ele.id}>{ele.title}</Button>
              </Card.Text></div>
                ))}

            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title style= { {backgroundColor:"yellow"}}>Inprogress</Card.Title>
              {inprogressData?.map((ele,i) => (
              <div><Card.Text >
                <Button variant="light" onClick={handleInProgress} value={ele.id}>{ele.title}</Button>
              </Card.Text></div>
                ))}
            </Card.Body>
          </Card>
          {showAlert && <Modal style={{textAlign:"center"}} setOpenModal={setModalOpen} moveBack={moveBack} moveComplete={moveComplete}/>}

        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title style= { {backgroundColor:"yellow"}}>Completed</Card.Title>
              {completedData?.map((ele,i) => (
               <div><Card.Text >
                <Button variant="light"  value={ele.id}>{ele.title}</Button>
              </Card.Text></div>
                ))}
            </Card.Body>
          </Card>
        </Col>

      {/* ))} */}
    </Row>
        </div>
    )
}



export default Todo;
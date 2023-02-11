import React, { useState, useRef } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import $ from 'jquery';

let Todo = () => {
  let dispatch = useDispatch();
  let [isEdit, setIsEdit] = useState(false);
  let [todoAction, saveTodoAction] = useState("");
  const [index, setIndex] = useState(1);
  const [id,setId]=useState("");
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos?size=20")
      .then((res) => {
        let shortData = res.data.filter((ele) => ele.title.length <= 20);
        let slicedData = shortData.slice(0, 20);
        dispatch({ type: "ADD", payload: slicedData });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let data = [];
  data = useSelector((state) => {
    return state?.todo;
  });

  let inprogressData = [];
  inprogressData = useSelector((state) => {
    return state?.inprogress;
  });

  let completedData = [];
  completedData = useSelector((state) => {
    return state?.completed;
  });

  let handleClick = (e) => {
    setIsEdit(true);
    saveTodoAction(e.target.value);
  };

  const dropToInProgress = (e, position) => {
    let selecteddata = data.find((ele) => ele.id == e.target.value);
    let getIndex = data.indexOf(selecteddata);
    let newData = data.splice(getIndex, 1);
    dispatch({ type: "MOVE_INPROGRESS", payload: newData });
  };

  let onEditBlur = (e, state, id) => {
    let payload1 = { state: state, id: id, value: e.target.value };
    e.target.value != "" && dispatch({ type: "EDIT_TODO", payload: payload1 });
    setIsEdit(false);
  };

  const droptoComplete = (e) => {
    let completeddata = inprogressData.find((ele) => ele.id == e.target.value);
    console.log("compl",$(document))
    $(document).on('dragover', '#todo', function(e){
      e.preventDefault()
      console.log("drag")
      setId("todo");
    })
    console.log("id",id)
    $(document).on('dragover', '#complete', function(e){
      setId("complete");
    })
    id == "todo" && dispatch({ type: "MOVE_BACK_TODO", payload: completeddata });
    id == "complete" && dispatch({ type: "MOVECOMPLETE", payload: completeddata });
  };

  return (
    <div>
      <Row xs={1} md={3} className="g-4">
        <Col>
          <Card id="todo">
            <Card.Body>
              <Card.Title style={{ backgroundColor: "yellow" }}>
                TODO (Open)
              </Card.Title>
              {data?.map(
                (ele, index) =>
                  !ele.completed && (
                    <div>
                      <Card.Text>
                        {isEdit && ele.id == todoAction ? (
                          <input
                            type="text"
                            onBlur={(e) => onEditBlur(e, "todo", ele.id)}
                          ></input>
                        ) : (
                          <Button
                            variant="light"
                            onClick={handleClick}
                            value={ele.id}
                            draggable
                            onDragEnd={dropToInProgress}
                          >
                            {ele.title}
                          </Button>
                        )}
                      </Card.Text>
                    </div>
                  )
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title style={{ backgroundColor: "yellow" }}>
                In Progress
              </Card.Title>
              {inprogressData?.map((ele, i) => (
                <div>
                  <Card.Text>
                    {console.log("isedit", isEdit, todoAction, ele.id)}
                    {isEdit && ele.id == todoAction ? (
                      <input
                        type="text"
                        onBlur={(e) => onEditBlur(e, "inprogress", ele.id)}
                      ></input>
                    ) : (
                      <Button
                        variant="light"
                        onClick={handleClick}
                        draggable
                        // onDragEnter={(e) => dragEnterToComplete(e, index)}
                        onDragEnd={droptoComplete}
                        value={ele.id}
                      >
                        {ele.title}
                      </Button>
                    )}
                  </Card.Text>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card id="complete">
            <Card.Body>
              <Card.Title style={{ backgroundColor: "yellow" }}>
                Completed
              </Card.Title>
              {completedData?.map((ele, i) => (
                <div>
                  <Card.Text>
                    <Button variant="light" value={ele.id}>
                      {ele.title}
                    </Button>
                  </Card.Text>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Todo;

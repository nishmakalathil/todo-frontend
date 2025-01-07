import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import axios from 'axios';
import { Button, ButtonGroup, ListGroup, Form, Row, Col } from 'react-bootstrap';  // Import necessary components

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [inputTask, setInputTask] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  const changeHandler = (e) => {
    setInputTask(e.target.value);
  };

  const getTask = () => {
    axios.get("http://localhost:3008")
      .then(res => {
        setTasks(res.data.taskItems); 
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    getTask();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (editMode) {
      axios.put(`http://localhost:3008/task/${editTaskId}`, { task: inputTask })
        .then(res => {
          setInputTask(""); 
          setEditMode(false);
          setEditTaskId(null);
          getTask();  
        })
        .catch(error => {
          console.log("error", error);
        });
    } else {
      axios.post("http://localhost:3008", { task: inputTask })
        .then(res => {
          setInputTask("");  
          getTask();  
        })
        .catch(error => {
          console.log("error", error);
        });
    }
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:3008/task/${id}`)
      .then(res => {
        getTask();  
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  const editTask = (task) => {
    setInputTask(task.task);  
    setEditTaskId(task._id);
    setEditMode(true);
  };

  return (
    <>
      <h1 className="text-center">Todo Application</h1>
      <Form onSubmit={submitHandler}>
        <Row className="justify-content-center align-items-center">
          <Col xs="auto">
            <Form.Control 
              type="text" 
              placeholder="Enter task" 
              value={inputTask}  
              onChange={changeHandler} 
              className="mb-2 form-control-sm"  
            />
          </Col>
          <Col xs="auto">
            <Button type="submit" variant="primary" className="mb-2">
              {editMode ? "Update Task" : "Add Task"}  
            </Button>
          </Col>
        </Row>
      </Form>
      <ListGroup className="mt-3">
        {tasks.map((task, index) => (
          <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
            <span>{task.task}</span>
            <ButtonGroup>
              <Button variant="primary" className="mx-1" onClick={() => editTask(task)}>Edit</Button>  
              <Button variant="primary" className="mx-1" onClick={() => deleteTask(task._id)}>Delete</Button>  
            </ButtonGroup>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

export default Todo;

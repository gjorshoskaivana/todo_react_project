import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

interface TodoItemInterface {
  text: string;
  done: boolean;
  id: number;
}

function todoFunctions(){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [todos, setTodos] = useState<TodoItemInterface[]>([]);

    const onButtonClick = (text: string) => {
        const newTodoList = [...todos]
        const newTodo: TodoItemInterface = {
            text,
            done: false,
            id: newTodoList.length
        };
        newTodoList.push(newTodo);
        setTodos(newTodoList);
    }

    const onCheckboxClicked = (id: number) => {
        const newTodoList = [...todos];
        newTodoList[id].done = !newTodoList[id].done
        setTodos(newTodoList);
    }

    const checkAllDone = () => {
        let allDone = true;
        if (todos.filter(t => !t.done).length > 0){
            allDone = false;
        }
        if (todos.length === 0){
            allDone = false;
        }
        return allDone;
    }

    return {todos, onButtonClick, onCheckboxClicked, checkAllDone};
}

function TodoItemRender({t, checkboxClicked} : {t: TodoItemInterface, checkboxClicked: (id: number) => void}) {
    return (
      <h3>
          <input type="checkbox" checked={t.done} onClick={() => checkboxClicked(t.id)}/>
          {!t.done ? t.text : <s>{t.text}</s>}
      </h3>
    );
}

function App() {
  let date = new Date();
  const {todos, onButtonClick, onCheckboxClicked, checkAllDone} = todoFunctions()
  const [text, setText] = useState<string>("");
  let msg = "Good job! You completed all tasks! :)"

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
  }

  const onAddItem = () => {
      onButtonClick(text);
      setText("");
  }

  const messagePrompt = () => {
      let allChecked = checkAllDone();
      return allChecked;
  }

    return (
      <div className="App">
        <h2>To-do list for <span>{date.getDate()}/{date.getMonth()}/{date.getFullYear()}</span></h2>
        <input onChange={onChangeInput} value={text}/><button onClick={onAddItem}>Add To-Do</button>
        <div>
            {todos.map(t => <TodoItemRender t={t} checkboxClicked={onCheckboxClicked}/>)}
        </div>
        <p>
            <h3 style={{color: "green"}}>
                {messagePrompt() ? "Good job! You completed all tasks! :)" : ""}
            </h3>
        </p>
      </div>
  );
}

export default App;

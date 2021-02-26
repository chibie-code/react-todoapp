// import {tasks} from './TodoList';
//{useState, useRef, useEffect}
import React,{ useState, useRef, useEffect } from 'react';
import Input from './Input';
import Task from './Task';
import { nanoid } from 'nanoid';



const MainSection = ()=> {

  // create a state, which is an array of all task items
  let[tasks, setTasks] = useState(
    [
      {id: '1pTByY', text: 'Do the dishes', done: true},
      {id: '1pQCyY', text: 'Go home', done: false},
      {id: '0yAVtP', text: 'Learn React', done: true}
    ]
  );

  let [edit, setEdit] = useState(
    {
      showTextArea: false,
      index: 0,
      text: '',
      e: ''
    }
  );
  // use ref, to reference the inout box related to the button
  const inputRef = useRef();
  const editRef = useRef();

  // function to add new tasks
  function addTask(input){
    console.log(`%cinput: %c${input}`,'color: lime','color: yellow');

    /*the nanoid(6) method generates a new random 6-char id for each newly added task*/
    setTasks([ { id: nanoid(6), text: input, done: false }, ...tasks ]);

  };

  // function for button onClick
  function onAddBtnClick(e){
  console.clear();

  // pass the input value of the input box (which was stored in the ref of the input box JSX element),
  // into the buttons's addtask function

  addTask(inputRef.current.value);

  // thene clear the input from teh input box
  inputRef.current.value = '';
}

  function pressEnter(e){

  if(e.code === 'Enter'){
    console.log('SUBMIT');
    onAddBtnClick(e);
  }
  else{
    console.clear();
    console.log('pressed ', e.code);
    return;
  }

}

  function handleCheck(id, task, done, e){

    setTasks(tasks.map(task =>{

    // if the task item's 6-char id
    // is equal to the id of the checkbox's corresponding jsx element
    if (task.id === id ){
      return { ...task, done }
    }
    else{
      return task;
    }
  }));
}

  function deleteTask(index, check, task, e){

    console.clear();

    let tasksCopy = tasks.map(task=>task);

    if(index !== -1){

      tasksCopy.splice(index, 1);

      setTasks([...tasksCopy]);

    }
}

  function editTask(index, check, task, e){

    console.clear();

    setEdit(prev=>{

      return {showTextArea: !edit.showTextArea, index: index, text: task.text, e: e}

    });
}

  function editText(e, index){

    index = edit.index;

    setEdit(prev=>{
      return {showTextArea: edit.showTextArea, index: edit.index, text: e.target.value, e: e}
    });
  }

  function submitEdit(e, newText, submitBool=edit.showTextArea, itemText){

    console.clear();

    let testArr = tasks.map(task=>task);

    testArr[edit.index].text = newText;

    setTasks([...testArr]);

    setEdit(prev=>{
      return {showTextArea: !edit.showTextArea, index: '', text: '', e: edit.e}
    });
  }

  useEffect((prev)=>{
    // console.log(`index: %c${edit.index}`, 'color: lime');
    // console.log(`edit.text: %c${edit.text}`, 'color: lime');
    // console.log(`edit.showTextArea is %c${edit.showTextArea}`, 'color: orange');
    // console.log((edit.showTextArea)?'%cis editing...':'%cDone editing!','color: lime');
  },[edit.index, edit.showTextArea]);

  return (
      <main className='w-screen h-full bg-green-400 flex flex-col justify-center items-stretch p-2'>
      <div className={`bg-gray-600
        border border-black
        shadow-lg rounded
        flex flex-col justify-stretch
        h-auto max-h-full
        lg:max-h-full lg:h-auto
        md:max-h-full md:h-auto
        sm:max-h-64`}>


      <div
      className={`${(edit.showTextArea)?'hidden':''}`}>
      <Input
      inputRef={inputRef}
      addTask={addTask}
      onClick={onAddBtnClick}
      pressEnter={pressEnter}/>
      </div>

      {/* the textarea elements*/}
      <div className={`overflow-hidden bg-yellow-400 ${(!edit.showTextArea)?'hidden':''}`}>
      {/* the button to submit the edit*/}
      <div
      className='flex flex-col justify-center items-center bg-green-500 h-10'>
      <button
      className='flex flex-col justify-center items-center h-full w-full'
      onClick={e=>{submitEdit(e,edit.text)}}>
      {/* <i className="fas fa-edit"></i>*/}
      <i className="w-full h-full pt-2 text-white border border-green-500 transition-opacity hover:text-black hover:opacity-50 fas fa-check"></i>
      </button>
      </div>

      <div
      className='h-auto max-h-screen overflow-y-hidden'>

      {/* the textarea*/}
      <div className='flex flex-col bg-red-500 w-full h-64 overflow-x-hidden max-h-screen'>
      <div className='bg-blue-400 w-full h-full'>
      {/* TA JSX element goes here*/}
      <textarea
      ref={editRef}
      className={`resize-none w-full h-full bg-blue-100 max-h-screen ${(!edit.showTextArea)?'':''}`}
      value={edit.text}
      onChange={(e)=>{editText(e)}}>
      </textarea>
      </div>
      </div>

      </div>
      </div>

      <div className='w-full h-auto overflow-y-auto sm:max-h-full h-64 bg-gray-300 rounded-b'>

          {/*#D35269, #CCFF00, #70D6FF, #495159*/}

          {useEffect(()=>{
            console.log('%cin-line side effect','color: magenta');
          },[tasks])}

          {tasks.map((item, i) =>{

            return ( <Task
              key={i}
              editRef={editRef}
              index={i}
              text={!(item.text === undefined)&&item.text}
              id={item.id}
              item={item}
              done={item.done}
              itemDefaultClass='font-semibold whitespace-normal px-2 w-full h-auto min-h-4 break-words flex flex-col justify-center'
              handleCheck={handleCheck}
              hideItem={(edit.showTextArea)?'hidden':''}
              editTask={editTask}
              editInput=''
              deleteTask={deleteTask}
              setTaskCheck=''/> );
          })}

      </div>
      </div>
      </main>
  );
}

export default MainSection;

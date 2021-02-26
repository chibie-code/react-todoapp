import React from 'react';

const Task = (props)=>{

  return(

    <div className={`${props.hideItem} bg-white w-full flex flex-col rounded`}>

    <span className='flex p-2 w-full'>

      <label
      className='flex flex-col justify-center transform hover:scale-110 motion-reduce:transform-none '>
        <input
        type="checkbox"
        onChange={(e) => props.handleCheck(props.id, props.task, e.target.checked, e)}
        checked={props.done}
        className='check bg-black'/>
      </label>

      <p
      className={props.done ? `line-through ${props.itemDefaultClass}` : props.itemDefaultClass}>
      {props.text}
      </p>

      {/* the edit and delete buttons section*/}
      <span
      className='flex text-lg'>
      <button
      className='flex m-1 p-2 transform hover:text-gray-700 motion-reduce:transform-none'
      onClick={(e)=>{props.editTask(props.index,props.checked,props.item,e)}}>
      <i className="fas fa-edit"></i>
      </button>
      <button
      className={`flex m-1 p-2 transform hover:text-gray-700 motion-reduce:transform-none ${(props.checked)?' text-red-600':''}`}
      onClick={(e)=>{props.deleteTask(props.index,props.checked,props.item,e)}}>
      {/*onClick={(e)=>{props.deleteTask(props.index,props.checked,props.item,e)}}*/}
      <i className="fas fa-trash"></i>
      </button>
      </span>

    </span>
    <hr className='border'/>
    </div>
  );
};

export default Task;

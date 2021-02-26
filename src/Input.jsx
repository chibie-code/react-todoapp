import React from 'react';//, {useState, useRef, useEffect}
// import ReactDOM from 'react-dom';
import './../src/customStyles.css'


const Input = (props)=> {

  return (

    <div className='grid grid-flow-row auto-rows-auto'>
    {/*whitespace-nowrap*/}
    <input
    ref={props.inputRef}
    className='rounded-t font-bold text-green-600 py-2 h-full w-full px-2 border-white bg-red-300-100 text-white'
    placeholder='Enter a new task'
    onKeyPress={(e)=>{props.pressEnter(e)}}/>

    <button
    className='font-bold h-auto w-full text-gray-900 bg-yellow-300 rounded-b hover:bg-yellow-400 transition-colors'
    onClick={(e)=>{props.onClick(e)}}>
    <h1 className='w-full h-full py-2 hover:text-gray-500 transition-colors hover:bg-yellow-300'>Add New</h1>
    </button>
    {/*#70D6FF*/}

    </div>
  );
};

export default Input;

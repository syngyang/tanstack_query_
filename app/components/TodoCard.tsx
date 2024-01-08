'use client'

import React, {useState} from 'react'
import {TODO} from '@/types'

interface TodoProps {
    todo:TODO;
}
const TodoCard = ({todo}:TodoProps) => {
    const [checked, setChecked] = useState(todo.completed);
  return (
    <div>
    {todo.title}
    <input
      className='ml-2'
      type="checkbox"
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  </div>
  )
}

export default TodoCard
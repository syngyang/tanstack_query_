'use client'

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { addTodo, fetchTodos } from "@/app/api/todos/route";
import TodoCard from "@/app/components/TodoCard";

const TodosPage = () => {
    const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");

  const { data: todos, isLoading } = useQuery({
    queryKey: ["todos", { search }],
    queryFn: () => fetchTodos(search),
    staleTime: Infinity,
    // cacheTime: 0,
  });
  const { mutateAsync: addTodoMutation } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
     <div className="container p-5 ">
      <div className="flex gap-2 mb-5">
        <input
          className="px-4 border border-red-500 outline-none"
          placeholder="Enter title..."
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={async () => {
            try {
              await addTodoMutation({ title });
              setTitle("");
            } catch (e) {
              console.log(e);
            }
          }}
          className="text-xl border rounded-lg border-red-500 px-5 py-3 font-semibold p-2"
        >
          Add Todo
        </button>
      </div>
      {todos?.map((todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </div>
  )
}

export default TodosPage
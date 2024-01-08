'use client'

import { useQuery, useIsFetching } from '@tanstack/react-query'

interface Todo {
  userId: number;
  id:number;
  title:string;
  completed: boolean;
}

export default function Home() {
  const isFetching = useIsFetching();
  const {data: todosData, isLoading, isError, isSuccess} = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: ()=> fetch('https://jsonplaceholder.typicode.com/todos').then(res=>res.json()),
  })

  const {data: usersData} = useQuery<any[]>({
    queryKey: ['users'],
    queryFn: ()=> fetch('https://jsonplaceholder.typicode.com/users').then(res=>res.json()),
    // 8개 properties 중에 3개만 선택 ( 밑줄 없으면 8개 전부 보임 )
    select: (users)=> users.map(user => ({id:user.id, name :user.name, email: user.email})),
    // 아래 코드로 윗 것 출력 후에 아래 출력 ( 아래 없으면, 동시 출력)
    enabled: !!todosData,
  })

  if(isLoading){
    return (
      <main className='mt-4 flex min-h-screen flex-col items-center'>
        It is loading ....
      </main>
    )
  }
  if(isError){
    return (
      <main className='mt-4 flex min-h-screen flex-col items-center'>
        There is an error ....
      </main>
    )
  }
  
  console.log('data: ', usersData);
  return (
    <main className="flex min-h-screen flex-col items-start p-24">
     <h1 className='text-xl'>TODOS</h1>
     <p>placeholder site를 이용하여 json 파일을 불러 온 경우</p>
     <div className='flex flex-col gap-2 mt-5'>
      {todosData?.slice(0,10).map((todo:Todo) => (
        <div className='flex' key={todo.id}>
          <h2>{`  ${todo.title}`}</h2>
        </div>
      ) )}
     </div>

     <h1 className='text-xl mt-10'>USERS</h1>
     <div className='flex flex-col gap-2 mt-5'>
      {usersData?.map((user:any) => (
        <div className='flex' key={user.id}>
          <h2>{`  ${user.name}`}</h2>
        </div>
      ) )}
     </div>
    </main>
  )
}

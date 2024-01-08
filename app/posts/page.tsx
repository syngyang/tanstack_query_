'use client'
import axios from "axios"

import { useQuery, useMutation, useQueryClient, QueryClient } from "@tanstack/react-query"
import { POST } from "@/types"

const PostsPage = () => {
  const queryClient = useQueryClient();
  const {data: postsData, isLoading, isError, isSuccess} = useQuery<POST[]>({
    queryKey: ['posts'],
    queryFn: ()=> fetch('http://localhost:3001/posts').then(res=>res.json()),
  })

  const mutation : any = useMutation<POST[]>({
    mutationFn: (newPost) => {
      // return axios.post('/posts', newPost)
      return axios.post('http://localhost:3001/posts', newPost)
    },
    onMutate: (variables)=>{
      console.log('A mutation is about to happen')
    },
    onError: (error)=> {
      console.log("Error", error.message);
    },
    onSuccess: (data, variables, context)=>{
      console.log("Success", data);
      // 갱신 (refresh) 기능
      queryClient.invalidateQueries({queryKey: ["posts"]})
      // queryClient.invalidateQueries(["posts"]) 안됨
    },
  })
  return (
  <div className="flex flex-col min-h-screen p-24">
    <div className="flex flex-col items-center ">
      {mutation.isPending ? (
        'Adding post...'
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
          ) : null}

          {mutation.isSuccess ? <div className="text-green-600 py-3">Post added!</div> : null}

          <button
            onClick={() => {
              mutation.mutate({ id: new Date().getTime(), title: 'Do Laundry' })
            }}
            className="text-xl font-bold rounded-lg bg-red-200 px-5 py-3 mb-5 border border-red-400"
          >
            Create Post
          </button>
        </>
      )}
    </div>
    <div>
    <h1 className='text-xl'>TODOS</h1>
    <p className="text-neutral-500 text-sm"> json-server 프로그램을 이용하여, 자체 server를 3001에 만들고, axios.post 로 추가</p>
     <div className='flex flex-col gap-2 mt-5'>
      {postsData?.slice(0,10).map((post:POST) => (
        <div className='flex' key={post.id}>
          <h2>{`  ${post.title}`}</h2>
        </div>
      ) )}
     </div>
    </div>
    
  </div>
  )
}

export default PostsPage
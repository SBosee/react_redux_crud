import React, { useState } from 'react'

import { Button, Layout } from 'antd';
import { useDispatch,useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
const { Header, Footer, Content } = Layout;
import Todo from './Todo'
import { deleteTodo } from '../features/todoSlice';
import { TodoState } from '../type';

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#4096ff',
};


const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#4096ff',
};


function TodoList() {
  const [ isModalOpen, setOpenModal ] = useState(false)
  const [isEditFlag,setEditFlag] = useState(false)
  const todoList = useSelector((state:RootState)=>state.todo)
  const [editTodoData,setEditTodoData] = useState<TodoState|null>(null)
  const dispatch = useDispatch<AppDispatch>()
  const _handleModal=(value:boolean)=>{
    setOpenModal(value)
    setEditFlag(false)
  }
  const _editTodo=(data:TodoState)=>{
    setOpenModal(true)
    setEditFlag(true);
    setEditTodoData(data)
  }


  const _deleteTodo=(id:string)=>{
    console.log(id,"id")
    dispatch(deleteTodo(id))

  }

  return (
    <>

      <Layout >
        <Header style={headerStyle}>Todolist

          <Button onClick={() => _handleModal(true)}>ADD</Button>
        </Header>
        <Content >
          <table>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
            {
              todoList.map((data:{id:string,name:string,description:string})=>{
                return (<tr>
                  <td>{data?.name}</td>
                  <td>{data?.description}</td>
                  <td>
                    <Button onClick={()=>_editTodo(data)}>Edit</Button>
                    <Button onClick={()=>_deleteTodo(data.id)}>Delete</Button>

                  </td>
                </tr>)
              })
                       
            }

          </table>
        </Content>
        <Footer style={footerStyle}>Footer</Footer>
        <Todo
          isModalOpen={isModalOpen}
          handleModal={_handleModal}
          dispatch={dispatch}
          editTodoData={editTodoData}
          isEditFlag={isEditFlag}
        />
      </Layout>



    </>
  )
}
export default TodoList;
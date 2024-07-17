import  { useEffect } from 'react'
import { Form, Input, Modal, Button } from 'antd';
import { addTodo,updateTodo } from '../features/todoSlice';
import { v4 as uuidv4 } from 'uuid';
import { TodoState } from "../type";
import { AppDispatch } from '../store';

type TodoType = {
    isModalOpen: boolean;
    handleModal: (value: boolean) => void;
    _dispatch: AppDispatch;
    editTodoData: TodoState|null;
    isEditFlag: boolean;
}
function Todo({ isModalOpen, handleModal, _dispatch, isEditFlag,editTodoData }: TodoType) {
    const [form] = Form.useForm();
    console.log(form,"fom")
    const _onFinish = (values: { name: string, description: string }) => {
        console.log(values, "values")
        if (isEditFlag) {
            const obj = {
                id: editTodoData?.id,
                name: values.name,
                description: values.description
            }
            handleModal(false)
            _dispatch(updateTodo(obj))
        } else {
            const obj = {
                id: uuidv4(),
                name: values.name,
                description: values.description
            }
            handleModal(false)
            _dispatch(addTodo(obj))
        }
        form.resetFields();

    }
    useEffect(() => {
        if (editTodoData) {
            form.setFieldsValue({
                id: editTodoData?.id,
                name: editTodoData?.name,
                description: editTodoData?.description
            })
        }
    }, [editTodoData])

    useEffect(()=>{
        if(isModalOpen && !isEditFlag){
            form.resetFields()
        }
    },[isModalOpen,isEditFlag])

    return (
        <>
            <Modal title="Basic Modal" open={isModalOpen} centered={true} footer={null} onCancel={() => handleModal(false)}>
                <Form
                    onFinish={_onFinish}
                    form={form}
                >
                    <Form.Item name="name" >
                        <Input  />
                    </Form.Item>
                    <Form.Item name="description">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType='submit'>{isEditFlag ? 'Update' : 'Add'}</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default Todo;

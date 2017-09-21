import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TaskTable from './js/components/taskTable';
import TaskForm from './js/components/taskForm';
import {Button,Modal} from 'antd';
class TaskManager extends React.Component {
    constructor(props){
        super(props);
        this.currentItem={type:'1',difficulty:2};
    }
    state = {
        taskList: [],/*任务列表*/
        taskModalTitle:'添加任务',/*任务对话框标题*/
        editFormVisible: false, /*编辑任务对话框显隐*/
        form:null,/*任务编辑表单*/
        currentItem:{type:'1',difficulty:2}/*当前任务*/
    };
    editTask=(item)=>{/*编辑任务*/
        this.setState({
            /*currentItem:Object.assign({},item),*/
            editFormVisible:true,
            taskModalTitle:item?'编辑任务':'添加任务'
        })
    }
    saveTask=(item)=>{/*保存编辑任务*/
        this.state.form.validateFields((err,values)=>{
            if(!err){
                this.setState({
                    editFormVisible:false
                })
            }
        })
    }
    closeEditForm=()=>{/*关闭编辑对话框*/
        this.setState({
            editFormVisible:false
        })
    }
    /*editFormChange=(changedCurrentItem)=>{
        this.setState({
            currentItem:{...this.state.currentItem,...changedCurrentItem}
        })
    }*/
    updateForm=(form)=>{
        this.setState({form});
    }
    render() {
        const currentItem=Object.assign({},this.currentItem);
        return (
            <div>
                <Button onClick={(e)=>this.editTask()} type="primary">添加</Button>
                <Modal title={this.state.taskModalTitle}
                visible={this.state.editFormVisible}
                onOk={this.saveTask}
                onCancel={this.closeEditForm}>
                <TaskForm taskItem={currentItem}  /*{...currentItem} onChange={this.editFormChange}*/ updateForm={this.updateForm}></TaskForm>
                </Modal>
            </div>
        )
    }
}
ReactDOM.render( < TaskManager / > , document.getElementById('root'));
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TaskTable from './js/components/taskTable';
import TaskForm from './js/components/taskForm';
import {Button,Modal} from 'antd';

const itemDefault={type:'1',difficulty:2,needTime:0,name:'',timeLimited:'',memo:''};/*任务添加初始值*/
class TaskManager extends React.Component {
    constructor(props){
        super(props);
        this.currentItem={};/*任务添加初始值*/
        this.form=null;/*任务编辑表单*/
    }
    state = {
        taskList: [],/*任务列表*/
        taskModalTitle:'添加任务',/*任务对话框标题*/
        editFormVisible: false/*编辑任务对话框显隐*/
    };
    editTask=(item)=>{/*编辑任务*/
        item?
        this.setState({
            editFormVisible:true,
            taskModalTitle:item?'编辑任务':'添加任务'
        })
         this.form&&this.form.resetFields();
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
        this.form=form;
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
                <TaskForm taskItem={currentItem} ref={this.updateForm}  /*{...currentItem} onChange={this.editFormChange}*/></TaskForm>
                </Modal>
            </div>
        )
    }
}
ReactDOM.render( < TaskManager / > , document.getElementById('root'));
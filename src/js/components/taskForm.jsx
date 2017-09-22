import React from 'react';
import { Form, Radio,DatePicker,Input,InputNumber} from 'antd';

const {Textarea} = Input;
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
class TaskForm extends React.Component {
    render() {
        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        };
        const difficultyOptions = [
            { label: '非常难', value: 1 },
            { label: '比较难', value: 2 },
            { label: '简单', value: 3 },
        ]
        const { getFieldDecorator } = this.props.form;
        const taskItem = this.props.taskItem;
        return (
            <Form>
                <FormItem {...layout} label="类型">
                    {getFieldDecorator('type', {
                        initialValue: taskItem.type,
                        rules: [{
                            required: true, message: '请选择类型!',
                        }],
                    })(
                        <RadioGroup>
                            <RadioButton value="1">非常重要</RadioButton>
                            <RadioButton value="2">比较重要</RadioButton>
                            <RadioButton value="3">不重要</RadioButton>
                        </RadioGroup>
                        )}
                </FormItem>
                <FormItem {...layout} label="难易程度">
                    {getFieldDecorator('difficulty', {
                        initialValue: taskItem.difficulty,
                        rules: [{
                            required: true, message: '请选择难易程度!',
                        }],
                    })(
                        <RadioGroup options={difficultyOptions} />
                        )}
                </FormItem>
                <FormItem {...layout} label="名称">
                    {getFieldDecorator('name', {
                        initialValue: taskItem.name,
                        rules: [{
                            required: true, message: '请输入任务名称！',
                        }],
                    })(
                        <Input style={{width:'60%'}}/>
                        )}
                </FormItem>
                <FormItem {...layout} label="时限">
                    {getFieldDecorator('timeLimited', {
                        initialValue: taskItem.timeLimited,
                        rules: [{
                            required: true, message: '请输入任务时限！',
                        }],
                    })(
                        <DatePicker />
                        )}
                </FormItem>
                <FormItem {...layout} label="需时">
                    {getFieldDecorator('needTime', {
                        initialValue: taskItem.needTime,
                        rules: [{
                            required: true, message: '请输入需时！',
                        }],
                    })(
                        <InputNumber min={0}/>
                        )}
                </FormItem>
                <FormItem {...layout} label="完成">
                    {getFieldDecorator('complete', {
                        initialValue: taskItem.complete,
                    })(
                        <Switch/>
                        )}
                </FormItem>
                <FormItem {...layout} label="描述">
                    {getFieldDecorator('memo', {
                        initialValue: taskItem.memo,
                    })(
                        <Textarea col={0}/>
                        )}
                </FormItem>
            </Form>
        )
    }
}
export default Form.create()(TaskForm)
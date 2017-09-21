import React from 'react';
import { Form, Radio } from 'antd';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};
const difficultyOptions=[
  { label: '非常难', value: 1 },
  { label: '比较难', value: 2 },
  { label: '简单', value: 3 },
]
class TaskForm extends React.Component {
    componentWillMount() {
        this.props.updateForm(this.props.form);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const taskItem=this.props.taskItem;
        return (
            <Form>
                <FormItem {...layout} label="类型">
                    {getFieldDecorator('type', {
                        initialValue:taskItem.type,
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
                        initialValue:taskItem.difficulty,
                        rules: [{
                            required: true, message: '请选择难易程度!',
                        }],
                    })(
                        <RadioGroup options={difficultyOptions}  />
                        )}
                </FormItem>
            </Form>
        )
    }
}
export default Form.create({
    /*onFieldsChange(props,changedFields){
        props.onChange(changedFields);
    },
    mapPropsToFields(props){
        return {
            type:{
                ...props.type,
                value:(props.type&&props.type.value)||''
            },
            difficulty:{
                ...props.difficulty,
                value:(props.difficulty&&props.difficulty.value)||''
            }
        }
    }*/
})(TaskForm)
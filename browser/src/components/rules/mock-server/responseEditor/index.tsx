import React from 'react';
import { Form, Input, Button, InputNumber } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { MockRuleModel, MockResponseModel } from '../../../../models/mockServer';

interface Props extends FormComponentProps {
    mockRule: MockRuleModel;
    onSubmit: Function;
}

class ResponseEditor extends React.PureComponent<Props>{
    private mockResponse:MockResponseModel;
    constructor(props: Props) {
        super(props);
        this.mockResponse = this.props.mockRule.response;
    }

    handleSubmit = (e:any) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err:any, response:MockResponseModel) => {
            if(err){
                return;
            }
            response.header = JSON.parse(response.header+'');
            this.props.onSubmit(response);
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const formLayout = 'horizontal';
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 22 },
        };
        const buttonItemLayout = {
            wrapperCol: { span: 22, offset: 2 },
        };
        return (
            <div>
                <Form layout={formLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="Status Code" {...formItemLayout}>
                        {getFieldDecorator('statusCode', {
                            initialValue: this.mockResponse.statusCode,
                            rules: [
                                {
                                    required: true
                                },
                            ],
                        })(<InputNumber min={100} max={599} />)}
                    </Form.Item>

                    <Form.Item label="header" {...formItemLayout}>
                        {getFieldDecorator('header', {
                            initialValue: JSON.stringify(this.mockResponse.header, null, 4),
                            rules: [
                                {
                                    required: true
                                }
                            ],
                        })(<Input.TextArea placeholder="header" autosize />)}
                    </Form.Item>

                    <Form.Item label="Body" {...formItemLayout}>
                        {getFieldDecorator('body', {
                            initialValue: JSON.stringify(this.mockResponse.body, null, 4),
                            rules: [
                                {
                                    required: false
                                }
                            ]
                        })(<Input.TextArea placeholder="body" autosize />)}
                    </Form.Item>

                    <Form.Item {...buttonItemLayout}>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }

}

export default Form.create<Props>()(ResponseEditor)

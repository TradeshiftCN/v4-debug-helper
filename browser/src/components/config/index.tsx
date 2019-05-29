import React from 'react'
import {Button, Form, Input} from 'antd';

const Config = () => {
    return (
        <Form>
            <Form.Item label="Proxy Port">
                <Input placeholder="proxy listening port" />
            </Form.Item>
            <Form.Item >
                <Button type="primary">Save</Button>
            </Form.Item>
        </Form>
    )
};

export default Config;


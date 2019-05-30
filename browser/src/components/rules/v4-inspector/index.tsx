import React from 'react'
import { Collapse } from 'antd';
import { connect } from 'react-redux'

const Panel = Collapse.Panel;

const mapState = (state:any) => ({
});

const mapDispatch = (dispatch: any) => ({
});

const toggleProxy = (props: any, checked: boolean) => {
};

const v4Inspector = (props: any) => {
    // panel https://codesandbox.io/s/p7n2r9466m
    // table https://codesandbox.io/s/vn50qkm32y
    return (
        <Collapse bordered={false} defaultActiveKey={['1','2']}>
            <Panel header="Hack Urls" key="1">
                1
            </Panel>
            <Panel header="App Mappings" key="2">
                2
            </Panel>

        </Collapse>
    )
};

export default connect(mapState, mapDispatch)(v4Inspector);

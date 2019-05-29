import React from 'react';
import {List, Switch, Icon} from 'antd';

import { connect } from 'react-redux'

import './index.less';

const mapState = (state:any) => ({
    ruleList: () => {
        return [
            {
                id: 'v4-inspector',
                name: 'Tradeshift V4 App Debug Helper',
                desc: "this is decs this is decs this is decs ",
                enabled: state.system.v4InspectorEnabled
            },
            {
                id: 'mock-server',
                name: 'Mock Server',
                desc: "this is decs this is decs this is decs ",
                enabled: state.system.mockServerEnabled
            }
        ];
    }
});

const mapDispatch = (dispatch: any) => ({
    getSystemConfigAsync: dispatch.system.getSystemConfigAsync,
    toggleV4InspectorAsync: dispatch.system.toggleV4InspectorAsync,
    toggleMockServerAsync: dispatch.system.toggleMockServerAsync
});

const toggleRule = (props:any, ruleId:string, enbaled:boolean) => {
    switch (ruleId) {
        case 'v4-inspector':
            props.toggleV4InspectorAsync(enbaled);
            return;
        case 'mock-server':
            props.toggleMockServerAsync(enbaled);
            return;
    }
};

const RuleLists = (props: any) => {
    return (
        <List
            className="rule-list"
            itemLayout="horizontal"
            dataSource={props.ruleList()}
            renderItem={(item:any) => (
                <List.Item actions={[
                    <Icon className="edit-icon" type="edit" />,
                    <Switch checked={item.enabled} onClick={(checked:boolean) => toggleRule(props, item.id, checked)} />
                ]}>
                    <List.Item.Meta
                        title={item.name}
                        description={item.desc}
                    />
                </List.Item>
            )}
        />
    )
};

export default connect(mapState, mapDispatch)(RuleLists);


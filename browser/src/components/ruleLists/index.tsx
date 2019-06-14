import React from 'react';
import {List, Switch, Icon, Tooltip} from 'antd';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom';

import './index.less';

const mapState = (state:any) => ({
    ruleList: () => {
        return [
            {
                id: 'v4-inspector',
                name: 'Tradeshift V4 App Debug Helper',
                desc: "use online environment to debug local code",
                enabled: state.system.v4InspectorEnabled
            },
            {
                id: 'mock-server',
                name: 'Mock Server',
                desc: "mock server to response your local request",
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
                    <Link to={'/rules/'+item.id}>
                        <Tooltip title="Click to edit the configuration">
                            <Icon className="edit-icon" type="edit" />
                        </Tooltip>
                    </Link>,
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

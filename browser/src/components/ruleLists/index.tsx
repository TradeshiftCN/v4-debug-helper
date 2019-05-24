import React from 'react';
import {List, Switch, Icon} from 'antd';

import { connect } from 'react-redux'

import './index.less';

const mapState = (state:any) => ({
    ruleList: () => {
        return [
            {
                name: 'Tradeshift V4 App Debug Helper',
                desc: "this is decs this is decs this is decs ",
                enabled: state.system.v4InspectorEnabled
            },
            {
                name: 'Mock Server',
                desc: "this is decs this is decs this is decs ",
                enabled: state.system.mockServerEnabled
            }
        ];
    }
});

const mapDispatch = (dispatch: any) => ({
    getSystemConfigAsync: dispatch.system.getSystemConfigAsync
});



const RuleLists = (props: any) => {
    return (
        <List
            className="rule-list"
            itemLayout="horizontal"
            dataSource={props.ruleList()}
            renderItem={(item:any) => (
                <List.Item actions={[<Icon className="edit-icon" type="edit" />, <Switch checked={item.enabled} />]}>
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


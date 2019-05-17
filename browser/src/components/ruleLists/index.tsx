import React from 'react';
import { List, Avatar, Button, Skeleton } from 'antd';

const ruleList: any = [
    {
        name: 'Tradeshift V4 App Debug Helper',
        desc: "this is decs this is decs this is decs ",
        enabled: true
    },
    {
        name: 'Mock Server',
        desc: "this is decs this is decs this is decs ",
        enabled: true
    }
];

const RuleLists = () => {
    return (
        <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={ruleList}
            renderItem={(item:any) => (
                <List.Item actions={[<a>edit</a>, <a>more</a>]}>
                    <List.Item.Meta
                        title={item.name}
                        description={item.desc}
                    />
                </List.Item>
            )}
        />
    )
};

export default RuleLists;


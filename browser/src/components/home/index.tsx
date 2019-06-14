import React from 'react'
import { Typography, Divider } from 'antd';
import './index.less';

import RuleList from '../ruleLists';

const { Title, Paragraph, Text } = Typography;

const Home = () => {
    return (
        <div className="home">
            <div className="desc-container">
                <Title>TS MIDDLEMAN - Response Hijacker </Title>
                <Paragraph>
                    ^_^ A magic debug tool for TS engineer.
                </Paragraph>
            </div>
            <Divider />
            <div className="rule-list-container">
                <Text strong={true}>Rule List</Text>
                <RuleList />
            </div>
        </div>

    )
};

export default Home;

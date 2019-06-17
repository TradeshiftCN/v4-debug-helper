import React from 'react'
import { Typography, Divider } from 'antd';
import './index.less';

import RuleList from '../ruleLists';

const { Title, Paragraph, Text } = Typography;

const Home = () => {
    return (
        <div className="home">
            <div className="desc-container">
                <Title>TS MIDDLEMAN - Response Hijacker</Title>
                <Paragraph><Text strong>Ultimate Solution For Frontend Debug</Text></Paragraph>
            </div>
            <Divider />
            <div className="rule-list-container">
                <RuleList />
            </div>
        </div>

    )
};

export default Home;

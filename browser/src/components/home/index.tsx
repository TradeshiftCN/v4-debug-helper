import React from 'react'
import { Typography, Divider } from 'antd';
import './index.less';

import RuleList from '../ruleLists';

const { Title, Paragraph, Text } = Typography;

const Home = () => {
    return (
        <div className="home">
            <div className="desc-container">
                <Title>TS MIDDLEMAN - response hijacker </Title>
                <Paragraph>
                    add some description here, add some description here, add some description here, ae des
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


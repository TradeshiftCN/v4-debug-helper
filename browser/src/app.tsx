import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import TopBar from './components/topBar';
import Home from './components/home';
import Config from './components/config';
import Help from './components/help';

import './app.less';

const { Content } = Layout;

const App: React.FC = () => {
    return (
        <div className="app">
            <Router>
                <Layout>
                    <TopBar/>
                    <Content className="content">
                        <Route path="/" exact component={Home} />
                        <Route path="/config/" component={Config} />
                        <Route path="/help/" component={Help} />
                    </Content>
                </Layout>
            </Router>
        </div>
    );
}

export default App;

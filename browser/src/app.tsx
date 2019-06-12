import React from 'react';
import { Layout, Spin } from 'antd';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux'

import TopBar from './components/topBar';
import Home from './components/home';
import Config from './components/config';
import Help from './components/help';
import V4Inspector from './components/rules/v4-inspector';
import MockServer from './components/rules/mock-server';

import './app.less';

const { Content } = Layout;

const mapState = (state:any) => ({
    loading: state.spinner.show,
    loadingMessage: state.spinner.message
});


const mapDispatch = (dispatch: any) => ({
    getSystemConfigAsync: dispatch.system.getSystemConfigAsync,
    startProxyAsync: dispatch.proxy.startProxyAsync
});

class App extends React.PureComponent{

    props: any;

    constructor(props:any){
        super(props);
        this.props = props;
        props.getSystemConfigAsync();
        props.startProxyAsync();
    }

    render() {
        return (
            <Spin spinning={this.props.loading} tip={this.props.loadingMessage}>
                <div className="app">
                    <Router>
                        <Layout>
                            <TopBar/>
                            <Content className="content">
                                <Route path="/" exact component={Home} />
                                <Route path="/config/" component={Config} />
                                <Route path="/help/" component={Help} />
                                <Route path="/rules/v4-inspector/" component={V4Inspector} />
                                <Route path="/rules/mock-server/" component={MockServer} />
                            </Content>
                        </Layout>
                    </Router>
                </div>
            </Spin>
        );
    }
}

export default connect(mapState, mapDispatch)(App);

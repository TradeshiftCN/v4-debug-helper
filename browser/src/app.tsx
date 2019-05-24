import React from 'react';
import { Layout, Spin } from 'antd';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux'

import TopBar from './components/topBar';
import Home from './components/home';
import Config from './components/config';
import Help from './components/help';

import './app.less';

const { Content } = Layout;

const mapState = (state:any) => ({
    loading: state.spinner.show,
    loadingMessage: state.spinner.message
});


const mapDispatch = (dispatch: any) => ({
    getSystemConfigAsync: dispatch.system.getSystemConfigAsync
});

class App extends React.PureComponent{

    props: any;

    constructor(props:any){
        super(props);
        this.props = props;
        props.getSystemConfigAsync();
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
                            </Content>
                        </Layout>
                    </Router>
                </div>
            </Spin>
        );
    }
}

export default connect(mapState, mapDispatch)(App);
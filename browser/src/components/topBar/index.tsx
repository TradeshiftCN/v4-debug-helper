import React from 'react'
import {Layout, Menu, Icon, Switch} from 'antd';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'

import './index.less';

import logo from './logo.png';

const { Header } = Layout;

const mapState = (state:any) => ({
    proxyStarted: state.proxy.status === 'started'
});

const mapDispatch = (dispatch: any) => ({
    startProxyAsync: dispatch.proxy.startProxyAsync,
    stopProxyAsync: dispatch.proxy.stopProxyAsync
});

const toggleProxy = (props: any, checked: boolean) => {
    if(checked){
        props.startProxyAsync();
    } else {
        props.stopProxyAsync()
    }
};

const TopBar = (props: any) => {
    return (
        <Header className="top-bar">
            <div className="logo">
                <img className="logo-img" src={logo} alt=""/>
                <span className="logo-text">TS MIDDLEMAN</span>
            </div>
            <Menu
                className="menu"
                mode="horizontal"
                defaultSelectedKeys={['home']}
            >
                <Menu.Item key="home"><Link to="/"><Icon className="menu-item-icon" type="home" theme="filled"/></Link></Menu.Item>
                <Menu.Item key="config"><Link to="/config/"><Icon className="menu-item-icon" type="setting" theme="filled" /></Link></Menu.Item>
                <Menu.Item key="help"><Link to="/help/"><Icon className="menu-item-icon" type="question-circle" /></Link></Menu.Item>
                <div className="operations-block">
                    {/*<Button className="operations-btn" type="link" icon="play-circle" ghost={true} disabled={props.proxyStarted}/>*/}
                    {/*<Button className="operations-btn" type="link" icon="pause-circle" ghost={true} disabled={!props.proxyStarted}/>*/}
                    <Switch checkedChildren="On" unCheckedChildren="Off" checked={props.proxyStarted} onClick={(checked:boolean) => toggleProxy(props, checked)} />
                </div>
            </Menu>
        </Header>
    )
};

export default connect(mapState, mapDispatch)(TopBar);

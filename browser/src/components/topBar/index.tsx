import React from 'react'
import { Layout, Menu, Icon } from 'antd';
import {Link} from 'react-router-dom';

import './index.less';

import logo from './logo.png';

const { Header } = Layout;

const TopBar = () => {
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
                    <Icon className="operations-icon" type="play-circle" theme="twoTone" />
                    <Icon className="operations-icon" type="pause-circle" theme="twoTone" />
                </div>
            </Menu>
        </Header>
    )
};

export default TopBar;


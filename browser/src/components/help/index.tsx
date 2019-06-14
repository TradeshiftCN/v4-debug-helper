import React from 'react';
import { Icon, Divider, Typography, Card, Col, Row } from 'antd';
import serverConfigure from './server-configure.png';
import switchMode from './switch-mode.png';

const { Title, Paragraph, Text } = Typography;
const { Meta } = Card;

const Help = () => {
    return (
        <div className="help">
            <Title>TS MIDDLEMAN</Title>
            <Paragraph className="project-desc">
                This project is mainly used in the following two aspects:
                <ul>
                    <li>
                        Use local front-end V4 resources to replace V4 resources in online environments for easier local debugging(environments like testing, sandbox or production)
                    </li>
                    <li>
                        Mock urls and their response to replace the real backend requests in online environments, so that front-end developers can keep developing even when the backend interface has not been completed.
                    </li>
                    <li>
                        We support multi-platform: MacOs, Windows, Linux, and multi-browsers: Chrome, Firefox，Safari.
                    </li>
                </ul>
            </Paragraph>
            <Divider />

            <Paragraph>
                <Title>Install the certificate</Title>
                <Text type="warning" className="certificate-tip">
                    <Icon type="warning" /> if you have already generated a certificate before, you can omit the following steps.
                </Text>
            </Paragraph>
            <Paragraph className="certificate-install">
                <Text type="warning" className="certificate-tip">
                    <Icon type="info-circle" /> If you don't wanna generate certificate by yourself, you can click <a href="http://localhost:8003/proxy/rootca">here</a> to download the certificate. The following steps an be omitted.
                </Text>
                <ol>
                    <li>
                        Open the v4-debug-helper project in the command line tool, run <Text code>npx anyproxy-ca</Text> to generate the certificate.
                    </li>
                    <li>
                        Then the directory where the certificate is located will be opened automatically. Double-click the certificate and select Always Trust it.
                    </li>
                </ol>
            </Paragraph>
            <Divider />

            <Title>Configure the proxy</Title>
            <Paragraph className="configure-proxy">
                <ol>
                    <li>
                        <a href="https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif">Click here</a>&nbsp;
                        to install SwitchyOmega and according to the installation guide to configure;
                        <div style={{ background: '#ECECEC', padding: '30px' }}>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Card
                                        hoverable
                                        style={{ width: 520 }}
                                        cover={<img alt="example" src={serverConfigure} />}
                                    >
                                        <Meta title="Configure server" description="Just use the default configuration" />
                                    </Card>
                                </Col>
                                <Col span={12}>
                                    <Card
                                        hoverable
                                        style={{ width: 520 }}
                                        cover={<img alt="example" src={switchMode} />}
                                    >
                                        <Meta title="Switch mode" description="Add addresses you need" />
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </li>
                    <li>
                        Proxy server: use the default proxy server configuration.
                    </li>
                    <li>
                        Proxy switch rules: add testing, sandbox, production line, and team stack addresses as you need.
                    </li>
                </ol>
            </Paragraph>
        </div>
    )
};

export default Help;


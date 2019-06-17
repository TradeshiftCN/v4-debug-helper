import React from 'react';
import { Icon, Divider, Typography, Card, Col, Row } from 'antd';
import pluginRuleList from './pluginRuleList.png';

const { Title, Paragraph, Text } = Typography;
const { Meta } = Card;

const Help = () => {
    return (
        <div className="help">
            <Title>TS MIDDLEMAN</Title>
            <Paragraph className="project-desc">
                TS MIDDLEMAN is a multi-platform and multi-browser supported frontend debug tool which provide two powerful function:
                <ul>
                    <li>
                        Use local front-end V4 resources to replace online V4 resources for easier local debugging(environments like testing, sandbox or production)
                    </li>
                    <li>
                        Mock urls and their response to replace the real backend requests in any environments, so that front-end developers can keep developing even when the backend interface has not been completed.
                    </li>
                </ul>
            </Paragraph>

            <Paragraph>
                    <Title level={2}>How to use</Title>
                    <p>TS middleman in essence is a http proxy which modify the http response on runtime.
                        So you have to follow these steps to configure you system certificate and browser proxy at the beginning.</p>

                    <Title level={3}>Install the certificate</Title>

                    <p>1. Click <a href="http://localhost:3000/proxy/rootca">here</a> to download the root certificate.</p>
                    <p>2. Install the root certificate.</p>

                    <Title level={3}>Configure proxy</Title>
                    <p>We suggest plugin <Text strong>Proxy SwitchyOmega</Text> as the browser proxy control plugin. </p>
                    <ul>
                        <li>
                            With chrome, please go to <Text underline>https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif</Text> to install.
                        </li>
                        <li>
                            With firefox, please to to <Text underline>https://addons.mozilla.org/en-US/firefox/addon/switchyomega/</Text> to install.
                        </li>
                        <li>
                            With Safari, Edge or any other browser, please set use ts middleman as your system proxy.
                        </li>
                    </ul>

                    <p>Once you have installed <Text strong>Proxy SwitchyOmega</Text>, please click <a href="http://localhost:3000/OmegaOptions_tsMiddleman.bak">here</a> to download the proxy config and then import it.</p>
                    <p>You you see the switch rules in the config page of <Text strong>Proxy SwitchyOmega</Text> after import success.</p>

                    <p>
                        <Row gutter={16}>
                            <Col span={18} push={3}>
                                <Card
                                    hoverable
                                    style={{ width: '100%' }}
                                    cover={<img alt="example" src={pluginRuleList} />}
                                >
                                </Card>
                            </Col>
                        </Row>
                    </p>

                    <p>It's the default rule in above screenshot, you can add other rules to match you target environment.</p>

                    <Text type="warning">Note: Firefox should set config `security.mixed_content.block_active_content` to false.</Text>

            </Paragraph>

        </div>
    )
};

export default Help;


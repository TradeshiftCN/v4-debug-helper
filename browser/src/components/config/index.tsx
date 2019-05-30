import React from 'react'
import {Button, Form, InputNumber} from 'antd';
import { connect } from 'react-redux'

const mapState = (state:any) => ({
    proxyPort: state.system.proxyPort
});


const mapDispatch = (dispatch: any) => ({
    updateProxyPortAsync: dispatch.system.updateProxyPortAsync,
    restartProxyAsync: dispatch.proxy.restartProxyAsync
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>
type Props = connectedProps

const initialState = { proxyPort: null };
type State = Readonly<typeof initialState>

class Config extends React.PureComponent<Props>{

    state: State = initialState;

    constructor(props:any){
        super(props);
        this.onProxyPortChange.bind(this);
        this.updateProxyPort.bind(this);
    }

    onProxyPortChange(proxyPort:any){
        this.setState({
            proxyPort: proxyPort
        })
    }

    updateProxyPort(){

        this.props.updateProxyPortAsync(this.state.proxyPort || this.props.proxyPort).then(() => this.props.restartProxyAsync());
    }

    render() {
        return (
            <Form>
                <Form.Item label="Proxy Port">
                    <InputNumber style={{width: '100%'}} min={1024} max={65535} precision={0} placeholder="proxy listening port" onChange={(port:any) => this.onProxyPortChange(port)} defaultValue={this.props.proxyPort} />
                </Form.Item>
                <Form.Item >
                    <Button type="primary" onClick={() => this.updateProxyPort()}>Save</Button>
                </Form.Item>
            </Form>
        )
    }
}

export default connect(mapState, mapDispatch)(Config);


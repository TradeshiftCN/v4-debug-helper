import React from 'react';
import * as _ from 'lodash';
import {Collapse, Breadcrumb, Button, Popconfirm} from 'antd';
import { connect } from 'react-redux';
import {ColumnProps} from 'antd/lib/table';
import { HttpMethod, MockRuleModel, MockResponseModel } from '../../../models/mockServer';

import EditableTable from '../../editableTable';
import ResponseEditor from './responseEditor';

const Panel = Collapse.Panel;

const mapState = (state:any) => ({
    dataSource: state.mockServer.rules
});

const mapDispatch = (dispatch: any) => ({
    getMockServerConfigAsync: dispatch.mockServer.getMockServerConfigAsync,
    deleteAsync: dispatch.mockServer.deleteMockServerSync,
    addSync: dispatch.mockServer.addMockServerSync,
    updateSync: dispatch.mockServer.updateMockServerSync
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>
type Props = connectedProps

interface EditableColumnProps extends ColumnProps<MockRuleModel> {
    editable?: boolean;
    rules?: any[];
}

class mockServer extends React.PureComponent<Props>{

    state = {
        isEditingResponse: false,
        editingMockRule: this.getInitEditingMockRule()
    };

    private columns : EditableColumnProps[] = [
        {
            title: 'Name',
            dataIndex: 'name',
            width: '10%',
            editable: true,
            rules: [
                {
                    required: true
                }
            ]
        },
        {
            title: 'Method',
            width: '10%',
            dataIndex: 'request.method',
            editable: true,
            rules: [
                {
                    required: true,
                    type: 'enum',
                    enum: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'CONNECTED'],
                }
            ]
        },
        {
            title: 'Url Pattern',
            width: '65%',
            dataIndex: 'request.urlPattern',
            editable: true,
            rules: [
                {
                    required: true
                }
            ]
        },
        {
            title: 'Operations',
            dataIndex: 'operations',
            width: '15%',
            render: (text:string, record:MockRuleModel) =>
                this.props.dataSource.length >= 1 ? (
                    <div className="line-operation-buttons">
                        <Button type="link" onClick={() => this.showEditingResponse(record)}>response</Button>
                        <Button type="link" onClick={() => this.toggleLine(record)}>{record.enabled ? 'disable' : 'enable'}</Button>
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.props.deleteAsync(record.id)}>
                            <Button type="link" className="delete-btn">delete</Button>
                        </Popconfirm>
                    </div>

                ) : null,
        }
    ];

    private getInitEditingMockRule():MockRuleModel {
        return {
            name: '',
            request: {
                method: HttpMethod.GET,
                urlPattern: ''
            },
            response: {
                statusCode: 200,
                header: {},
                body: ''
            },
            enabled: false
        };
    }

    constructor(props: Props) {
        super(props);
        this.addNewLine.bind(this);
        this.toggleLine.bind(this);
        this.updateRuleResponse.bind(this);
        this.props.getMockServerConfigAsync();
    }

    addNewLine() {
        let newModel: MockRuleModel =this.getInitEditingMockRule();
        newModel.name = `name_${this.props.dataSource.length+1}`;
        this.props.addSync(newModel);
    }

    toggleLine(record:MockRuleModel) {
        const newModel = {
            ...record,
            enabled: !record.enabled
        };
        this.props.updateSync(newModel);
    }

    showEditingResponse(record: MockRuleModel) {
        this.setState({
            isEditingResponse: true,
            editingMockRule: record
        });
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    updateRuleResponse(response: MockResponseModel) {
        const newModel: MockRuleModel = _.merge({}, this.state.editingMockRule, { response });
        this.props.updateSync(newModel).then(() => {
            // todo avoid reload
            window.location.reload();
        });
    }


    render(){
        return (
            !this.state.isEditingResponse ?
                <div>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Rules</Breadcrumb.Item>
                        <Breadcrumb.Item>Mock Server</Breadcrumb.Item>
                    </Breadcrumb>

                    <Collapse bordered={false} defaultActiveKey={['1']}>
                        <Panel header="Mock Server" key="1">
                            <EditableTable
                                columns={this.columns}
                                dataSource={this.props.dataSource}
                                handleUpdate={this.props.updateSync}
                                handleAdd={() => this.addNewLine()}
                            />
                        </Panel>
                    </Collapse>
                </div> :
                <div>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Rules</Breadcrumb.Item>
                        <Breadcrumb.Item href="/rules/mock-server/">Mock Server</Breadcrumb.Item>
                        <Breadcrumb.Item>{ this.state.editingMockRule.name}</Breadcrumb.Item>
                    </Breadcrumb>

                    <ResponseEditor mockRule={this.state.editingMockRule} onSubmit={(response: MockResponseModel) => this.updateRuleResponse(response)}/>
                </div>
        )
    }
}


export default connect(mapState, mapDispatch)(mockServer);

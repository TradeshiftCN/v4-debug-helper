import React from 'react'
import { Button, Popconfirm } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { connect } from 'react-redux'

import EditableTable from '../../../editableTable';

import { AppRedirectMappingModel } from '../../../../models/v4Inspector';

const mapState = (state:any) => ({
    dataSource: state.v4Inspector.appRedirectMapping
});

const mapDispatch = (dispatch: any) => ({
    deleteAsync: dispatch.v4Inspector.deleteAppMappingSync,
    addSync: dispatch.v4Inspector.addAppMappingSync,
    updateSync: dispatch.v4Inspector.updateAppMappingSync
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>
type Props = connectedProps

interface EditableColumnProps extends ColumnProps<AppRedirectMappingModel> {
    editable?: boolean;
    rules?: any[];
}

class appMappings extends React.PureComponent<Props>{
    private columns : EditableColumnProps[] = [
        {
            title: 'App Id',
            dataIndex: 'appId',
            width: '15%',
            editable: true,
            rules: [
                {
                    required: true
                }
            ]
        },
        {
            title: 'Redirect Url',
            width: '70%',
            dataIndex: 'redirectUrl',
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
            render: (text:string, record:AppRedirectMappingModel) =>
                this.props.dataSource.length >= 1 ? (
                    <div className="line-operation-buttons">
                        <Button type="link" onClick={() => this.toggleLine(record)}>{record.enabled ? 'disable' : 'enable'}</Button>
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.props.deleteAsync(record.id)}>
                            <Button type="link" className="delete-btn">delete</Button>
                        </Popconfirm>
                    </div>

                ) : null,
        }
    ];

    constructor(props:Props){
        super(props);
        this.addNewLine.bind(this);
        this.toggleLine.bind(this);
    }

    addNewLine() {
        const newModel: AppRedirectMappingModel = {
            appId: `appId_${this.props.dataSource.length+1}`,
            redirectUrl: '',
            enabled: false
        };
        this.props.addSync(newModel);
    }

    toggleLine(record:AppRedirectMappingModel) {
        const newModel = {
            ...record,
            enabled: !record.enabled
        };
        this.props.updateSync(newModel);
    }

    render() {
        return (
            <EditableTable
                columns={this.columns}
                dataSource={this.props.dataSource}
                handleUpdate={this.props.updateSync}
                handleAdd={() => this.addNewLine()}
            />
        )
    }
}

export default connect(mapState, mapDispatch)(appMappings);

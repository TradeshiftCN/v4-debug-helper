import React from 'react'
import {Button, Popconfirm} from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { connect } from 'react-redux'

import EditableTable from '../../../editableTable';

import { InspectUrlModel } from '../../../../models/v4Inspector';

const mapState = (state:any) => ({
    dataSource: state.v4Inspector.inspectUrls
});

const mapDispatch = (dispatch: any) => ({
    deleteAsync: dispatch.v4Inspector.deleteInspectUrlSync,
    addSync: dispatch.v4Inspector.addInspectUrlsSync,
    updateSync: dispatch.v4Inspector.updateInspectUrlSync,
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>
type Props = connectedProps

interface EditableColumnProps extends ColumnProps<InspectUrlModel> {
    editable?: boolean;
    rules?: any[];
}

class inspectorUrls extends React.PureComponent<Props>{
    private columns : EditableColumnProps[] = [
        {
            title: 'Name',
            dataIndex: 'name',
            width: '15%',
            editable: true,
            rules: [
                {
                    required: true
                }
            ]
        },
        {
            title: 'Url Pattern',
            width: '60%',
            dataIndex: 'pattern',
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
            width: '25%',
            render: (text:string, record:InspectUrlModel) =>
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
        const newModel: InspectUrlModel = {
            name: `name_${this.props.dataSource.length+1}`,
            pattern: '',
            enabled: false
        };
        this.props.addSync(newModel);
    }

    toggleLine(record:InspectUrlModel) {
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

export default connect(mapState, mapDispatch)(inspectorUrls);

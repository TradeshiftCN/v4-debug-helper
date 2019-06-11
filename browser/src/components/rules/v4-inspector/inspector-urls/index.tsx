import React from 'react'
import {Icon, Popconfirm, Switch} from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { connect } from 'react-redux'

import EditableTable from '../../../editableTable';

import { InspectUrlModel } from '../../../../models/v4Inspector';

import './index.less';

const mapState = (state:any) => ({
    dataSource: state.v4Inspector.inspectUrls
});

const mapDispatch = (dispatch: any) => ({
    deleteAsync: dispatch.v4Inspector.deleteInspectUrlSync,
    addInspectUrlsSync: dispatch.v4Inspector.addInspectUrlsSync,
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
            title: 'Id',
            dataIndex: 'name',
            width: '15%',
            editable: true,
            rules: [
                {
                    required: true,
                    message: `dd is required.`,
                }
            ]
        },
        {
            title: 'Url Pattern',
            width: '70%',
            dataIndex: 'pattern',
            editable: true,
            rules: [
                {
                    required: true,
                    message: `url pattern is required.`,
                }
            ]
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            width: '15%',
            render: (text:string, record:InspectUrlModel) =>
                this.props.dataSource.length >= 1 ? (
                    <div className="operation-buttons">
                        <Switch checked={record.enabled} onChange={(checked:boolean) => this.toggleInspectUrl(checked, record)} />
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.props.deleteAsync(record.name)}>
                            <Icon type="delete"/>
                        </Popconfirm>
                    </div>

                ) : null,
        },
    ];


    constructor(props:Props){
        super(props);
        this.addNewInspectUrl.bind(this);
        this.toggleInspectUrl.bind(this);
    }

    addNewInspectUrl() {
        const newModel: InspectUrlModel = {
            name: `name_${this.props.dataSource.length+1}`,
            pattern: '',
            enabled: false
        };
        this.props.addInspectUrlsSync(newModel);
    }

    toggleInspectUrl(enabled:boolean, record:InspectUrlModel) {
        const newModel = {
            ...record,
            enabled
        };
        this.props.updateSync(newModel);
    }

    render() {
        return (
            <EditableTable
                columns={this.columns}
                dataSource={this.props.dataSource}
                handleUpdate={this.props.updateSync}
                handleAdd={() => this.addNewInspectUrl()}
            />
        )
    }
}

export default connect(mapState, mapDispatch)(inspectorUrls);

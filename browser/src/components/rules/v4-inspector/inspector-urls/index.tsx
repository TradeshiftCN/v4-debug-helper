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
    deleteAsync: (name:string) => {},
    addSync: () => {},
    updateSync: () => {},
    toggleAsync: (enabled:boolean, record:InspectUrlModel) => {}
});

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>
type Props = connectedProps

interface EditableColumnProps extends ColumnProps<InspectUrlModel> {
    editable?: boolean;
}

class inspectorUrls extends React.PureComponent<Props>{
    private columns : EditableColumnProps[] = [
        {
            title: 'Id',
            dataIndex: 'name',
            width: '20%',
            editable: true
        },
        {
            title: 'Url Pattern',
            width: '70%',
            dataIndex: 'pattern',
            editable: true
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            width: '10%',
            render: (text:string, record:InspectUrlModel) =>
                this.props.dataSource.length >= 1 ? (
                    <div className="operation-buttons">
                        <Switch checked={record.enabled} onChange={(checked:boolean) => this.props.toggleAsync(checked, record)} />
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.props.deleteAsync(record.name)}>
                            <Icon type="delete"/>
                        </Popconfirm>
                    </div>

                ) : null,
        },
    ];


    constructor(props:Props){
        super(props);
    }

    render() {
        return (
            <EditableTable
                columns={this.columns}
                dataSource={this.props.dataSource}
                handleUpdate={this.props.updateSync}
                handleAdd={this.props.addSync}
            />
        )
    }
}

export default connect(mapState, mapDispatch)(inspectorUrls);

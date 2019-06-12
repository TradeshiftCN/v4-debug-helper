import PropTypes from 'prop-types';
import React from 'react';
import './index.less';
import { Table, Input, Button, Form } from 'antd';
import * as _ from 'lodash';

const EditableContext = React.createContext(null);

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    state = {
        editing: false,
    };

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        });
    };

    save = e => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            this.toggleEdit();
            handleSave(_.merge({},record, values));
        });
    };

    renderCell = form => {
        this.form = form;
        const { children, dataIndex, record, rules } = this.props;
        const { editing } = this.state;
        return editing ? (
            <Form.Item style={{ margin: 0 }}>
                {form.getFieldDecorator(dataIndex, {
                    rules,
                    initialValue: _.get(record, dataIndex),
                })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                onClick={this.toggleEdit}
            >
                {children}
            </div>
        );
    };

    render() {
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
                ) : (
                    children
                )}
            </td>
        );
    }
}

class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = props.columns;
        this.state = {
            dataSource: [],
            count: props.dataSource.length,
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            dataSource: props.dataSource,
            count: props.dataSource.length
        });
    }

    render() {
        const { dataSource } = this.state;
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    rules: col.rules,
                    handleSave: this.props.handleUpdate
                }),
            };
        });
        return (
            <div className="editable-table">
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                    pagination={{position: this.props.pagination || 'none'}}
                />
                <div className="table-operation-buttons clearfix">
                    <Button type="dashed" onClick={this.props.handleAdd} >+ Add a line</Button>
                </div>
            </div>
        );
    }
}

EditableTable.propTypes = {
    columns: PropTypes.array,
    dataSource: PropTypes.array,
    handleUpdate: PropTypes.func,
    handleAdd: PropTypes.func,
    pagination: PropTypes.string
};

export default EditableTable;



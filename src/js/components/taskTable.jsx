import React from 'react';
import { Table, Button, Input, Icon ,Switch} from 'antd';
import * as taskManager from '../interface/taskManager.js';

const sortOptions = {
    sortKey: '',
    sortOrder: 'descend'
};
export default class extends React.Component {
    componentWillMount() {
       this.searchTaskList();
    }
    state = {
        selectedRowKeys: [],
        loading: false,
        filterDropdownVisible: false,
        searchText: '',
        filtered: false,
        dataSource:[]
    };
    /**
     * 
     * 
     */
    searchTaskList=()=>{
        taskManager.taskList({}).then(res=> {
            this.setState({
                dataSource:res&&res.slice()
            })
        })
    }
    onInputChange = (e) => {
        this.setState({
            searchText: e.target.value
        })
    }
    onSearch = () => {
        const { searchText } = this.state;
        const reg = new RegExp(searchText, 'gi');
        this.setState({
            filterDropdownVisible: false,
            filtered: !!searchText
        })
    }
    updateFilterOptions = (pagination, filters, sorter) => {
        debugger
    };
    start = () => {
        this.setState({ loading: true });
        //ajax
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false
            })
        }, 1000);
    }
    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    }

    render() {
        const columns = [{
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            sorter: (a, b) => {
                return a.type - b.type;
            },
            render: (text) => {
                var span;
                switch (text) {
                    case 1:
                        span = <span>非常重要</span>;
                        break;
                    case 2:
                        span = <span>比较重要</span>;
                        break;
                    case 3:
                        span = <span>不重要</span>;
                        break;
                    default:
                        break;
                }
                return span;
            }
        }, {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            filterDropdown: (
                <div className="customDropDown">
                    <Input
                        style={{ margin: '0 8px', width: '130px' }}
                        ref={ele => { this.searchInput = ele }}
                        placeholder="名称"
                        value={this.state.searchText}
                        onChange={this.onInputChange}
                        onPressEnter={this.onSearch}
                    />
                    <Button type="primary" onClick={this.onSearch}>查询</Button>
                </div>
            ),
            filterIcon: <Icon type="smile-o" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
            filterDropdownVisible: this.state.filterDropdownVisible,
            onFilterDropdownVisibleChange: (visible) => {
                this.setState({
                    filterDropdownVisible: visible,
                }, () => this.searchInput.focus())
            }
        }, {
            title: '需时',
            dataIndex: 'needTime',
            key: 'needTime'
        }, {
            title: '时限',
            dataIndex: 'timeLimited',
            key: 'timeLimited'
        }, {
            title: '难度',
            dataIndex: 'difficulty',
            key: 'difficulty',
            sorter: (a, b) => {
                return a.type - b.type;
            },
            render: (text) => {
                var span;
                switch (text) {
                    case 1:
                        span = <span>非常难</span>;
                        break;
                    case 2:
                        span = <span>比较难</span>;
                        break;
                    case 3:
                        span = <span>简单</span>;
                        break;
                    default:
                        break;
                }
                return span;
            }
        }, {
            title: '完成',
            dataIndex: 'complete',
            key: 'complete'
        }, {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation'
        }];
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div>
                <Button onClick={this.start} type="primary" disabled={!hasSelected} loading={loading}>重置</Button>
                <Table onChange={this.state.updateFilterOptions} className="diyTable" bordered rowSelection={rowSelection} dataSource={this.state.dataSource} columns={columns} />
            </div>
        )
    }
}
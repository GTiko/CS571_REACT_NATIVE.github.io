import React from "react";

class TodoListUsingClass extends React.Component {
    state = { list: [], value: "", id: 0, showAdd: true };

    handleChange = (e) => {
        this.setState({ ...this.state, value: e.target.value });
    };
    componentDidMount() {
        console.log("mount")
        const storedList = JSON.parse(localStorage.getItem('todoList'));
        if (storedList) {
            this.setState({ ...this.state, list: storedList });
        }
    };
    componentWillUnmount(){
        console.log("unmount")
    }
    componentDidUpdate(){
        console.log("update")
    }
    submitTodo = () => {
        this.state.list.push({ id: this.state.id, todo: this.state.value });
        this.setState({ ...this.state, value: "", id: this.state.id + 1 });
        localStorage.setItem('todoList', JSON.stringify(this.state.list));
    };
    deleteTodo = (id) => {
        const newList = [...this.state.list];
        const remainingList = newList.filter(each => each.id !== id);
        this.setState({ ...this.state, list: remainingList, showAdd: true, value: "" });
        localStorage.setItem('todoList', JSON.stringify(remainingList));
    };
    editTodo = (id) => {
        const editableTodo = this.state.list.find(each => each.id === id);
        this.setState({ ...this.state, value: editableTodo.todo, id: id, showAdd: false });
    };
    updateTodo = () => {
        const newList = [...this.state.list];
        for (let each of newList) {
            if (each.id === this.state.id) {
                each.todo = this.state.value;
                this.setState({ ...this.state, list: newList, value:"", showAdd: true });
                localStorage.setItem('todoList', JSON.stringify(this.state.list));
                break;
            }
        }
    };
    render() {
        return (
            <>
                <h1>Todo's</h1>
                <input type="text" value={this.state.value} onChange={this.handleChange} /> &nbsp;
                {this.state.showAdd ? <button onClick={this.submitTodo}>Add todo</button> :
                    <button onClick={this.updateTodo}>Update todo</button>}
                <ul>
                    {this.state.list.map((todoList, index) => 
                    <li key={index}>{todoList.todo} &nbsp;
                        <button onClick={() => { this.editTodo(todoList.id) }}>edit</button> &nbsp;
                        <button onClick={() => { this.deleteTodo(todoList.id) }}>delete</button>
                    </li>)}
                </ul>
            </>
        );
    };
}

export default TodoListUsingClass;

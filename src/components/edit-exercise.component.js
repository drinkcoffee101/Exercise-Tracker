import React, { Component } from 'react';
import axios from 'axios'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"


export default class EditExcercice extends Component {

    constructor(props) {
        super(props)

        //so this refers to the correct class 
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangeDescription = this.onChangeDescription.bind(this)
        this.onChangeDuration = this.onChangeDuration.bind(this)
        this.onChangeDate = this.onChangeDate.bind(this)
        this.onSumbit = this.onSumbit.bind(this)


        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {

        axios.get('http://localhost:5000/exercises/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    username: res.data.username,
                    description: res.data.description,
                    duration: res.data.duration,
                    date: new Date(res.data.date)
                })
            })

        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length) {
                    this.setState({
                        users: response.data.map(user => user.username)
                    })
                }
            })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }
    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        })
    }
    onChangeDate(date) {
        this.setState({
            date: date
        })
    }

    onSumbit(e) {
        e.preventDefault()

        const excercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(excercise)

        axios.post('http://localhost:5000/exercises/update/' + this.props.match.params.id, excercise)
            .then(res => console.log(res.data))
            .catch(err => console.error(err))

        window.location = '/'
    }


    render() {
        return (
            <div>
                <h3>Edit Excercise Log</h3>
                <form onSubmit={this.onSumbit}>
                    <div className='form-group'>
                        <label>Username: </label>
                        <select ref='userInput'
                            required
                            className='form-control'
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                            {
                                this.state.users.map((user, i) => {
                                    return <option
                                        key={i}
                                        value={user}>{user}
                                    </option>
                                })
                            }
                        </select>
                    </div>
                    <div className='form-group'>
                        <label>Description: </label>
                        <input
                            type='text'
                            required
                            className='form-control'
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Duration (in minutes): </label>
                        <input
                            type='text'
                            className='form-control'
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>
                    <div>
                        <DatePicker
                            selected={this.state.date}
                            onChange={this.onChangeDate}
                        />
                    </div>

                    <div className='form-group'>
                        <input type='submit' value='Edit Exercise Log' className='btn btn-primary' />
                    </div>
                </form>
            </div>
        )
    }
}
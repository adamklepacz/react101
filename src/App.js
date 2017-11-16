import React from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buyItems: ['milk', 'bread', 'fruit'],
      message: ''
    }
  }

  addItem(e) {
    e.preventDefault();
    const {buyItems} = this.state;
    const newItem = this.someInput.value;
    const customForm = this.customForm;
    const isOnTheList = buyItems.includes(newItem);

    if(isOnTheList) {
      this.setState({
        message: 'This item is allready on the list!'
      })
      console.log(this.state.message);
    } else {
      newItem !== '' && this.setState({
        buyItems: [...this.state.buyItems, newItem],
        message: ''
      })
    }

    customForm.reset();
  }

  removeItem(item) {
    const newBuyItems = this.state.buyItems.filter(buyItem => {
      return buyItem !== item;
    });

    this.setState({
      buyItems: newBuyItems
    })

    if(newBuyItems.length === 0) {
      this.setState({
        message: 'No items on the list. Add some.'
      })
    }
  }

  render() {
    const {buyItems, message} = this.state;

    return (
     <div>
       <header>
        <img src={logo} alt={"logo"} className="logo_svg"/>
        <h1>Shopping list</h1>

          <form
            className="form-inline form-custom"
            onSubmit={(e) => {this.addItem(e)}}
            ref={(form) => {  this.customForm = form; }}
            >
            <div className="form-group">
              <label className="sr-only" htmlFor="newItemInput">{"Add new input"}</label>
              <input
                type="text"
                placeholder="Bread"
                className="form-control"
                id="newItemInput"
                ref={(input) => { this.someInput = input; }}
                required="required"
               />
            </div>
            <button type="submit" className="btn btn-outline-primary">Add</button>
          </form>

       </header>
       <div className="content">
        {
          (message !== '' || buyItems.length === 0) && <div className="alert alert-danger message"><strong>Warning! </strong>{message}</div>
        }

        {
          buyItems.length > 0 &&
          <table className="table">
          <caption>Shopping list</caption>
          <thead>
          <tr>
          <th scope="col">#</th>
          <th scope="col">Item</th>
          <th scope="col">Action</th>
          </tr>
          </thead>
          <tbody>
          {
            buyItems.map((item,index) => {
              return (
                <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item}</td>
                <td className="text-right">
                <button
                onClick={(e) => this.removeItem(item)}
                type="button"
                className="btn btn-outline-danger btn-sm"
                >Remove</button>
                </td>
                </tr>
              )
            })
          }
          </tbody>
          <tfoot>
            <tr>
            </tr>
          </tfoot>
          </table>
        }

       </div>
      </div>
    )
  }
}

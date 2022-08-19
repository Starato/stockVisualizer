import React, { Component } from 'react'

export default class BodyPage extends Component {
    constructor(props) {
        super(props);

        this.handleSearchAutocomplete = this.handleSearchAutocomplete.bind(this);
    }

    handleSearchAutocomplete(e) {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                ticker: e.target.value
            }),
        };

        fetch('/api/stock', requestOptions)
            .then((response) => response.json())
            .then((data) => console.log(data['bestMatches']));
        
        e.preve
    }

    render(){
        return (
            <div>
                <div id='headerBanner'>
                    <div class='center' id='titleContainer'>
                        <h1>Stock Data Visualizer</h1>
                    </div>
                    <div id='searchContainer'>
                        <form>
                            <input autoFocus type='text' id='searchBar' placeholder='IBM' onBlur={ this.handleSearchAutocomplete }></input>
                        </form>
                    </div> 
                </div>
                <label>Chart Type</label>
                <select>
                    <option>Bar</option>
                    <option>Line</option>
                </select>
    
                <br></br>
                <br></br>
    
    
                <label>Interval</label>
                <select>
                    <optin>Intraday</optin>
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                </select>
    
                <br></br>
                <br></br>
    
    
                <label>Intraday</label>
                <select>
                    <option>1 min</option>
                    <option>5 min</option>
                    <option>15 min</option>
                    <option>30 min</option>
                    <option>60 min</option>
                </select>
    
                <br></br>
                <br></br>
    
    
                <label>Start Date</label>
                <input type='text' placeholder='YYYY-MM-DD'></input>
    
                <br></br>
                <br></br>
    
    
                <label>End Date</label>
                <input type='text' placeholder='YYYY-MM-DD'></input>
    
            </div>
        )
    }
    
}

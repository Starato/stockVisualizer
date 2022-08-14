import React, { Component } from 'react';
import Grid from '@mui/material/Grid';

// export default function Header() {

//   return (
//     <div id='headerBanner'>
//         <div class='center' id='titleContainer'>
//             <h1>Stock Data Visualizer</h1>
//         </div>
//         <div id='searchContainer'>
//             <form>
//                 <input type='text' id='searchBar' placeholder='IBM'></input>
//             </form>
//         </div> 
//     </div>
//   );
// }

export default class StockHomePage extends Component {
    constructor(props) {
        super(props);

    }

    handleSearchChange(e) {
        const asdf = "asdf";
    }

    render() {
        return (
            <div id='headerBanner'>
                <div class='center' id='titleContainer'>
                    <h1>Stock Data Visualizer</h1>
                </div>
                <div id='searchContainer'>
                    <form>
                        <input type='text' id='searchBar' placeholder='IBM'></input>
                    </form>
                </div> 
            </div>
            );
    }
}


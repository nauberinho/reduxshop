/**
 * Created by naube on 2017-06-15.
 */

import React, { Component } from 'react';

export default class History extends Component {

    render(){
        /**/
        let newActionsList = this.props.historyState.actions
       // newActionsList.reverse();

        newActionsList.sort((x, y) => {

            return new Date(y.time) - new Date(x.time);

        })

        let actions = newActionsList.map((action, key) => {

                return(
                    <li key={key} className="history-action">{action.message}
                        {action.regretable == true ?
                            <button className="regret-button" onClick={() => this.props.regretAction (action.regretableIndex)}>Regret action</button> : null}

                    </li>
                )
            })







        return(


            <div className="history-container">

            <ul>
                {actions}
            </ul>


            </div>
        )
    }


}

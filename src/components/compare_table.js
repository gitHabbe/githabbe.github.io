// level.runs && level.runs.length > 0 &&
import React, {Component} from 'react';

const CompareTable = (props) => {
    // console.log(props.levels);
    let tableJSX = props.levels.map((level, index) => {
        let player1Time;
        let player2Time;
        let className;
        let timeDifference;
        let player1ID = level.runs.data.data.runs.find(place => {
            return place.run.players[0].id == props.player1id
        })
        let player2ID = level.runs.data.data.runs.find(place => {
            return place.run.players[0].id == props.player2id
        })
        // --------
        if (player1ID) {
            player1Time = player1ID.run.times.primary_t;
        } else {
            player1Time = 0;
        }
        if (player2ID) {
            player2Time = player2ID.run.times.primary_t;
        } else {
            player2Time = 0;
        }
        if (player1Time == 0 || player2Time == 0) {
            timeDifference = '---';
        } else {
            timeDifference = player1Time - player2Time;
        }
        if (player1Time == 0 && player2Time == 0) {
            className = ['textBlack', 'textBlack'];
        } else if (player1Time == 0 && player2Time > 0) {
            className = ['textBlack', 'textBlue'];
        } else if (player1Time > 0 && player2Time == 0) {
            className = ['textBlue', 'textBlack'];
        } else if (player1Time - player2Time < 0) {
            className = ['textAhead', 'textBehind'];
        } else if (player1Time - player2Time > 0){
            className = ['textBehind', 'textAhead'];
        }
        if (typeof(timeDifference) == 'number') {
            timeDifference = timeDifference.toFixed(2);
        }
        if (player1Time >= 60) {
            let seconds = player1Time % 60
            if (seconds < 10) {
                seconds = seconds.toFixed(2);
                seconds = '0' + seconds;
                player1Time = '1:' + seconds;
            } else {
                player1Time = '1:' + seconds.toFixed(2);
            }
        }
        if (player2Time >= 60) {
            let seconds = player2Time % 60
            if (seconds < 10) {
                seconds = seconds.toFixed(2);
                seconds = '0' + seconds;
                player2Time = '1:' + seconds;
            } else {
                player2Time = '1:' + seconds.toFixed(2);
            }
        }
        // ------
        return <tr key={index}>
            <td>
                {level.name}
            </td>
            <td className={className[0] + ' centerBold'}>
                {player1Time}
            </td>
            <td className={className[1] + ' centerBold'}>
                {player2Time}
            </td>
            <td className={className[0] + ' centerBold'}>
                {timeDifference}
            </td>
        </tr>
    })

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th className='centerBold aasdf'>Track</th>
                        <th className='centerBold aasdf'>{props.player1}</th>
                        <th className='centerBold aasdf'>{props.player2}</th>
                        <th className='centerBold aasdf'>Difference</th>
                    </tr>
                    {tableJSX}
                </tbody>
            </table>
        </div>
    )
}

export default CompareTable;

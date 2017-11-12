import React, { Component } from 'react';
import axios from 'axios';
import CompareTable from './compare_table';

class Compare extends Component {
    constructor(props) {
        super(props)

        this.state = {
            player1: '',
            player1id: '',
            player2: '',
            player1id: '',
            levels: []
        }
    }
    fetchIds = async () => {
        const p1Promise = await axios.get(`https://www.speedrun.com/api/v1/users/${this.state.player1}`);
        this.setState({player1id: p1Promise.data.data.id});
        const p2Promise = await axios.get(`https://www.speedrun.com/api/v1/users/${this.state.player2}`);
        this.setState({player2id: p2Promise.data.data.id});
    }
    fetchLevels = async (e) => {
        e.preventDefault();
        this.fetchIds();
        const levelsPromise = await axios.get('https://www.speedrun.com/api/v1/games/9dow9e1p/levels');
        let levels = levelsPromise.data.data.map(lvl => {
            let mapData = {
            id: lvl.id,
            name: lvl.name,
            link: lvl.links[6]
            }
            return mapData;
        });

        var LBrequests = levels.map((level) => {
            return axios.get(level.link.uri);
        });
        // console.log(requests);
        var levelPromises = await Promise.all(LBrequests);
        for (var i = 0; i < levels.length; i++) {
            levels[i].runs = levelPromises[i];
        }
        // console.log(levels);
        // console.log(levels);
        this.setState({levels: levels})
    }

    render() {
        return (
            <div>
                <form className="asdf">
                    <input
                        value={this.state.player1}
                        onChange={e => this.setState({player1: e.target.value})} />
                    <input
                        value={this.state.player2}
                        onChange={e => this.setState({player2: e.target.value})} />
                    <button onClick={this.fetchLevels}>Compare times</button>
                </form>
                <div className="asdf compareTable">
                    <CompareTable
                        player1={this.state.player1}
                        player2={this.state.player2}
                        player1id={this.state.player1id}
                        player2id={this.state.player2id}
                        levels={this.state.levels} />
                </div>
            </div>
        )
    }
}

export default Compare;

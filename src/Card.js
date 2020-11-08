import React, { Component } from 'react';
class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const style = {
            width: "20%",
            margin: "10px",
            fontSize: "30px"
        }
        return (
            <td style={style} className={this.props.trick.is_owned ? "owned" : (this.props.trick.is_chosen ? "chosen" : "nochosen")} onClick={() => { this.props.toggleChosen(this.props.trick) }}>
                <div>
                    <h3>{this.props.trick.name} </h3>
                    <p className="small">Hype : +{this.props.trick.hype}</p>
                    <p className="small">Morale : +{this.props.trick.morale}</p>
                    <p className="small">Upkeep : -{this.props.trick.upkeep}</p>
                </div>
            </td>
        );
    }
}

export default Card;
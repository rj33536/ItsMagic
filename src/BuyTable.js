import React, { Component } from 'react';
import Card from "./Card"
class Table extends Component {
    constructor(props) {
        super(props);
        this.props = {

        }
    }
    render() {
        const style = {
            width: "60%",
            height: "150px",
            color: "black",
            margin: "0px auto",
            border: "white 5px solid",
            backgroundColor: "#418f84"
        }
        return (

            <div className={"tab-pane fade" + (this.props.position == "start" ? " active show" : "")} id={this.props.id} role="tabpanel" aria-labelledby="pills-contact-tab">
                <table className="tricktb" style={style}>
                    <tr style={style}>
                        {this.props.all_tricks
                            .filter((trick) => {
                                return trick.position == this.props.position;
                            }).slice(0, 3)
                            .map((trick) => {
                                return <Card toggleChosen={this.props.toggleChosen} trick={trick} />
                            })}
                    </tr>
                    <tr>
                        {this.props.all_tricks
                            .filter((trick) => {
                                return trick.position == this.props.position;
                            }).slice(3, 6)
                            .map((trick) => {
                                return <Card toggleChosen={this.props.toggleChosen} trick={trick} />
                            })}
                    </tr>
                </table>
            </div>

        );
    }
}

export default Table;
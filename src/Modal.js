import React, { Component } from 'react';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            all_tricks: this.props.all_tricks
        }
    }
    render() {
        const style={
            margin:"10px",
            height:"500px"
        }
        return (

            <div  className={"modal fade " + this.props.className} tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <table className="tricktb ">
                            <tr>
                                {this.state.all_tricks
                                    .filter((trick) => {
                                        return trick.position == this.props.position;
                                    }).slice(0, 3)
                                    .map((trick) => {
                                        return <td className={trick.is_owned ? "owned" : (trick.is_chosen ? "chosen" : "nochosen")} onClick={() => { this.props.choseTricks(trick) }}>{trick.name} </td>
                                    })}
                            </tr>
                            <tr>
                                {this.state.all_tricks
                                    .filter((trick) => {
                                        return trick.position == this.props.position;
                                    }).slice(3, 6)
                                    .map((trick) => {
                                        return <td className={trick.is_owned ? "owned" : (trick.is_chosen ? "chosen" : "nochosen")} onClick={() => { this.props.choseTricks(trick) }}>{trick.name} </td>
                                    })}
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;
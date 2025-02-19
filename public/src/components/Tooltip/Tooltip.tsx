import {ScReact} from "@veglem/screact";
import "./Tooltip.sass"
import {Img} from "../Image/Image";

export class Tooltip extends ScReact.Component<any, any> {
    render() {
        return (
            <div className={"tooltip-wrapper "  + (this.props.className ? this.props.className : "")} onclick={() => this.props.onClick && this.props.onClick()}>
                <Img src={this.props.icon} className="icon" />
                <div className={"tooltip-container"}>
                    <span>{this.props.label}</span>
                </div>
            </div>
        )
    }
}
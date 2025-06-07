import { Navigate } from "react-router-dom"
import '../styles/ServiceComponent.css'


function ServiceComponent({image, text, orientation, redirection}) {

    return (
        <div id="serviceComponent_container" onClick={Navigate(redirection)} style={{flexDirection: orientation}}>
            <div id="serviceComponent_div_img" >
                <img id="serviceComponent_img" src={image} alt="Service's Image from Unsplash"/>
            </div>
            <p id="serviceComponent_text"  style={{ textAlign: orientation === "row-reverse" ? "right" : "left" }}>{text}</p>
        </div>
    )
}

export default ServiceComponent;
import NavComponent from '../components/NavComponent'
import ServiceComponent from '../components/ServiceComponent'
import '../styles/AboutUsPage.css'
import icon1 from "../assets/ejercicio.png"
import icon2 from "../assets/responsabilidad.png"
import { useLanguage } from '../context/LanguageContext'
import ContactComponent from '../components/ContactComponent'

function AboutUsPage() {

    const {currentTexts} = useLanguage()

    return(
        <div id="aboutUsPage_container">
            <NavComponent text={currentTexts.navComponent.aboutUsPage}/>

            <div>
                <ServiceComponent image={icon1} text={currentTexts.aboutUsPage.subtitle1} orientation={"row"} redirection={""}/>
                {/*<a href="https://www.flaticon.es/iconos-gratis/fuerza" title="fuerza iconos">Fuerza iconos creados por Freepik - Flaticon</a>*/}
                <ServiceComponent image={icon2} text={currentTexts.aboutUsPage.subtitle2} orientation={"row-reverse"} redirection={""}/>
                {/*<a href="https://www.flaticon.es/iconos-gratis/responsabilidad" title="responsabilidad iconos">Responsabilidad iconos creados por surang - Flaticon</a>*/}
            </div>

            <ContactComponent/>
        </div>
    )
}
export default AboutUsPage
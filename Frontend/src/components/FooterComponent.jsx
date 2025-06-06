import '../styles/FooterComponent.css'
import map from '../assets/MapImage.png'
import facebook from '../assets/FacebookIcon.png'
import instagram from '../assets/InstagramIcon.png'
import linkedin from '../assets/LinkedInIcon.png'
import twitter from '../assets/XIcon.png'
import bluesky from '../assets/BlueSkyIcon.webp'
import { useLanguage } from '../context/LanguageContext'
import { useNavigate } from 'react-router-dom'

function FooterComponent() {
    
    const{ currentTexts } = useLanguage();
    const navigate = useNavigate();

    return (
        <div id='footer_footer'> {/*row*/}
            <ul id='footer_left_list'> {/*column*/}
                <li><b className='footer_title_text'>{currentTexts.footerComponent.servicesTitle}</b></li>
                <li><a className="footer_service" href="">{currentTexts.footerComponent.service1}</a></li>
                <li><a className="footer_service" href="">{currentTexts.footerComponent.service2}</a></li>
                <li><a className="footer_service" href="">{currentTexts.footerComponent.service3}</a></li>
                <li><a className="footer_service" href="">{currentTexts.footerComponent.service4}</a></li>
                <li><a className="footer_service" href="">{currentTexts.footerComponent.service5}</a></li>
                <li><a className="footer_service" href="">{currentTexts.footerComponent.service6}</a></li>
                <li><a className="footer_service" href="">{currentTexts.footerComponent.service7}</a></li>
                <li><a className="footer_service" href="">{currentTexts.footerComponent.service8}</a></li>
                <li><a className="footer_service" href="">{currentTexts.footerComponent.service9}</a></li>
                <li><a className="footer_service" href="">{currentTexts.footerComponent.service10}</a></li>
                <li><a className="footer_service" href="">{currentTexts.footerComponent.service11}</a></li>
                <li><a className="footer_service" href="">{currentTexts.footerComponent.service12}</a></li>
                <li><a className="footer_service" href="">{currentTexts.footerComponent.service13}</a></li>
                <li><a className="footer_service" href="">{currentTexts.footerComponent.service14}</a></li>
                <li><a className="footer_service" href="">{currentTexts.footerComponent.service15}</a></li>
                <li><a className="footer_service" href="">{currentTexts.footerComponent.service16}</a></li>
            </ul>
            <div id='footer_right_list'>{/*Column*/}
                <div id='footer_social_list'> {/*Column*/}
                    <b className='footer_title_text'>{currentTexts.footerComponent.socialMedia}</b>
                    <div id='footer_social_list_imgs'> {/*Row*/}
                        <div id='footer_facebook_background' onClick={() => window.open("https://www.facebook.com", "_blank")}>
                            <img id="footer_facebook_img" src={facebook} alt="Facebook's Icon" />
                        </div>
                        <div id='footer_instagram_background' onClick={() => window.open("https://www.instagram.com", "_blank")}>
                            <img id='footer_instagram_img' src={instagram} alt="Instagram's Icon" />
                        </div>
                        <div id='footer_linkedin_background' onClick={() => window.open("https://es.linkedin.com", "_blank")}>
                            <img id='footer_linkedin_img' src={linkedin} alt="LinkedIn's Icon" />
                        </div>
                        <div id='footer_twitter_background' onClick={() => window.open("https://x.com", "_blank")}>
                            <img id='footer_twitter_img' src={twitter} alt="X's Icon" />
                        </div>
                        <div id='footer_bluesky_background' onClick={() => window.open("https://bsky.app", "_blank")}>
                            <img id='footer_bluesky_img' src={bluesky} alt="BlueSky's Icon" />
                        </div>
                    </div>
                </div>
                <div id='footer_ubication_list'> {/*Column*/}
                    <b className='footer_title_text'>{currentTexts.footerComponent.mapText}</b>
                    <img id="footer_map_img" src={map} alt="Image from Google Maps" onClick={() => window.open("https://maps.app.goo.gl/pB6dJ52VivkAmaN89", "_blank")}/>
                </div>
            </div>
        </div>
    )
}

export default FooterComponent
import { Link } from "react-router-dom";
import HomeBanner from "../components/HomeBanner";
import HomeProductsDisplay from "../components/HomeProductsDisplay";

export default function HomePage() {
    return <>
        <HomeBanner />
        <div className="about-us-box">
            <div className="about-us-text-container">
                <h1>The Tavern is Online!</h1>
                <p>Whether you want to re-live your childhood memories or discover games from before your time,
                    the <b>RetroGaming Tavern</b> is the place for you. <br />
                    Since our opening in 2012 as a local retro game store in Toronto, we believed videogames are a form of art that
                    needs to be preserved. While looking through our inventory, you can be sure that every product avaliable has been
                    checked for quality and restored to the best of our abilities, in order to deliver you these amazing experiences as they
                    were intended.
                </p>
            </div>
            <div className="about-us-img-container">
                <img src="src\images\cool_img.png" alt="Mario, Sonic and Crash doing a cool pose" className="about-us-img" />
            </div>
        </div>
        <Link to="/shop" className="home-to-shop-link">
            <img src="src\images\backpack_icon.png" alt="backpack icon" className="backpack-icon"/>
            <p>Check out our inventory!</p>     
        </Link>
        <div>
            <HomeProductsDisplay />
        </div>
    </>
}

import { Link } from "react-router-dom";
import logo from '../images/logo.png'
import background from '../images/bg.png'
import './home.css';
import './homeResponsive.css';
const Home = () => {
    return (
        <div id="home">
            <nav>
                <img src={logo} alt="logo" />
                <Link to='/tasks'>Get Started&nbsp; &rarr;</Link>
            </nav>
            <section className="main">
                <span className="heading">Start, Make, Complete Tasks.</span>
                <span className="heading">With <span>Taskify.</span></span>
                <Link to='/tasks'>Get Started&nbsp; &rarr;</Link>
                <img src={background} alt="background" />
            </section>
        </div>
    )
}
export default Home;
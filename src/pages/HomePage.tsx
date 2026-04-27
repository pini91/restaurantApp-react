import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import '../styles/home.css'
import fruitsImg from '../assets/imgs/homePage/fruits.jpg'
import meatsImg from '../assets/imgs/homePage/meats.jpg'
import seaFoodImg from '../assets/imgs/homePage/sea-food.jpg'
import salads from '../assets/imgs/homePage/salads.jpg'
import wine from '../assets/imgs/homePage/wine.jpg'
import call from '../assets/imgs/homePage/call.jpg'


export default function HomePage() {
  return (
    <div>
      <main>
        <div>
          <div>
            <Navbar />
          </div>

          <section>
            <h1>Welcome To Our Cuisine Restaurant</h1>
            <button className="reservation">
              <Link to="/bookForm">
                <i className="fa-solid fa-calendar-days" /> Make a reservation
              </Link>
            </button>
            <div className="socialMedia">
              <i className="fa-brands fa-facebook" />
              <i className="fa-brands fa-twitter" />
              <i className="fa-brands fa-instagram" />
            </div>
          </section>
        </div>
      </main>

      <div id="discover">
        <div>
          <span>About us</span>
          <h1>Discover Our Restaurant Story</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo est
            qui aliquid voluptate possimus! Animi ducimus dignissimos nobis
            optio non quaerat, enim repudiandae quas! Delectus veniam quaerat
            error iste illo? Lorem, ipsum dolor sit amet consectetur adipisicing
            elit. <br />
            <br />
            Nemo est qui aliquid voluptate possimus! Animi ducimus dignissimos
            nobis optio non quaerat, enim repudiandae quas! Delectus veniam
            quaerat error iste illo?
          </p>
        </div>
      </div>

      <section id="speciality">
        <h1>Our Speciality Cuisine</h1>
        <ul>
          <li>
            <Link to="/breakfast">Breakfast</Link>
          </li>
          <li>
            <Link to="/lunch">Lunch</Link>
          </li>
          <li>
            <Link to="/dinner">Dinner</Link>
          </li>
        </ul>
        <div className="ulMeni">
          <section>
            <img src={fruitsImg} alt="fruits" />
            <br />
            <h3>Fruits</h3>
          </section>
          <section>
            <img src={salads} alt="salads" />
            <br />
            <h3>Salads</h3>
          </section>
          <section>
            <img src={meatsImg} alt="meat" />
            <br />
            <h3>Meats</h3>
          </section>
          <section>
            <img src={seaFoodImg} alt="salmon" />
            <br />
            <h3>Sea Food</h3>
          </section>
        </div>
      </section>

      <section id="wine">
        <div id="sips">
          <h2>Enjoy our variety of wine selection!</h2>
        </div>
        <div id="bottle">
          <img src={wine} alt="wine" />
        </div>
      </section>

      <section id="hours">
        <h1>Opening Hours</h1>
        <i className="fa-solid fa-phone" />
        <span>
          <Link to="tel:+12345678910">Call Now</Link>
        </span>
        <span>+12345 678 910</span>
        <div className="sate">
          <div>
            <section className="dias">Monday to Friday</section>
            <section className="horas">09:00am - 10:00pm</section>
          </div>
          <div>
            <section className="dias">Saturday to Sunday</section>
            <section className="horas">09:00am - 11:00pm</section>
          </div>
        </div>
        <div className="image-container">
          <img className="bottomImg" src={call} alt="Phone call" />
        </div>
      </section>

      <footer>©Restaurants | Website created by Brenda Loncaric</footer>
    </div>
  )
}

import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { MenuItem } from '../types'
import ImageModal from '../components/ImageModal'
import styles from '../styles/breakfast.module.css'
import zagrebacka from '../assets/imgs/dinner/zagrebacka.jpg'
import tomato from '../assets/imgs/dinner/tomato-soup.jpg'
import kSalmon from '../assets/imgs/dinner/king-salmon.jpg'
import oister from '../assets/imgs/dinner/oisters.jpg'
import pasta from '../assets/imgs/dinner/pasta.jpg'
import lobster from '../assets/imgs/dinner/lobster.jpg'
import hambuger from '../assets/imgs/dinner/hamburger.jpg'
import crab from '../assets/imgs/dinner/crab.jpg'
import fSalad from '../assets/imgs/dinner/fancy-salad.jpg'

const dinnerItems: MenuItem[] = [
  { id: 1, name: 'Schnitzel', imagePath: zagrebacka, ingredients: ['Pork', 'Carrots', 'Cabbage', 'Lemon Sauce'] },
  { id: 2, name: 'Tortelli Tomato Soup', imagePath: tomato, ingredients: ['Tortelli', 'Tomatoes', 'Basil'] },
  { id: 3, name: 'King Salmon', imagePath: kSalmon, ingredients: ['Salmon', 'Tomatoes', 'Arugula', 'Saffron'] },
  { id: 4, name: 'Oisters', imagePath: oister, ingredients: ['Oisters', 'Lemon', 'Red Sauce'] },
  { id: 5, name: 'Fettuccine', imagePath: pasta, ingredients: ['Fettuccine', 'Mushrooms', 'Cheese'] },
  { id: 6, name: 'Lobster', imagePath: lobster, ingredients: ['Lobster', 'Potatoes'] },
  { id: 7, name: 'Hamburger', imagePath: hambuger, ingredients: ['Beef Hamburger', 'Fries', 'Tomatoes', 'White Sauce'] },
  { id: 8, name: 'Grilled Crab', imagePath: crab, ingredients: ['Crab with vegetables', 'Fries', 'Lettuce Salad'] },
  { id: 9, name: 'Cucumber Salad', imagePath: fSalad, ingredients: ['Cucumber', 'Beans', 'Spinach', 'Riccola'] },
]

const columns = [
  dinnerItems.slice(0, 3),
  dinnerItems.slice(3, 6),
  dinnerItems.slice(6, 9),
]

export default function DinnerPage() {
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null)

  return (
    <>
    <div>
        {/* <button className={styles.menuButton}> */}
        <Link className={styles.home}to="/menu">HOME</Link>
        {/* </button> */}
      <h2 className={styles.title}>Dinner</h2>

      <div className={styles.row}>
        {columns.map((col, ci) => (
          <div className={styles.column} key={ci}>
            {col.map((item) => (
              <div key={item.id}>
                <img className={styles.imgs}
                  src={item.imagePath}
                  alt={item.name}
                  onClick={() => setActiveItem(item)}
                />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      <ImageModal item={activeItem} onClose={() => setActiveItem(null)} />
    </div>
    </>
  )
}

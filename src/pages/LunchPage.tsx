import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { MenuItem } from '../types'
import ImageModal from '../components/ImageModal'
import styles from '../styles/breakfast.module.css'
import porkLoin from '../assets/imgs/lunch/roasted-pig.jpg'
import beef from '../assets/imgs/lunch/beef.jpg'
import chicken from '../assets/imgs/lunch/sesame-chicken.jpg'
import spaget from '../assets/imgs/lunch/vegan-spaguete.jpg'
import salmon from '../assets/imgs/lunch/salmon.jpg'
import sSalad from '../assets/imgs/lunch/shrimp-salad.jpg'
import cChicken from '../assets/imgs/lunch/coconut-chicken.jpg'
import cesarSalad from '../assets/imgs/lunch/cesar-salad.jpg'
import riceBeans from '../assets/imgs/lunch/rice-beans.jpg'


const lunchItems: MenuItem[] = [
  { id: 1, name: 'Sesame Chicken', imagePath: chicken, ingredients: ['Chicken', 'Spinach', 'Carrots', 'Lemon', 'Cabbage', 'Tomatoes'] },
  { id: 2, name: 'Vegan Spaguete', imagePath: spaget, ingredients: ['Spaguete', 'Tomatoes', 'Spinach', 'Mozzarella'] },
  { id: 3, name: 'Grilled Salmon', imagePath: salmon, ingredients: ['Salmon', 'Avocado', 'Lemon', 'Lettuce', 'Tomatoes'] },
  { id: 4, name: 'Beef Tenderloin', imagePath: beef, ingredients: ['Beef', 'Tomatoes', 'Black Pepper Sauce', 'Asparagus'] },
  { id: 5, name: 'Pork Loin', imagePath:porkLoin, ingredients: ['Pork', 'Tomatoes', 'Asparagus'] },
  { id: 6, name: 'Coconut Chicken', imagePath: cChicken, ingredients: ['Chicken', 'Green Beans', 'Young Onions', 'Coconut'] },
  { id: 7, name: 'Shrimp Salad', imagePath: sSalad, ingredients: ['Shrimps', 'Spinach', 'Cucumber', 'Carrots'] },
  { id: 8, name: 'Cesar Salad', imagePath: cesarSalad, ingredients: ['Lettuce', 'Bell Peppers', 'Mozzarella', 'Tomatoes'] },
  { id: 9, name: 'Vegan Rice & Beans', imagePath: riceBeans, ingredients: ['Rice', 'Beans', 'Avocado', 'Cilantro'] },
]

const columns = [
  lunchItems.slice(0, 3),
  lunchItems.slice(3, 6),
  lunchItems.slice(6, 9),
]

export default function LunchPage() {
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null)

  return (
    <>
    <div>
      {/* <button className={styles.menuButton}> */}
        <Link to="/menu">HOME</Link>
      {/* </button> */}
      <h2 className={styles.title}>Lunch</h2>

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

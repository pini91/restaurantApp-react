import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { MenuItem } from '../types'
import ImageModal from '../components/ImageModal'
import styles from '../styles/breakfast.module.css'
import avocado from '../assets/imgs/breakfast/avocado-Toast.jpg'
import egg from '../assets/imgs/breakfast/egg.jpg'
import fruits from '../assets/imgs/breakfast/fruits300.jpg'
import veggies from '../assets/imgs/breakfast/greens.jpg'
import berries from '../assets/imgs/breakfast/berries.jpg'
import yogurt from '../assets/imgs/breakfast/yogurt.jpg'
import eggs from '../assets/imgs/breakfast/eggToast.jpg'
import croissant from '../assets/imgs/breakfast/croissant.jpg'
import mVeggies from '../assets/imgs/breakfast/cereal.jpg'

const breakfastItems: MenuItem[] = [
  { id: 1, name: 'Avocado Toast', imagePath: avocado, ingredients: ['Organic Avocado', 'Whole Bread'] },
  { id: 2, name: 'Eggs Benedict', imagePath: egg, ingredients: ['Eggs', 'Whole Bread', 'Lemon'] },
  { id: 3, name: 'Fruit Salad', imagePath: fruits, ingredients: ['Yogurt', 'Berries'] },
  { id: 4, name: 'Morning Veggies', imagePath: mVeggies, ingredients: ['Carrots', 'Tomatoes', 'Cucumber'] },
  { id: 5, name: 'Pancake Berries', imagePath: berries, ingredients: ['Pancakes', 'Blueberries', 'Blackberries'] },
  { id: 6, name: 'Yogurt', imagePath: yogurt, ingredients: ['Yogurt', 'Blueberries', 'Strawberries', 'Mint', 'Apple'] },
  { id: 7, name: 'Sunny Side Down Eggs', imagePath: eggs, ingredients: ['Cheese', 'Eggs', 'Toast'] },
  { id: 8, name: 'Avocado with Croissant', imagePath: croissant, ingredients: ['Avocado', 'Almonds', 'Croissant'] },
  { id: 9, name: 'Veggie Toast', imagePath: veggies, ingredients: ['Avocado', 'Spinach', 'Toast'] },
]


const columns = [
  breakfastItems.slice(0, 3),
  breakfastItems.slice(3, 6),
  breakfastItems.slice(6, 9),
]


export default function BreakfastPage() {
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null)

  return (
    <>
    <div>
      <Link to="/menu" className="homeButton">
          <i className="fa-solid fa-arrow-left" /> Back
      </Link>
      <h2 className={styles.title}>Breakfast</h2>

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

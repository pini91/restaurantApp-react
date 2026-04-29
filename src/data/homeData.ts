import fruitsImg  from '../assets/imgs/homePage/fruits.jpg'
import meatsImg   from '../assets/imgs/homePage/meats.jpg'
import seaFoodImg from '../assets/imgs/homePage/sea-food.jpg'
import saladsImg  from '../assets/imgs/homePage/salads.jpg'

/** Legacy 4-card grid (kept for other sections if needed) */
export const foodCards = [
  { img: fruitsImg,  label: 'Fruits'  },
  { img: saladsImg,  label: 'Salads'  },
  { img: meatsImg,   label: 'Meats'   },
  { img: seaFoodImg, label: 'Seafood' },
]

/** Three featured dishes for the hero dish section. featured=true gives the elevated card style. */
export const featuredDishes = [
  {
    img: saladsImg,
    title: 'Green Salad',
    description: 'Crisp seasonal leaves, cucumber ribbons, and a zesty herb vinaigrette.',
    featured: false,
  },
  {
    img: fruitsImg,
    title: 'Fruit Bowl',
    description: 'Seasonal fruits layered with honey-lime drizzle and mint.',
    featured: true,
  },
  {
    img: meatsImg,
    title: 'Grilled Special',
    description: 'Chargrilled lean cuts served with roasted garden vegetables.',
    featured: false,
  },
]

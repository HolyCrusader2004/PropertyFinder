import { motion } from 'framer-motion'
import classes from '../pages/RegisterProperty.module.css'
import { categories } from '../assets/data';

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
};

export default function FilterCategories({ selectedCategories, handleSelectCat, handleClick }) {
  return <>
    <div className={classes.container_homepage}>
      <h1>All Categories</h1>
      <motion.ul variants={listVariants} initial={'hidden'} whileInView={'visible'} className={classes.category_list_homepage}>
        {categories.map((category) => (
          <motion.li key={category.label} variants={itemVariants} className={selectedCategories.includes(category.label) ? classes.category_selected : classes.category} onClick={() => handleSelectCat(category.label)}>
            <div className={classes.category_icon}>
              {category.icon}
            </div>
            <p>{category.label}</p>
          </motion.li>
        ))}
      </motion.ul>
      <motion.button style={{ color: 'white', backgroundColor: 'black', marginTop: '50px', width: '100px' }} whileHover={{ scale: 1.05 }} onClick={handleClick}>Search</motion.button>
    </div>
  </>
}
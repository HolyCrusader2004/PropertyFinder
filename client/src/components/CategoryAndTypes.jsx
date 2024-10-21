
import { categories, types } from "../assets/data";
import classes from '../pages/RegisterProperty.module.css'
import { motion } from 'framer-motion'

export const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
};

export default function CategoryAndTypes({ selectedCategory, selectedType, handleSelectCat, handleSelectType }) {
  return <>
    <h3>Which of the following categories best describe your place?</h3>
    <motion.ul className={classes.category_list} variants={listVariants} initial='hidden' whileInView='visible' >
      {categories.map((category) => (
        <motion.li key={category.label} variants={itemVariants} className={selectedCategory === category.label ? classes.category_selected : classes.category} onClick={() => handleSelectCat(category.label)}>
          <div className={classes.category_icon}>
            {category.icon}
          </div>
          <p>{category.label}</p>
        </motion.li>
      ))}
    </motion.ul>
    <h3>Choose your property type</h3>
    <motion.ul className={classes.type_list} variants={listVariants} initial='hidden' whileInView='visible'>
      {types.map((type) => (
        <motion.li key={type.name} variants={itemVariants} className={selectedType === type.name ? classes.type_selected : classes.type} onClick={() => handleSelectType(type.name)}>
          <div className={classes.type_text}>
            <h4>{type.name}</h4>
            <p>{type.description}</p>
            <div className={classes.type_icon}>
              {type.icon}
            </div>
          </div>
        </motion.li>
      ))}
    </motion.ul>

  </>
}
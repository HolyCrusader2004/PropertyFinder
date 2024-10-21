import { categories } from "../assets/data"
import classes from './Filters.module.css'
import { motion } from 'framer-motion'

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
      duration: 0.5,
    },
  },
};

export default function Filters({ handleSelectCat }) {
  return (
    <div className={classes.container}>
      <h1>Top Categories</h1>
      <motion.ul variants={listVariants} initial='hidden' whileInView='visible' className={classes.list}>
        {categories.slice(1, 7).map((category) => (
          <motion.li key={category.label} variants={itemVariants} onClick={() => handleSelectCat(category.label)} style={{ cursor: 'pointer' }}>
            <motion.div className={classes.categoryItem} whileHover={{ scale: 1.05 }}>
              <motion.img src={category.img} alt={category.label} className={classes.backgroundImage} whileHover={{ scale: 1.05 }} />
              <div className={classes.icon}>{category.icon}</div>
              <p className={classes.label}>{category.label}</p>
            </motion.div>
          </motion.li>
        ))}
      </motion.ul>

    </div>
  );
}
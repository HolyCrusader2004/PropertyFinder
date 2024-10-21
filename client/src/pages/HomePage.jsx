import { useState } from "react";
import FilterCategories from "../components/FilterCategories";
import Filters from "../components/Filters";
import HeaderDecoration from "../components/HeaderDecoration";
import classes from '../components/HeaderDecoration.module.css'
import QueryProperties from "../components/QueryProperties";

export default function HomePage() {
    const [selectedCategories, setSelectedCategories] = useState(['All'])
    const [readySearch, setReadySearch] = useState(false)

    function handleSelectCat(category) {
        if (selectedCategories.includes(category)) {
            setSelectedCategories((prevState) => prevState.filter((object) => object !== category))
        } else {
            setSelectedCategories((prevState) => [...prevState, category])
        }
    }
    function handleClick() {
        setReadySearch(true)
    }

    return <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className={classes.container}>
            <HeaderDecoration />
            <div className={classes.content}>
                <article>
                    <p>Welcome to PropertyFinder, the best place to find your next booking location.</p>
                </article>
            </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', zIndex: 2 }}>
            <div style={{ display: 'flex', position: 'relative', zIndex: 3 }}>
                <Filters handleSelectCat={handleSelectCat} />
                <FilterCategories
                    selectedCategories={selectedCategories}
                    handleSelectCat={handleSelectCat}
                    handleClick={handleClick}
                />
            </div>
            <div style={{ display: 'flex', zIndex: 2, position: 'relative', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
                {readySearch && <QueryProperties queries={selectedCategories} />}
            </div>
        </div>

    </div>
}

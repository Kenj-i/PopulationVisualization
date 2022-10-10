import { useEffect, useState } from "react"

function Header({ setHeight }) {
    const [countries, setCountries] = useState(null)
    const [year, setYear] = useState(2018)
    const [firstCountry, setFirstCountry] = useState(null,)
    const [secondCountry, setSecondCountry] = useState(null)

    useEffect(() => {
        fetch('https://countriesnow.space/api/v0.1/countries/population')
            .then(response => response.json())
            .then(response => {
                setCountries(response)
            })
            .catch(err => console.error(err));
    }, [])

    const showOptions = () => {
        return countries.data.map(country =>
            <option key={country.code} value={country.country} />
        )
    }
    const getPopulation = (name) => {
        const countryIndex = countries.data.findIndex(country => country.country === name)
        const yearIndex = countries.data[1].populationCounts.findIndex(date => date.year == year)
        return countries.data[countryIndex].populationCounts[yearIndex].value
    }
    const setPopulation = (e) => {
        e.preventDefault()
        let firstPopulation
        let secondPopulation
        try {
            firstPopulation = getPopulation(firstCountry)
            secondPopulation = getPopulation(secondCountry)
        }
        catch (error) {
            console.log(error)
            return alert("Countries couldn't be found!")
        }

        if (firstPopulation >= secondPopulation) {
            secondPopulation = 5 * (secondPopulation / firstPopulation)
            firstPopulation = 5
        }
        if (secondPopulation > firstPopulation) {
            firstPopulation = 5 * (firstPopulation / secondPopulation)
            secondPopulation = 5
        }
        setHeight(firstPopulation, secondPopulation)
    }

    return (
        <header className="darkmode">
            <div className="content">
                <section className="left-content">
                    <form onSubmit={setPopulation}>
                        <div className="wrap-input">
                            <span className="countrySymbol first" />
                            <input required type="text" list="countries" placeholder="First Country..." onChange={e => setFirstCountry(e.target.value)} />
                        </div>
                        <div className="wrap-input">
                            <span className="countrySymbol second" />
                            <input required type="text" list="countries" placeholder="Second Country..." onChange={e => setSecondCountry(e.target.value)} />                            
                        </div>
                        <datalist id="countries">{countries && showOptions()}</datalist>
                        <button className="cbutton"><i className="bi bi-search" /></button>
                    </form>
                </section>
                <section className="middle-content">
                    <div style={{display: "flex"}}>
                        <h3>Year {year}:</h3>
                        <input id="year" type="range" min="1960" max="2018" onChange={e => setYear(e.target.value)} value={year} />
                    </div>
                    <button id="extend" className="cbutton extend-button"><i className="bi bi-arrow-bar-down"></i></button>
                </section>
                <section className="right-content">
                    <button id="darkmode" className="cbutton darkmode-button">
                        <i id="sun" className="symbol bi bi-sun"></i>
                        <i id="moon" className="symbol bi bi-moon active"></i>
                    </button>
                </section>
            </div>
        </header>
    )
}

export default Header
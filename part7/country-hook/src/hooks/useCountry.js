import { useState, useEffect } from "react"
import axios from "axios"

export const useCountry = name => {
  const [country, setCountry] = useState(null)

  console.log("name:", name)

  useEffect(() => {
    axios
      .get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
      .then(x => {
        console.log(x.data)
        setCountry({ found: true, data: x.data[0] })
      })
      .catch(x => setCountry({ found: false }))
  }, [name])

  return country
}

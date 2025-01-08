import { useEffect } from "react";
import { getPokeListService } from "./request/getPokemon";
import { useState } from "react";
const usePokeList = (num) => {
  const [pokeList, setList] = useState([])
  useEffect(() => {
    const getpokeList = async (num) => {
      const res = await getPokeListService(num)
      console.log("Response:", res);

      const res2 = res.map((item, index) => {
        return {
          name: item.name,
          url: `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${index + 1}.svg`

        }
      })


      setList(res2)



    }
    getpokeList(num)

  }, [num])

  return { pokeList }

}

export { usePokeList }
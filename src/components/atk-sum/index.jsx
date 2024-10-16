import { Attack } from '../atk-container/index'
import { ShowAtkSum } from '../show-atk-sum/index.jsx'
import { useState } from 'react'


const AttackSum = () => {
    const [atkList, setAtkList] = useState([])
    const salvarAtk = (atk) => {
        if (atkList.length > 1) {
            if (atk.arma == atkList[0].arma) {
                atkList.shift(atkList[0])

            } else if (atk.arma == atkList[1].arma) {
                atkList.pop(atkList[0])
            }
        } else if (atkList.length > 0 && atk.arma == atkList[0].arma) {
            atkList.shift(atkList[0])

        }
        let newAtkList = [...atkList]
        newAtkList.push(atk)
        setAtkList(newAtkList)

    }

    return (
        <>  
            <h1>Ataque Mumitpo</h1>
            < Attack id='arma-1' onAddAtk={salvarAtk} />
            < Attack id='arma-2' onAddAtk={salvarAtk} />
            < ShowAtkSum list={atkList} />
            {
                <div>
                    <p>D = Dano</p>
                    <p>AC = Acerto</p>
                    <p>AP = Ataque poderoso -2AC +5D</p>
                    <p>AE = Ataque especial 1PM +4AC/D a cada 4 níveis </p>
                </div>
            }
        </>
    )
}

export { AttackSum }
import './atk-container.css'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AddNewInput } from '../add-new-inputs/index.jsx'

let attackObject = {}

const Attack = ({ id, onAddAtk }) => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [input, setInputs] = useState({
        new_value_ac: [],
        new_value_d: []
    })
    const [newInput, setNewInput] = useState([])

    const maxValue = (e) => {
        if (e.target.value.length > 2) {
            e.target.value = e.target.value.slice(0, 1) + e.target.value.slice(2, 3)
        }
    }

    const maxValueAE = (e) => {
        if (e.target.value.length > 2) {
            e.target.value = e.target.value.slice(0, 1) + e.target.value.slice(2, 3)
        }
        if (e.target.name == `${id}-ae-d`) {
            setInputs({
                ...input,
                new_value_d: e.target.value
            })
        } else if (e.target.name == `${id}-ae-ac`) {
            setInputs({
                ...input,
                new_value_ac: e.target.value

            })
        }
    }

    const handleAEInputs = (e) => {
        const divInputs = document.querySelector(`.${id}-ae-inputs`)
        const aeAcerto = document.getElementById(`${id}-ae-ac`)
        const aeDano = document.getElementById(`${id}-ae-d`)

        let mpCost = e.target.value

        if (mpCost == 0) {
            divInputs.classList.add('hidden')
            aeDano.value = 0
            aeAcerto.value = 0

        } else if (mpCost > 0) {
            const numeroAcerto = Number(aeAcerto.value)
            const numeroDano = Number(aeDano.value)
            const compareNumbers = (nb) => {
                if (numeroAcerto >= numeroDano && numeroDano < nb) {
                    aeAcerto.value = nb - numeroDano

                } else if (numeroDano >= numeroAcerto && numeroAcerto < nb) {
                    aeDano.value = nb - numeroAcerto

                } else if (aeDano.value == 0 && numeroAcerto > 0) {
                    aeDano.value = nb - numeroAcerto

                } else if (aeAcerto.value == 0 && numeroDano > 0) {
                    aeAcerto.value = nb - numeroDano

                } else {
                    aeAcerto.value = nb / 2
                    aeDano.value = nb / 2
                }


                setInputs({
                    new_value_ac: aeAcerto.value,
                    new_value_d: aeDano.value
                })
            }

            if (divInputs.classList.contains('hidden')) {
                divInputs.classList.remove('hidden')
            }

            if (mpCost == 1) {
                compareNumbers(4)

            } else if (mpCost == 2) {
                compareNumbers(8)

            } else if (mpCost == 3) {
                compareNumbers(12)

            }

        }
    }

    const calcularTotal = (total) => {
        let danoTotal = 0
        let acertoTotal = 0
        let custoMana = 0
        let arma = ''
        for (const key in total) {
            let element = total[key];
            if (key == `${id}-ae-ac`) {
                element = input.new_value_ac
                acertoTotal = acertoTotal + Number(input.new_value_ac)

            } else if (key == `${id}-ae-d`) {
                element = input.new_value_d
                danoTotal = danoTotal + Number(input.new_value_d)

            } else if (key == `${id}-ap` && element !== false) {
                danoTotal = danoTotal + 5
                acertoTotal = acertoTotal - 2

            } else if (key == `${id}-d`) {
                danoTotal = danoTotal + Number(element)

            } else if (key == `${id}-ac`) {
                acertoTotal = acertoTotal + Number(element)

            } else if (key == `${id}-ae`) {
                custoMana = custoMana + Number(element)
            } else if (key == `${id}`) {
                arma = element
            } else if (key.slice(-1) == 'd') {
                danoTotal = danoTotal + Number(element)

            } else if (key.slice(-1) == 'c') {
                acertoTotal = acertoTotal + Number(element)

            }


        }

        attackObject = {
            'arma': arma,
            'acerto': acertoTotal,
            'dano': danoTotal,
            'pm': custoMana
        }

        onAddAtk(attackObject)
    }

    const addInputs = (data) => {
        for (const key in data) {

            let element = data[key]
            if (element !== '') {

                let newInputList = [...newInput]
                newInputList.push(element)
                setNewInput(newInputList)
            }
        }
    }

    const titleAndPlace = (id) => {
        return id.slice(-1)
    }

    return (
        <div className='weap-container'>
            <form className='weap' onSubmit={handleSubmit(calcularTotal)}>
                <div className='weap-base'>
                    <div className='arma-name'>

                        <label htmlFor={id}>{`Arma ${titleAndPlace(id)}:`} </label>
                        <input type='text' name={id} id={id} className='input-name'
                            {
                            ...register(`${id}`, {
                                required: true
                            }
                            )}

                        />
                    </div>

                    <div className='d-ac'>

                        <div className='input-short ba'>
                            <label htmlFor={`${id}-ac`}>AC </label>
                            <input type="number" name={`${id}-ac`} id={`${id}-ac`} className='input-ac number'
                                {
                                ...register(`${id}-ac`, {
                                    onChange: (e) => {
                                        maxValue(e)
                                    }
                                })
                                }
                            />
                        </div>
                        <div className='input-short ba'>
                            <label htmlFor={`${id}-d`}>D </label>
                            <input type="number" name={`${id}-d`} id={`${id}-d`} className='input-d number'
                                {
                                ...register(`${id}-d`, {
                                    onChange: (e) => {
                                        maxValue(e)
                                    }
                                })
                                }
                            />
                        </div>
                    </div>
                    <div className='input-ap'>
                        <label htmlFor={`${id}-ap`} >AP</label>
                        <input type='checkbox' name={`${id}-ap`} id={`${id}-ap`} value='2-5' {
                            ...register(`${id}-ap`)
                        } />
                        <span className="checkmark"></span>
                    </div>
                </div>

                <div className='ae-container input-short'>
                    <p>Ataque Especial</p>

                    <div className={`ae-inputs-container ${id}-ae-inputs`}>

                        <div className='input-short ba'>
                            <label htmlFor={`${id}-ae-ac`}>AC </label>
                            <input type="number" name={`${id}-ae-ac`} id={`${id}-ae-ac`} className='input-ae-ac number'
                                {
                                ...register(`${id}-ae-ac`, {
                                    onChange: (e) => {
                                        maxValueAE(e)
                                    }
                                })
                                }
                            />
                        </div>

                        <div className='input-short ba'>
                            <label htmlFor={`${id}-ae-d`}>D </label>
                            <input type="number" name={`${id}-ae-d`} id={`${id}-ae-d`} className='input-ae-d number'
                                {
                                ...register(`${id}-ae-d`, {
                                    onChange: (e) => {
                                        maxValueAE(e)
                                    }
                                })
                                }
                            />
                        </div>
                    </div>

                    <div className='radios-ae input-short' >
                        <div className='input-radios'>
                            <div className='radio-ba'>
                                <input type="radio" id={`${id}-ae-1`} name={`${id}-ae`} value="0"
                                    {
                                    ...register(`${id}-ae`, {
                                        onChange: (e) => {
                                            handleAEInputs(e)
                                        }
                                    })
                                    }
                                />
                                <label htmlFor={`${id}-ae-1`} >0 PM</label>

                            </div>
                            <div className='radio-ba'>
                                <input {...register(`${id}-ae`)} type="radio" id={`${id}-ae-2`} name={`${id}-ae`} value="1" />
                                <label htmlFor={`${id}-ae-2`} >1 PM</label>

                            </div>
                            <div className='radio-ba'>
                                <input {...register(`${id}-ae`)} type="radio" id={`${id}-ae-3`} name={`${id}-ae`} value="2" />
                                <label htmlFor={`${id}-ae-3`} >2 PM</label>

                            </div>
                            <div className='radio-ba'>
                                <input {...register(`${id}-ae`)} type="radio" id={`${id}-ae-4`} name={`${id}-ae`} value="3" />
                                <label htmlFor={`${id}-ae-4`} >3 PM</label>

                            </div>
                        </div>
                    </div>


                </div>

                <div className='new-field'>
                    {
                        newInput.map((inputKey, i) => {
                            const lowerKey = inputKey.toLowerCase()
                            return (
                                <div className='new-container' key={i}>
                                    <p>{`${inputKey}:`}</p>

                                    <div className='input-short ba'>

                                        <label htmlFor={`${id}-${lowerKey}-ac`}>AC </label>
                                        <input type="number" name={`${id}-${lowerKey}-ac`} id={`${id}-${lowerKey}-ac`} className='input-ac number'
                                            {
                                            ...register(`${id}-${lowerKey}-ac`, {
                                                onChange: (e) => {
                                                    maxValue(e)
                                                }
                                            })
                                            }
                                        />
                                    </div>

                                    <div className='input-short ba'>
                                        <label htmlFor={`${id}-${lowerKey}-d`}>D </label>
                                        <input type="number" name={`${id}-${lowerKey}-d`} id={`${id}-${lowerKey}-d`} className='input-d number'
                                            {
                                            ...register(`${id}-${lowerKey}-d`, {
                                                onChange: (e) => {
                                                    maxValue(e)
                                                }
                                            })
                                            }
                                        />
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>

                <button type='submit'>CALCULAR</button>

            </form>

            <AddNewInput id={id} onAddInput={addInputs} />

        </div>
    )
}

export { Attack }
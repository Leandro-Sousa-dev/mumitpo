import { useForm } from 'react-hook-form'

const AddNewInput = ({ id, onAddInput }) => {
    const { register, handleSubmit } = useForm()

    const maxValue = (e) => {
        if (e.target.value.length > 2) {
            e.target.value = e.target.value.slice(0, 1) + e.target.value.slice(2, 3)
        }
    }

    const handleData = (data) => {
        console.log(data)
        for (const key in data) {
            const element = data[key];

            let dataObj = {
                'data': element
            }
            onAddInput(dataObj)
        }
    }

    return (
        <form onSubmit={handleSubmit(handleData)}>
            <div className='add-buff-container'>
                <div>
                    <label htmlFor={`${id}-new`}>Add Buff: </label>
                    <input type='text' name={`${id}-new`} id={`${id}-new`} className='input-new-name' placeholder='Ex.: NB'
                        {
                        ...register(`${id}-new`, {
                            onChange: (e) => {
                                e.target.value = e.target.value.toUpperCase()
                                maxValue(e)
                            },
                            required: true
                        })
                        }

                    />

                </div>
                <button className='add-buff' type='submit'>Adicionar</button>
            </div>

        </form>
    )
}

export { AddNewInput }
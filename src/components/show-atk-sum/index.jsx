const ShowAtkSum = ({ list }) => {
    return (
        <div className="show-atk-container">
            {list.map((atkObj, i) => {
                return (
                    <div className="show-atk" key={i}>
                        <p>Arma: {atkObj.arma}</p>
                        <p>Acerto: {atkObj.acerto}</p>
                        <p>Dano: {atkObj.dano}</p>
                        <p>PM: {atkObj.pm}</p>
                    </div>
                )
            })}
        </div>
    )
}
export { ShowAtkSum }
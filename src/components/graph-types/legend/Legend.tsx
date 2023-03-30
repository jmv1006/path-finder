import './legend.css'

const Legend = () => {
    return(
       <div className='legendContainer'>
            <div className='legendItem'>
                Start
                <div className="spaceStart" />
            </div>
            <div className='legendItem'>
                End: 
                <div className="spaceEnd" />
            </div>
            <div className='legendItem'>
                Wall:
                <div className="spaceBlocked" />
            </div>
       </div>
    )
}

export default Legend
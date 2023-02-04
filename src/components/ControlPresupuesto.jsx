import {useState, useEffect} from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({gastos, setGastos, presupuesto, setPresupuesto, setisValidPresupuesto}) => {

    const [porcetaje, setPorcentaje] = useState(0)
    const [disponible, setDisponible] = useState(presupuesto)
    const [gastado, setGastado] = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidad + total, 0)   
        const totalDisponible = presupuesto - totalGastado
        
        // Calcular porcentaje gastado
        const nuevoPorcentaje = (( (presupuesto - totalDisponible) / presupuesto ) * 100).toFixed(2)

        
        setGastado(totalGastado)
        setDisponible(totalDisponible)
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 1000);
    }, [gastos])
    
    const formatearCantidad = cantidad => {
        
        return cantidad.toLocaleString('es-CO', {style: 'currency', currency:'COP'})

        // Para eliminar los 3 caracteres antes
        // const almacenarStringCantidad = cantidad.toLocaleString('es-CO', {style: 'currency', currency:'COP'})

        // return almacenarStringCantidad.substring(0, almacenarStringCantidad.length - 3)
    }

    const handleResetApp = () => {
        const resultado = confirm('¿Deseas Reiniciar Presupuesto y Gastos?')
        if(resultado){
            setisValidPresupuesto(false)
            setGastos([])
            setPresupuesto(0)
        }
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar
            styles={buildStyles({
                pathColor: porcetaje > 100 ? '#DC2626' : '#3B82F6',
                trailColor: '#F5F5F5',
                textColor: porcetaje > 100 ? '#DC2626' : '#3B82F6'
            })}
                value={porcetaje}
                text={`${porcetaje}% Gastado`}
            />
        </div>

        <div className='contenido-presupuesto'>
            <button className='reset-app' type='button' onClick={handleResetApp}>
                Resetear App
            </button>
            <p>
                <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
            </p>
            <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                <span>Disponible: </span>{formatearCantidad(disponible)}
            </p>
            <p>
                <span>Gastado: </span>{formatearCantidad(gastado)}
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto
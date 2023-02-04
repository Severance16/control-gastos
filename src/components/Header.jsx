import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'

const Header = ({
    gastos,
    setGastos,
    presupuesto,
    setPresupuesto, 
    isValidPresupuesto, 
    setisValidPresupuesto
}) => {
  return (
    <header>
        <h1>Planificador de Gastos</h1>

        {
            isValidPresupuesto ? 
            (
                <ControlPresupuesto 
                    gastos={gastos}
                    setGastos={setGastos}
                    presupuesto={presupuesto}
                    setPresupuesto={setPresupuesto}
                    setisValidPresupuesto={setisValidPresupuesto}
                />
            ):(
                <NuevoPresupuesto
                    presupuesto={presupuesto}
                    setPresupuesto={setPresupuesto}
                    setisValidPresupuesto={setisValidPresupuesto}
                />
            )
        }

        
    </header>
  )
}

export default Header
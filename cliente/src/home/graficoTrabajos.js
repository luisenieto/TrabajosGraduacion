import React, { useContext } from 'react';
import { ProviderContext } from '../provider';
import {ResponsivePie} from '@nivo/pie';

//Componente que muestra el gráfico con los totales de trabajos según las áreas
const GraficoTrabajos = () => {    
    const { trabajos, totalesTrabajos } = useContext(ProviderContext);
//    const [datosTrabajos, setearDatosTrabajos] = useState([]);

//    useEffect(() => {
//        setearDatosTrabajos(obtenerTotales(trabajos));
//    }, []); //eslint-disable-line react-hooks/exhaustive-deps  
    //el comentario anterior es para que en la consola no aparezca el warning diciendo que el array de depdencias de useEffect está vacío        

    //se encarga de mostrar en el centro del círculo el total de trabajos
    const totalTrabajos = ({ centerX, centerY }) => {       
        return (
            <text
                x = {centerX}
                y = {centerY}
                textAnchor = "middle"
                dominantBaseline = "central"
                style = {{
                    fontSize : '32px',
                    fontWeight : 600,
                }}
            >
                {trabajos.length}
            </text>
        )
    }

    console.log(trabajos);
    return (
        <>
            {                
                totalesTrabajos.length > 0 ? 
                    <ResponsivePie
                        data = {totalesTrabajos}
                        margin = {{ top: 40, right: 80, bottom: 80, left: 80 }}
                        innerRadius = {0.5}
                        padAngle = {0}
                        sortByValue = {true}
                        activeOuterRadiusOffset = {8}
                        colors = {{ scheme: 'category10' }}
                        borderColor = {{
                            from : 'color',
                            modifiers : [
                                [
                                    'darker',
                                    '0.4'
                                ]
                            ]
                        }}
                        arcLinkLabelsSkipAngle = {10}
                        arcLinkLabelsTextColor = "#000000"
                        arcLinkLabelsThickness = {2}
                        arcLinkLabelsColor = {{ from : 'color' }}
                        arcLabelsSkipAngle = {10}
                        arcLabelsTextColor = {{
                            from : 'color',
                            modifiers : [
                                [
                                    'darker',
                                    2
                                ]
                            ]
                        }}                                                
                        legends = {[
                            {
                                anchor : 'bottom',
                                direction : 'row',
                                justify : false,
                                translateX : 0,
                                translateY : 56,
                                itemsSpacing : 0,
                                itemWidth : 55,
                                itemHeight : 18,
                                itemTextColor : '#000',
                                itemDirection : 'left-to-right',
                                itemOpacity : 1,
                                symbolSize : 18,
                                symbolShape : 'circle',
                                effects : [
                                    {
                                        on : 'hover',
                                        style : {
                                            itemTextColor : '#000'
                                        }
                                    }
                                ]
                            }
                        ]}
                        layers = {['arcs', 'arcLabels', 'arcLinkLabels', 'legends', totalTrabajos]}
                    />
                : 
                    null
            }
        </>
    )    
}

export default GraficoTrabajos;
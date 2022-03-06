import React, { useContext } from 'react';
import { ProviderContext } from '../provider';
import {ResponsivePie} from '@nivo/pie';

//Componente que muestra el gráfico con los totales de trabajos según las áreas
const GraficoTrabajos = () => {    
    const { cantidadTrabajosParaGrafico, totalesTrabajos } = useContext(ProviderContext);

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
                {cantidadTrabajosParaGrafico}
            </text>
        )
    }
    
    return (
        <>
            {                
                totalesTrabajos.length > 0 ? 
                    <div style = {{height: 500}}>
                        <ResponsivePie
                            data = {totalesTrabajos}
                            margin = {{ top: 20, right: 80, bottom: 80, left: 100 }}
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
                            arcLinkLabelsDiagonalLength = {5}
                            arcLinkLabelsStraightLength = {10}
                            arcLinkLabelsTextOffset = {3}
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
                                    translateY : 60,
                                    itemsSpacing : 0,
                                    itemWidth : 48,
                                    itemHeight : 18,
                                    itemTextColor : '#000',
                                    itemDirection : 'top-to-bottom',
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
                    </div>
                : 
                    null
            }
        </>
    )    
}

export default GraficoTrabajos;
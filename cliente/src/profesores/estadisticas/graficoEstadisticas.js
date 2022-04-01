import React from 'react';
import {ResponsiveBar} from '@nivo/bar';

const GraficoEstadisticas = ({datos, claves}) => {    
    return (
        <ResponsiveBar 
            data = {datos}
            keys = {claves}
            indexBy = "anio"
            groupMode = 'grouped'
            layout = 'vertical'
            layers = {['grid', 'axes', 'bars', 'markers', 'legends']}
            margin={{top: 50, right: 130, bottom: 50, left: 60}}
            padding = {0.2}
            //colors={{scheme: 'nivo'}}
            colors = {({id, data}) => data[`${id}Color`]}
            axisBottom = {{
                tickSize : 5,
                tickPadding : 5,
                tickRotation : 0,
                legend : 'Año',
                legendPosition : 'middle',
                legendOffset : 32
            }}
            axisLeft = {{
                tickSize : 5,
                tickPadding : 5,
                tickRotation : 0,
                legend : 'Trabajos',
                legendPosition : 'middle',
                legendOffset : -40
            }}
            labelTextColor = '#ffffff'
            legends = {[
                {
                    dataFrom : 'keys',
                    anchor : 'bottom-right',
                    direction : 'column',
                    justify : false,
                    translateX : 120,
                    translateY : 0,
                    itemsSpacing : 1,
                    itemWidth : 100,
                    itemHeight : 15,
                    itemDirection : 'right-to-left',
                    itemOpacity : 0.85,
                    symbolSize : 20,
                    effects : [
                        {
                            on : 'hover',
                            style : {
                                itemOpacity : 1,
                            }
                        }
                    ]
                }
            ]}            
        />
    )
}

export default GraficoEstadisticas;
import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { toNumericString } from '../../../../../../services'

const BalanceCard = (props) => {
    return ( 
      <Card style={{ height: 65 }}>
          <CardContent>
            <div style={{ fontWeight:400, fontSize: "1.1rem", lineHeight: "1.4rem"}}>{props.title}</div>
            <div style={{ fontWeight:400, fontSize: ".8rem", lineHeight: "1.4rem", color:"rgba(0, 0, 0, 0.54)"}}>
                $ { toNumericString(props.balance) }
            </div>
          </CardContent>
      </Card>
    );
}
export default BalanceCard
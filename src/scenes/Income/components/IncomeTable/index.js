import React, { Component } from 'react'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';


class IncomeTable extends Component {

  render() {
    return(
        <Table>
            <TableHead>
            <TableRow>
                <TableCell>Source</TableCell>
                <TableCell numeric>Amount</TableCell>
                <TableCell numeric>Frequence per year</TableCell>
                <TableCell>Delete</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {this.props.data.map(n => {
                return (
                <TableRow key={n.id}>
                    <TableCell>{n.name}</TableCell>
                    <TableCell numeric>{n.amount}</TableCell>
                    <TableCell numeric>{n.frequency}</TableCell>
                    {/* add delete icon */}
                </TableRow>
                );
            })}
            </TableBody>
        </Table>
    )
  }
}

export default IncomeTable

import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';


// core components
import styles from "assets/jss/nextjs-material-dashboard/components/tableStyle.js";

export default function CustomTable(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor } = props;


  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };

  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {
                      prop.type !== 'none' ? (
                        <TableSortLabel
                          active={props.orderBy === prop.id}
                          direction={props.orderBy === prop.id ? props.order : 'asc'}
                          onClick={createSortHandler(prop.id)}
                        >
                          {prop.label}
                        </TableSortLabel>
                      ) : (
                        prop.label
                      )
                    }
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.slice(props.page * props.rowsPerPage, ((props.page + 1) * props.rowsPerPage)).map((prop, key) => {
            return (
              <TableRow key={key} className={classes.tableBodyRow}>
                {prop.map((prop, key) => {
                  return (
                    <TableCell className={classes.tableCell} key={key}>
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {
        props.page !== null && (
          <TablePagination
            count={tableData.length}
            page={props.page}
            rowsPerPage={props.rowsPerPage}
            rowsPerPageOptions={[10, 50]}
            onChangePage={props.onChangePage}
            onChangeRowsPerPage={props.onChangeRowsPerPage}
          />
        )
      }
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray",
  page: null,
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.object),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)),
};

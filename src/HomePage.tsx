import React, { useEffect, useState } from "react";
import { useMSGraph } from "./graph";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Header from "./Header";
import moment from "moment";
import { formatBytes } from "./Utils";
import { SignOutButton } from "./Components/SignOutButton";

interface Column {
  id: "name" | "modified" | "lastModifiedDateTime" | "size" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "modified", label: "Modified By", minWidth: 100 },
  {
    id: "lastModifiedDateTime",
    label: "Modified Date",
    minWidth: 170,
    align: "right",
    // format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Size",
    minWidth: 170,
    align: "right",
    // format: (value: number) => value.toLocaleString("en-US"),
  },
  //   {
  //     id: "action",
  //     label: "Action",
  //     minWidth: 170,
  //     align: "right",
  //     // format: (value: number) => value.toFixed(2),
  //   },
];

interface Data {
  name: string;
  modified: string;
  lastModifiedDateTime: string;
  size: string;
  action: string;
}

function HomePage(props: any) {
  // debugger;
  const { token } = props;
  const { getFiles, uploadFile, deleteFile, updateFileName } =
    useMSGraph(token);
  const [rows, setFiles]: any = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [fileDetails, setFileDetails] = useState({ name: "", id: "" });
  const handleClickOpen = (row: any) => {
    console.log(row, "roowwwww");
    setFileDetails({ name: row.name, id: row.id });
    // setFileDetails({ ...fileDetails, id: row.id });
    setOpen(true);
  };

  const updateName = () => {
    updateFileName(fileDetails.id, fileDetails.name);
    console.log(fileDetails, "fie nanmemee");
    setOpen(false);
  };
  const handleClose = () => {
    // console.log(fileName, "fie nanmemee");
    setOpen(false);
  };
  useEffect(() => {
    console.log(token, " *** tokennnn***");
    getFIlesFromDrive();
  }, []);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getFIlesFromDrive = () => {
    getFiles().then((response) => setFiles(response.value));
  };
  const onFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e, "event file");
    if (e.target.files) {
      const file = e.target.files[0];
      uploadFile(file).then((response) => getFIlesFromDrive());
    }
  };

  const deletFileFromDrive = (itemId: string) => {
    deleteFile(itemId).then((response) => getFIlesFromDrive());
  };

  const handleTextName = (e: any) => {
    console.log(e.target.value, " e.target.value");
    setFileDetails({ ...fileDetails, name: e.target.value });
  };
  return (
    <div>
      <SignOutButton />
      <button onClick={getFIlesFromDrive}>Get Files</button>
      <input type="file" onChange={onFileUpload}></input>
      <Header />
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.modified}
                      // <Link to={row.webUrl}>
                    >
                      {columns.map((column) => {
                        let value =
                          column.id == "size"
                            ? formatBytes(row[column.id])
                            : row[column.id];

                        if (column.id == "modified") {
                          value = row.lastModifiedBy.user.displayName;
                        }
                        if (column.id == "lastModifiedDateTime") {
                          value = moment(row.lastModifiedDateTime).format(
                            "DD/MM/YYYY"
                          );
                        }

                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            onClick={() => window.open(row.webUrl, "_blank")}
                          >
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                      <TableCell align="right">
                        {/* <Button
                          aria-label="edit"
                          onClick={() => handleEdit(row)}
                        >
                          Edit
                        </Button> */}
                        <EditIcon onClick={() => handleClickOpen(row)} />
                      </TableCell>
                      <TableCell>
                        <DeleteIcon
                          onClick={() => deletFileFromDrive(row.id)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText> */}
          <TextField
            value={fileDetails.name}
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => handleTextName(event)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateName}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default HomePage;

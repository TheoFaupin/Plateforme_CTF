import React, { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css'
import axios from "axios";

const AdminTab = (props) => {
  const { chall } = props;
  const [edit, setEdit] = useState('');

  const deleteForm = async () => {
    await axios({
      method: "delete",
      url: "http://localhost:3000/api/chall/delete/" + chall._id,
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
    })
      .then((response) => {
        console.log("Deleted!");
      })
      .catch((err) => {
        console.log("Deletion Failed!")
      });
    window.location.reload(false);
  };

  const handleSend = (event) => {
    if (event.key === 'Enter') {
      editForm();
    }
  }

  const editForm = async () => {
    var new_edit = "{" + edit + "}";
    await axios({
      method: "patch",
      url: "http://localhost:3000/api/chall/update/" + chall._id,
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
      body: {
        new_edit
      }
    })
      .then((response) => {
        console.log(response)
        console.log("Changed!");
      })
      .catch((err) => {
        console.log("Change Failed!")
      });
  };

  return (
    <tr>
      <td>
        {chall.name}
      </td>
      <td>{chall.points}</td>
      <td>{chall.userValidated.length}</td>
      <td>
        <i className="fas fa-edit" onClick={editForm} />
        <i className="ml-3 fas fa-trash-alt" onClick={deleteForm} />
      </td>
      <td>
        <div className="field has-addons">
          <div className="control">
            <input className="input is-small" type="text" onKeyDown={handleSend} onChange={event => setEdit(event.target.value)} placeholder="Edit" required />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default AdminTab;

import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [formData, setFormData] = useState({
    uname: "",
    uemail: "",
    uphone: "",
    umessage: "",
    index: null
  });

  const [userData, setUserData] = useState([]);

  // input handler
  const getValue = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // submit / update handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔴 Duplicate check (except same index while updating)
    const isDuplicate = userData.some(
      (item, i) =>
        i !== formData.index &&
        (item.uemail === formData.uemail || item.uname === formData.uname)
    );

    if (isDuplicate) {
      toast.error("This entry already exists!");
      return;
    }

    // 🟢 UPDATE MODE
    if (formData.index !== null) {
      const updatedData = [...userData];
      updatedData[formData.index] = {
        uname: formData.uname,
        uemail: formData.uemail,
        uphone: formData.uphone,
        umessage: formData.umessage
      };

      setUserData(updatedData);
      toast.success("Updation is complete!");
    }
    // 🟢 SAVE MODE
    else {
      setUserData([...userData, {
        uname: formData.uname,
        uemail: formData.uemail,
        uphone: formData.uphone,
        umessage: formData.umessage
      }]);
      toast.success("Data saved successfully!");
    }

    // reset form
    setFormData({
      uname: "",
      uemail: "",
      uphone: "",
      umessage: "",
      index: null
    });
  };

  // delete handler
  const deleteData = (index) => {
    const filteredData = userData.filter((_, i) => i !== index);
    setUserData(filteredData);
    toast.success("Data deleted");
  };

  // edit handler
  const editData = (item, index) => {
    setFormData({
      uname: item.uname,
      uemail: item.uemail,
      uphone: item.uphone,
      umessage: item.umessage,
      index: index
    });
  };

  return (
    <Container fluid>
      <ToastContainer />
      <Container>
        <Row>
          <Col className="text-center py-3">
            <h1>Enquiry Data</h1>
            <h4>Total Entries: {userData.length}</h4>
          </Col>
        </Row>

        <Row>
          {/* FORM */}
          <Col lg={5}>
            <form onSubmit={handleSubmit}>
              <div className="pb-3">
                <label>Username</label>
                <input
                  type="text"
                  name="uname"
                  value={formData.uname}
                  onChange={getValue}
                  className="form-control"
                  required
                />
              </div>

              <div className="pb-3">
                <label>Email</label>
                <input
                  type="email"
                  name="uemail"
                  value={formData.uemail}
                  onChange={getValue}
                  className="form-control"
                  required
                />
              </div>

              <div className="pb-3">
                <label>Phone</label>
                <input
                  type="text"
                  name="uphone"
                  value={formData.uphone}
                  onChange={getValue}
                  className="form-control"
                  required
                />
              </div>

              <div className="pb-3">
                <label>Message</label>
                <textarea
                  name="umessage"
                  value={formData.umessage}
                  onChange={getValue}
                  className="form-control"
                  rows="3"
                ></textarea>
              </div>

              <button className="btn btn-primary w-100">
                {formData.index !== null ? "Update" : "Save"}
              </button>
            </form>
          </Col>

          {/* DATA TABLE */}
          <Col lg={7}>
            {userData.length === 0 ? (
              <h4>User Data not found</h4>
            ) : (
              <Table bordered hover size="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Message</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.uname}</td>
                      <td>{item.uemail}</td>
                      <td>{item.uphone}</td>
                      <td>{item.umessage}</td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => editData(item, index)}
                        >
                          Update
                        </Button>

                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => deleteData(index)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default App;

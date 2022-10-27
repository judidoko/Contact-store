import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ContactService } from "../../../Services/ContactService";
import Spinner from "../../spinner/Spinner";

const EditContact = () => {
  let navigate = useNavigate();
  let { contactId } = useParams();

  const [state, setState] = useState({
    loading: false,
    contact: {
      name: "",
      photo: "",
      mobile: "",
      email: "",
      company: "",
      title: "",
      groupId: "",
    },
    groups: [],
    errorMessage: "",
  });

  useEffect(() => {
    (async () => {
      try {
        setState({ ...state, loading: true });
        let response = await ContactService.getContact(contactId);
        let groupResponse = await ContactService.getGroups();
        setState({
          ...state,
          loading: false,
          contact: response.data,
          groups: groupResponse.data,
        });
      } catch (error) {
        setState({
          ...state,
          loading: false,
          errorMessage: error.message,
        });
      }
    })();
  }, [contactId]);

  let updateInput = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value,
      },
    });
  };

  let submitForm = async (event) => {
    event.preventDefault();
    try {
      let response = await ContactService.updateContact(
        state.contact,
        contactId
      );
      if (response) {
        navigate("/contacts/list", { replace: true });
      }
    } catch (error) {
      setState({ ...state, errorMessage: error.error.message });
      navigate(`/contacts/edit/${contactId}`, { replace: false });
    }
  };

  let { loading, contact, groups } = state;

  return (
    <>
      <section className="add-contact p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <h4 className="text-primary fw-bold">Edit Contact</h4>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Officiis, exercitationem impedit totam illo praesentium nemo
                porro eos vitae sed id illum culpa ea animi laudantium expedita
                explicabo ducimus! Tempora, repudiandae?
              </p>
            </div>
          </div>

          {loading ? (
            <Spinner />
          ) : (
            <>
              <div className="row align-items-center">
                <div className="col-md-4">
                  <form onSubmit={submitForm}>
                    <div className="mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={contact.name}
                        name="name"
                        onChange={updateInput}
                        required={true}
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Photo Url"
                        value={contact.photo}
                        name="photo"
                        onChange={updateInput}
                        required={true}
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Number"
                        value={contact.mobile}
                        name="mobile"
                        onChange={updateInput}
                        required={true}
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={contact.email}
                        name="email"
                        onChange={updateInput}
                        required={true}
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Company"
                        value={contact.company}
                        name="company"
                        onChange={updateInput}
                        required={true}
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Title"
                        value={contact.title}
                        name="title"
                        onChange={updateInput}
                        required={true}
                      />
                    </div>
                    <div className="mb-2">
                      <select
                        className="form-control"
                        value={contact.groupId}
                        name="groupId"
                        onChange={updateInput}
                        required={true}
                      >
                        <option value="">Select a Group</option>
                        {groups.length > 0 &&
                          groups.map((group, index) => {
                            return (
                              <option item={group} key={index} value={group.id}>
                                {group.name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className="mb-2">
                      <input
                        type="submit"
                        className="btn btn-primary"
                        value="Update"
                      />
                      <Link to={"/contacts/list"} className="btn btn-dark ms-2">
                        Cancel
                      </Link>
                    </div>
                  </form>
                </div>
                <div className="col-md-6">
                  <img src={contact.photo} alt="" />
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default EditContact;

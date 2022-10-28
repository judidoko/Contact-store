import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContactService } from "../../../Services/ContactService";
import Spinner from "../../spinner/Spinner";

const AddContact = () => {
  let navigate = useNavigate();

  let [state, setState] = useState({
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
    errorMessage: "error.message",
  });

  let updateInput = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value,
      },
    });
  };

  useEffect(() => {
    (async () => {
      try {
        setState({ ...state, loading: true });
        const response = await ContactService.getGroups();
        setState({
          ...state,
          loading: false,
          groups: response.data,
        });
      } catch (error) {}
    })();

    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const SubmitForm = async (event) => {
    event.preventDefault();
    try {
      let response = await ContactService.createContact(state.contact);
      if (response) {
        navigate("/contacts/list", { replace: true });
      }
    } catch (error) {
      setState({ ...state, errorMessage: error.error.message });
      navigate("/contacts/add", { replace: false });
    }
  };

  let { loading, contact, groups } = state;

  return (
    <>
      <section className="add-contact p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <h4 className="text-success fw-bold">Create Contact</h4>
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
              <div className="row">
                <div className="col-md-4">
                  <form onSubmit={SubmitForm}>
                    <div className="mb-2">
                      <input
                        name="name"
                        value={contact.name}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        required={true}
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="photo"
                        value={contact.photo}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        placeholder="Photo Url"
                        required={true}
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="mobile"
                        value={contact.mobile}
                        onChange={updateInput}
                        type="number"
                        className="form-control"
                        placeholder="Number"
                        required={true}
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="email"
                        value={contact.email}
                        onChange={updateInput}
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        required={true}
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="company"
                        value={contact.company}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        placeholder="Company"
                        required={true}
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="title"
                        value={contact.title}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        placeholder="Title"
                        required={true}
                      />
                    </div>
                    <div className="mb-2">
                      <select
                        className="form-control"
                        name="groupId"
                        value={contact.groupId}
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
                        className="btn btn-success"
                        value="Create"
                      />
                      <Link to={"/contacts/list"} className="btn btn-dark ms-2">
                        Cancel
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default AddContact;

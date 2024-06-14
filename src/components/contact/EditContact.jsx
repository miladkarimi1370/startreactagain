import React, { useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getContact, updateContact } from "../../services/contactService";
import Spinner from "../Spinner";
import { COMMENT, ORANGE, PURPLE } from "../../helpers/colors";
import { ContactContext } from "../../context/contactContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { contactSchema } from "../../validations/contactValidation";
import { useImmer } from "use-immer";
import { toast } from "react-toastify";

const EditContact = () => {
    const { setContacts, loading, setLoading, groups, setFilteredContacts } = useContext(ContactContext);
    const { contactId } = useParams();
    const navigate = useNavigate();
    const [contact, setContact] = useImmer({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data: contactData } = await getContact(contactId);
                setLoading(false);
                setContact(contactData);
            } catch (err) {
                console.log(err.message);
                setLoading(false);
            }
        }
        fetchData();
    }, [])



    const submitForm = async (values) => {

        try {
            setLoading(true);
            const { data, status } = await updateContact(values, contactId);

            if (status === 200) {
                toast.info("مخاطب با موفقیت ویرایش شد")
                setLoading(false);

                setContacts((draft) => {
                    const contactIndex = draft.findIndex((c) => {
                        return c.id === parseInt(contactId);
                    });
                    draft[contactIndex] = { ...data };
                })

                setFilteredContacts((draft) => {
                    const contactIndex = draft.findIndex((c) => {
                        return c.id === parseInt(contactId);
                    });
                    draft[contactIndex] = { ...data };
                })
                navigate("/contacts");
            }
        } catch (err) {
            console.log(err.message);
            setLoading(false);
        }
    }



    return (
        <>
            {loading ? <Spinner /> :
                (

                    <>
                        <section className="p-3">
                            <div className="container">
                                <div className="row my-2">
                                    <div className="col text-center">
                                        <p className="h4 fw-bold" style={{ color: ORANGE }}>
                                            ویرایش مخاطب
                                        </p>
                                    </div>
                                </div>
                                <hr style={{ backgroundColor: ORANGE }} />
                                <div className="row p-2 w-75 mx-auto align-items-center" style={{ backgroundColor: "#44475a", borderRadius: "1rem" }}>
                                    <div className="col-md-8">
                                        <Formik
                                            initialValues={contact}
                                            validationSchema={contactSchema}
                                            onSubmit={(values) => {

                                                submitForm(values)
                                            }}
                                        >


                                            <Form>
                                                <div className="mb-2">
                                                    <Field
                                                        type="text"
                                                        className="form-control"

                                                        placeholder="نام و نام خانوادگی"
                                                        name="fullName"


                                                    />
                                                    <ErrorMessage name="fullName" render={(msg) => <span className="text-danger">{msg}</span>} />
                                                </div>
                                                <div className="mb-2">
                                                    <Field
                                                        type="text"


                                                        className="form-control"
                                                        placeholder="آدرس تصویر"
                                                        name="photo"


                                                    />
                                                    <ErrorMessage name="photo" render={(msg) => <span className="text-danger">{msg}</span>} />
                                                </div>
                                                <div className="mb-2">
                                                    <Field
                                                        type="text"


                                                        className="form-control"
                                                        placeholder="شماره تماس"
                                                        name="phoneNumber"


                                                    />
                                                    <ErrorMessage name="phoneNumber" render={(msg) => <span className="text-danger">{msg}</span>} />
                                                </div>
                                                <div className="mb-2">
                                                    <Field
                                                        type="text"



                                                        className="form-control"
                                                        placeholder="شغل"

                                                        name="job"

                                                    />
                                                    <ErrorMessage name="job" render={(msg) => <span className="text-danger">{msg}</span>} />
                                                </div>
                                                <div className="mb-2">
                                                    <Field
                                                        type="email"


                                                        className="form-control"

                                                        name="email"
                                                        placeholder="آدرس  اینترنتی"

                                                    />
                                                    <ErrorMessage name="email" render={(msg) => <span className="text-danger">{msg}</span>} />
                                                </div>

                                                <div className="mb-2">
                                                    <Field name="group" className="form-control" as="select" >

                                                        <option value={""}>انتخاب گروه</option>
                                                        {
                                                            groups.length > 0 && groups.map((group) => (
                                                                <option key={group.id} value={group.id}>{group.name}</option>
                                                            ))
                                                        }
                                                    </Field>
                                                    <ErrorMessage name="group" render={(msg) => <span className="text-danger">{msg}</span>} />
                                                </div>
                                                <div className="mx-2">
                                                    <input

                                                        type="submit"
                                                        className="btn mb-2"
                                                        style={{ backgroundColor: PURPLE }}
                                                        value={"ویرایش مخاطب"}
                                                    />
                                                </div>
                                                <Link to={"/contacts"} className="btn mx-2" style={{ backgroundColor: COMMENT }}>انصراف</Link>
                                            </Form>

                                        </Formik>

                                    </div>
                                    <div className="col-md-4">
                                        <img src={contact.photo} alt={contact.fullName} className="img-fluid rounded" style={{ border: `1px solid ${PURPLE}` }} />

                                    </div>
                                </div>
                            </div>
                            <div className="text-center mt-1">
                                <img src={require("../../assets/25817383_6972652.png")} alt="" height={"300px"} style={{ opacity: 60 + "%" }} />

                            </div>
                        </section>


                    </>
                )
            }
        </>
    )
}

export default EditContact;
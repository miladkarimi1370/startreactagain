import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";
import { COMMENT, GREEN, PURPLE } from "../../helpers/colors";
import Picture from "../../assets/25817383_6972652.png";
import { ContactContext } from "../../context/contactContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { contactSchema } from "../../validations/contactValidation";


const AddContact = () => {
    const { loading, groups, createContact } = useContext(ContactContext);





    return (
        <>
            {loading ? <Spinner /> :
                <section className="p-3">
                    <img src={Picture} height={400 + "px"} style={{ position: "absolute", zIndex: -1, top: 130 + "px", left: 100 + "px", opacity: 50 + "%" }} alt="" />
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <p className="h4 fw-bold text-center" style={{ color: GREEN }}>
                                    ساخت مخاطب جدید
                                </p>
                            </div>
                        </div>
                        <hr style={{ backgroundColor: GREEN }} />
                        <div className="row mt-5">
                            <div className="col-md-4">
                                <Formik
                                    initialValues={{
                                        fullName: "",
                                        photo: "",
                                        phoneNumber: "",
                                        job: "",
                                        group: "",
                                        email: "",
                                    }}
                                    validationSchema={contactSchema}
                                    onSubmit={(values) => {

                                        createContact(values)
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
                                                className="btn"
                                                style={{ backgroundColor: PURPLE }}
                                                value={"ساخت مخاطب"}
                                            />
                                        </div>
                                        <Link to={"/contacts"} className="btn mx-2" style={{ backgroundColor: COMMENT }}>انصراف</Link>
                                    </Form>

                                </Formik>

                            </div>
                        </div>
                    </div>
                </section >
            }
        </>

    )
}

export default AddContact;
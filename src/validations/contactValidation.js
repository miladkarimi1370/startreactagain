import * as yup from "yup";


export const contactSchema = yup.object().shape({
    fullName: yup.string().required("نام و نام خانوادگی الزامی می باشد "),
    photo: yup.string().url("آدرس معتبر نیست").required("اعمال کردن تصویر مخاطب الزامی می باشد"),
    phoneNumber: yup.number("شماره تماس باید از اعداد باشد ").required("وارد کردن شماره تلفن الزامی است"),
    job: yup.string().nullable(),
    email: yup.string().email("ایمیل معتبر نیست").required("وارد کردن ایمیل الزامی است"),
    group: yup.string().required("یکی از گروه های موجود را انتخاب کنید")
})
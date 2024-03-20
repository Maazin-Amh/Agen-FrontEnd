"use client";

import { useFormik, Form, FormikProvider, getIn } from "formik";

import * as yup from "yup";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Button from "@/components/Button";
import useAuthModule from "@/app/auth/lib";
import Image from "next/image";

export const registerSchema = yup.object().shape({
  nama: yup
    .string()
    .nullable()
    .default("")

    .required("Wajib isi"),
  avatar: yup.string().nullable().default("").required("Wajib isi"),
});

const UpdateProfile = () => {
  const { useProfile, useUpdateProfile } = useAuthModule();
  const { mutate } = useUpdateProfile();
  const { data } = useProfile();
  console.log(data);
  const formik = useFormik<any>({
    initialValues: {
      nama: data?.data.nama,
      avatar: data?.data.avatar,
      file: undefined,
      id: data?.data.id,
    },
    validationSchema: registerSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      mutate(values)
    },
  });

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    setFieldValue,
  } = formik;

  return (
    <section>
      <div className="flex items-center justify-center w-full">
        <h1 className="text-3xl text-blue-400">Update Profile</h1>
      </div>
      <div>
        <Image
          className="rounded-full"
          src={values.avatar || "/avatar.jpg"}
          alt="img"
          width={50}
          height={50}
        />
      </div>
      <FormikProvider value={formik}>
        <Form className="space-y-5" onSubmit={handleSubmit}>
          <section>
            <Label htmlFor="nama" title="Nama" />
            <InputText
              value={values.nama}
              placeholder="ihsan "
              id="nama"
              name="nama"
              onChange={handleChange}
              onBlur={handleBlur}
              isError={getIn(errors, "nama")}
              messageError={getIn(errors, "nama")}
            />
          </section>
          <section className="w-full">
            <input
              type="file"
              id="file"
              onChange={(event: any) => {
                const file = event.target.files[0];

                // if (file.type !== "image/jpeg") {
                //   return alert("type tidak sesauai");
                // }

                let reader = new FileReader();
                reader.onloadend = () => {
                  setFieldValue("avatar", reader.result);
                };
                reader.readAsDataURL(file);
                setFieldValue("file", file);

                console.log(file);
              }}
            />
          </section>
          <section>
            <Button height="lg" title="Update" colorSchema="blue" />
          </section>
        </Form>
      </FormikProvider>
    </section>
  );
};

export default UpdateProfile;

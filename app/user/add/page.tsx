"use client";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Select from "@/components/Select";
import { useFormik, Form, FormikProvider } from "formik";
import * as yup from "yup";
import { UserCreatePayload } from "../interface";
import Link from "next/link";
import { ArrowLongLeftIcon } from "@heroicons/react/20/solid";

const userCreateSchema = yup.object().shape({
  nama: yup.string().nullable().default("").required(),
  email: yup.string().nullable().default("").required(),
  umur: yup.number().nullable().default(undefined).required(),
  tanggal_lahir: yup.string().nullable().default("").required(),
  status: yup.string().nullable().default("").required(),
});

const option = [
  {
    value: 15,
    label: "15",
  },
  {
    value: 16,
    label: "16",
  },
  {
    value: 17,
    label: "17",
  },
  {
    value: 18,
    label: "18",
  },
  {
    value: 19,
    label: "19",
  },
  {
    value: 20,
    label: "20",
  },
];

const CreateUser = () => {
  const formik = useFormik<UserCreatePayload>({
    initialValues: userCreateSchema.getDefault(),
    validationSchema: userCreateSchema,
    enableReinitialize: true,
    onSubmit: () => {
      console.log("ok");
    },
  });

  const {
    handleChange,
    handleSubmit,
    setFieldValue,
    handleBlur,
    values,
    errors,
    resetForm,
    setValues,
  } = formik;

  return (
    <section className="flex items-center  justify-center w-full h-full">
      <section className="w-1/2">
        <Link href={"/user"}>
          <span className="flex items-center">
            {" "}
            <ArrowLongLeftIcon className="h-5 w-5 mr-2" />
            Kembali
          </span>
        </Link>
        <h2 className="text-xl font-bold text-gray-500">Tambah User</h2>
        {/* value : {JSON.stringify(values)} */}
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit} className="space-y-5">
            <section>
              <Label htmlFor="nama" title="nama" />
              <InputText
                onChange={handleChange}
                value={values.nama}
                placeholder="nama"
                id="nama"
                name="nama"
                isError={!!errors.nama}
                messageError={errors.nama}
              />
            </section>
            <section>
              <Label htmlFor="email" title="email" />
              <InputText
                onChange={handleChange}
                value={values.email}
                placeholder="email adress"
                id="email"
                name="email"
                isError={!!errors.email}
                messageError={errors.email}
              />
            </section>
            <section>
              <Label htmlFor="umur" title="umur" />
              <Select
                value={values.umur}
                id="umur"
                name="umur"
                options={option}
                isError={!!errors.umur}
                messageError={errors.umur}
                onChange={handleChange}
              />
            </section>
            <section>
              <Label htmlFor="tanggal_lahir" title="tanggal lahir" />
              <InputText
                onChange={handleChange}
                value={values.tanggal_lahir}
                placeholder="tanggal lahir"
                id="tanggal_lahir"
                name="tanggal_lahir"
                isError={!!errors.tanggal_lahir}
                messageError={errors.tanggal_lahir}
              />
            </section>
            <section>
              <Label htmlFor="status" title="status" />
              <InputText
                onChange={handleChange}
                value={values.status}
                placeholder="status"
                id="status"
                name="status"
                isError={!!errors.status}
                messageError={errors.status}
              />
            </section>
            <section>
              <Button height="md" title="Simpan" colorSchema="dark" />
            </section>
          </Form>
        </FormikProvider>
      </section>
    </section>
  );
};

export default CreateUser;

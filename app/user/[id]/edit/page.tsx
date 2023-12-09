"use client";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Select from "@/components/Select";
import { useFormik, Form, FormikProvider } from "formik";
import * as yup from "yup";
import useUserModule from "../../lib";
import Link from "next/link";
import { option } from "../../add/page";
import { userCreateSchema } from "../../add/page";
import { UserUpdatePayload } from "../../interface";

const UpdateUser = ({ params }: { params: { id: string } }) => {
  const { useDetailUser, useUpdateUser } = useUserModule();
  const { mutate, isLoading } = useUpdateUser(+params.id);
  const { data, isFetching } = useDetailUser(params.id);
  const formik = useFormik<UserUpdatePayload>({
    initialValues: {
      nama: data?.nama || "",
      email: data?.email || "",
      umur: data?.umur || "",
      tanggal_lahir: data?.tanggal_lahir || "",
      status: data?.status || "",
      id: data?.id || 0,
    },
    validationSchema: userCreateSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: () => {
          window.location.href = "/user";
        },
      });
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

  if (isFetching) {
    return (
      <>
        <div className="bg-white/20 backdrop-blur-xl flex-col w-full h-screen flex justify-center items-center">
          <picture>
            <img src="/loading.png" alt="" className="w-72 h-72" />
          </picture>
          <span className="font-bold text-xl">Tunggu dulu ya....</span>
        </div>
      </>
    );
  }
  return (
    <section className="flex items-center absolute justify-center w-full h-full">
      <section className="w-1/3">
        {/* <Link href={"/user"}>
          <span className="flex items-center">
            {" "}
            <ArrowLongLeftIcon className="h-5 w-5 mr-2" />
            Kembali
          </span>
        </Link> */}
        <h2 className="text-xl font-bold text-gray-500">Update User</h2>
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit} className="space-y-5">
            <section>
              <Label htmlFor="nama" title="nama" />
              <InputText
                onChange={handleChange}
                // onChange={(e) => {
                //   setFieldValue("nama", e.target.value);
                //   if (e.target.value === "ariiq") {
                //     setFieldValue("nama", e.target.value);
                //   }
                // }}
                onBlur={handleBlur}
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
                onBlur={handleBlur}
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
                onBlur={handleBlur}
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
                onBlur={handleBlur}
                value={values.tanggal_lahir}
                placeholder="tanggal lahir"
                id="tanggal_lahir"
                type="date"
                name="tanggal_lahir"
                isError={!!errors.tanggal_lahir}
                messageError={errors.tanggal_lahir}
              />
            </section>
            <section>
              <Label htmlFor="status" title="status" />
              <InputText
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.status}
                placeholder="status"
                id="status"
                name="status"
                isError={!!errors.status}
                messageError={errors.status}
              />
            </section>
            <section className="flex gap-3 flex-col">
              <Button
                width="lg1"
                title="Update"
                isLoading={isLoading}
                isDisabled={isLoading}
                colorSchema="dark"
              />
              <Link href={"/user"}>
                <Button
                  width="lg1"
                  type="button"
                  title="Cancel"
                  colorSchema="red"
                />
              </Link>
            </section>
          </Form>
        </FormikProvider>
      </section>
    </section>
  );
};

export default UpdateUser;

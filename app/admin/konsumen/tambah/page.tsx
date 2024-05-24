"use client";
import {
  useFormik,
  Form,
  FormikProvider,
  FieldArray,
  ArrayHelpers,
  getIn,
} from "formik";
import * as yup from "yup";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Link from "next/link";
import useKategoriModule from "../lib";

import useKonsumenModule from "../lib";
import { KonsumenCreatePayload } from "../interface";

export const KosnumenCreateSchema = yup.object().shape({
  nama_konsumen: yup.string().nullable().default("").required("isi ini"),
  alamat_konsumen: yup.string().nullable().default("").required("isi ini"),
  email: yup.string().nullable().email().default("").required("isi ini"),
  nomor_handphone: yup.string().nullable().default("").required("isi ini"),
});

export default function CreateKategori() {
  const { useCreateKonsumen } = useKonsumenModule();
  const { mutate, isLoading } = useCreateKonsumen();
  const formik = useFormik<KonsumenCreatePayload>({
    initialValues: KosnumenCreateSchema.getDefault(),
    validationSchema: KosnumenCreateSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: () => {
          window.location.href = "/admin/konsumen";
        },
      });
    },
  });

  const { handleChange, handleSubmit, handleBlur, values, errors } = formik;

  return (
    <section className="flex items-center absolute justify-center w-full h-full">
      <section className="w-1/3">
        <h2 className="text-xl font-bold text-gray-500">Create Konsumen</h2>
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit} className="space-y-5">
            <section>
              <Label htmlFor="nama_konsumen" title="nama Konsumen" />
              <InputText
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.nama_konsumen}
                placeholder="nama"
                id="nama_konsumen"
                name="nama_konsumen"
                isError={!!errors.nama_konsumen}
                messageError={errors.nama_konsumen}
              />
            </section>
            <section>
              <Label htmlFor="alamat_konsumen" title="alamat konsumen" />
              <InputText
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.alamat_konsumen}
                placeholder="alamat"
                id="alamat_konsumen"
                name="alamat_konsumen"
                isError={!!errors.alamat_konsumen}
                messageError={errors.alamat_konsumen}
              />
            </section>
            <section>
              <Label htmlFor="email" title="email" />
              <InputText
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="nama"
                id="email"
                name="email"
                isError={!!errors.email}
                messageError={errors.email}
              />
            </section>
            <section>
              <Label htmlFor="nomor_handphone" title="nomor handphone" />
              <InputText
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.nomor_handphone}
                placeholder="nama"
                id="nomor_handphone"
                name="nomor_handphone"
                isError={!!errors.nomor_handphone}
                messageError={errors.nomor_handphone}
              />
            </section>

            <section className="flex gap-3 flex-col">
              <Button
                width="lg1"
                title="Create"
                isLoading={isLoading}
                isDisabled={isLoading}
                colorSchema="dark"
              />
            </section>
          </Form>
        </FormikProvider>
      </section>
    </section>
  );
}

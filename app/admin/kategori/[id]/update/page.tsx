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
import useKategoriModule from "../../lib";
import { KategoriUpdatePayload } from "../../interface";

export const KategoriCreateSchema = yup.object().shape({
  nama_kategori: yup.string().nullable().required("isi ini"),
});

export default function UpdateKategori({ params }: { params: { id: string } }) {
  const { useDetailKategori, useUpdateKategori } = useKategoriModule();
  const { mutate, isLoading } = useUpdateKategori(+params.id);
  const { data, isFetching } = useDetailKategori(params.id);
  const formik = useFormik<KategoriUpdatePayload>({
    initialValues: {
      nama_kategori: data?.nama_kategori || "",
      id: data?.id || 0,
    },
    validationSchema: KategoriCreateSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: () => {
          window.location.href = "/admin/kategori";
        },
      });
    },
  });

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
  } = formik;

  return (
    <section className="flex items-center absolute justify-center w-full h-full">
      <section className="w-1/3">
        <h2 className="text-xl font-bold text-gray-500">Update Kategori</h2>
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit} className="space-y-5">
            <section>
              <Label htmlFor="nama_kategori" title="nama Kategori" />
              <InputText
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.nama_kategori}
                placeholder="nama"
                id="nama_kategori"
                name="nama_kategori"
                isError={!!errors.nama_kategori}
                messageError={errors.nama_kategori}
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
              <Link href={"/admin/kategori"}>
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
}

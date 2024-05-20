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
import { DeleteButton } from "@/components/ButtonAction";
import CurencyInput from "react-currency-input-field";
import clsx from "clsx";
import Select from "@/components/Select";
import useOptions from "@/hook/useOption";
import CurrencyInputs from "@/components/CurencyInput";
import useProdukModule from "../../lib";
import { ProdukUpdatePayload } from "../../interface";

export const ProdukCreateSchema = yup.object().shape({
  nama_produk: yup.string().nullable().required("isi ini"),
  deskripsi_produk: yup.string().nullable().required("isi ini"),
  harga: yup.number().nullable().required("isi ini"),
  stok: yup.number().nullable().required("isi ini"),
  kategori_id: yup.number().nullable().required("isi ini"),
});

export default function UpdateProduk({ params }: { params: { id: string } }) {
  const { useDetailProduk, useUpdateProduk } = useProdukModule();
  const { mutate, isLoading } = useUpdateProduk(+params.id);
  const { data, isFetching } = useDetailProduk(params.id);
  const formik = useFormik<ProdukUpdatePayload>({
    initialValues: {
      nama_produk: data?.nama_produk || "",
      harga: data?.harga || null,
      deskripsi_produk: data?.deskripsi_produk || "",
      stok: data?.stok || null,
      kategori_id: data?.kategori_id || null,
      id: data?.id || 0,
    },
    validationSchema: ProdukCreateSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: () => {
          window.location.href = "/admin/produk";
        },
      });
    },
  });

  const { optionKategori } = useOptions();

  console.log(optionKategori);

  const {
    handleChange,
    handleSubmit,
    setFieldValue,
    handleBlur,
    values,
    errors,
    resetForm,
    setValues,
    touched,
  } = formik;

  return (
    <section className="flex items-center absolute justify-center w-full h-full">
      <section className="w-1/3">
        <h2 className="text-xl font-bold text-gray-500">Update User</h2>
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit} className="space-y-5">
            <section>
              <Label htmlFor="nama_produk" title="nama produk" />
              <InputText
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.nama_produk}
                placeholder="nama"
                id="nama_produk"
                name="nama_produk"
                isError={!!errors.nama_produk}
                messageError={errors.nama_produk}
              />
            </section>
            <section>
              <Label htmlFor="deskripsi_produk" title="deskripsi produk" />
              <InputText
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.deskripsi_produk}
                placeholder="email adress"
                id="deskripsi_produk"
                name="deskripsi_produk"
                isError={!!errors.deskripsi_produk}
                messageError={errors.deskripsi_produk}
              />
            </section>
            <section>
              <Label htmlFor="harga" title="harga" />
              <CurrencyInputs
                id="harga"
                name="harga"
                value={values.harga || 0}
                perfix="Rp. "
                onValueChange={handleChange}
                error={!!errors.harga}
                messageError={errors.harga}
              />
            </section>
            <section>
              <Label htmlFor="stok" title="stok" />
              <CurrencyInputs
                id="stok"
                name="stok"
                value={values.stok || 0}
                onValueChange={handleChange}
                error={!!errors.stok}
                messageError={errors.stok}
              />
            </section>
            <section>
              <Label htmlFor="kategori_id" title="Kategori" />
              <Select
                value={values.kategori_id || undefined}
                id="kategori_id"
                name="kategori_id"
                onChange={handleChange}
                onBlur={handleBlur}
                options={optionKategori}
                isError={!!errors.kategori_id}
                messageError={errors.kategori_id}
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
              <Link href={"/admin/produk"}>
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

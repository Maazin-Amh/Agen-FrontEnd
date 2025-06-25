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
import { ProdukCreateArrayPayload } from "@/app/dashboard/interface";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Link from "next/link";
import { DeleteButton } from "@/components/ButtonAction";
import CurencyInput from "react-currency-input-field";
import clsx from "clsx";
import Select from "@/components/Select";
import useOptions from "@/hook/useOption";
import useProdukModule from "@/app/dashboard/lib";
import CurrencyInputs from "@/components/CurencyInput";

export const ProdukCreateSchema = yup.object().shape({
  nama_produk: yup.string().nullable().required("isi ini"),
  deskripsi_produk: yup.string().nullable().required("isi ini"),
  harga: yup.number().nullable().required("isi ini"),
  stok: yup.number().nullable().required("isi ini"),
  kategori_id: yup.number().nullable().required("isi ini"),
});

export const option = [
  {
    value: "gas",
    label: "Gas",
  },
  {
    value: "makanan",
    label: "Makanan",
  },
  {
    value: "minuman",
    label: "Minuman",
  },
  {
    value: "atk",
    label: "ATK",
  },
];

const defaultCatatanAray = {
  data: [
    {
      nama_produk: "",
      deskripsi_produk: "",
      harga: null,
      stok: null,
      kategori_id: null,
    },
  ],
};

const CreateProdukAraySchema = yup
  .object()
  .shape({
    data: yup.array().of(ProdukCreateSchema),
  })
  .default(defaultCatatanAray);

export default function TambahProduk() {
  const { useCreateBulProduk } = useProdukModule();
  const { mutate, isLoading } = useCreateBulProduk();
  const onSubmit = async (values: ProdukCreateArrayPayload) => {
    mutate(values, {
      onSuccess: () => {
        resetForm();
        setValues(defaultCatatanAray);
      },
    });
  };

  const formik = useFormik<ProdukCreateArrayPayload>({
    initialValues: CreateProdukAraySchema.getDefault(),
    validationSchema: CreateProdukAraySchema,
    enableReinitialize: true,
    onSubmit: onSubmit,
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
    <>
      <section className="flex items-center justify-center m-10">
        <section className="w-1/3">
          <h2 className="text-xl font-bold text-gray-500">Create Produk</h2>
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit} className="space-y-5">
              <FieldArray
                name={"data"}
                render={(arrayHelpers: ArrayHelpers) => (
                  <>
                    {values &&
                      values?.data?.map((value, index) => (
                        <section
                          key={index}
                          className="space-y-2 shadow-lg p-5 rounded-lg"
                        >
                          <section className="flex items-center justify-end">
                            <DeleteButton
                              onClick={() => arrayHelpers.remove(index)}
                            />
                          </section>
                          <section>
                            <Label
                              htmlFor={`data[${index}]nama_produk`}
                              title="nama produk"
                            />
                            <InputText
                              value={value.nama_produk}
                              placeholder="nama produk"
                              id={`data[${index}]nama_produk`}
                              name={`data[${index}]nama_produk`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isError={
                                getIn(errors?.data?.[index], "nama_produk") &&
                                getIn(touched?.data?.[index], "nama_produk")
                              }
                              messageError={getIn(
                                errors?.data?.[index],
                                "nama_produk"
                              )}
                            />
                          </section>
                          <section>
                            <Label
                              htmlFor="deskripsi_produk"
                              title="deskripsi produk"
                            />
                            <InputText
                              value={value.deskripsi_produk}
                              placeholder="deskripsi produk"
                              id={`data[${index}]deskripsi_produk`}
                              name={`data[${index}]deskripsi_produk`}
                              onChange={(e) => {
                                setFieldValue(
                                  `data[${index}]deskripsi_produk`,
                                  e.target.value
                                );
                              }}
                              onBlur={handleBlur}
                              isError={
                                getIn(
                                  errors?.data?.[index],
                                  "deskripsi_produk"
                                ) &&
                                getIn(
                                  touched?.data?.[index],
                                  "deskripsi_produk"
                                )
                              }
                              messageError={getIn(
                                errors?.data?.[index],
                                "deskripsi_produk"
                              )}
                            />
                          </section>

                          <section>
                            <Label htmlFor="harga" title="harga" />
                            <CurrencyInputs
                              id={`data[${index}]harga`}
                              name={`data[${index}]harga`}
                              value={value.harga || 0}
                              perfix="Rp. "
                              error={getIn(errors?.data?.[index], "harga")}
                              onValueChange={(value) => {
                                setFieldValue(`data[${index}]harga`, value);
                              }}
                              messageError={
                                getIn(errors?.data?.[index], "harga") &&
                                getIn(touched?.data?.[index], "harga")
                              }
                            />
                          </section>
                          <section>
                            <Label htmlFor="stok" title="stock" />
                            <CurrencyInputs
                              value={value.stok || 0}
                              id={`data[${index}]stok`}
                              name={`data[${index}]stok`}
                              error={getIn(errors?.data?.[index], "stok")}
                              onValueChange={(value) => {
                                setFieldValue(`data[${index}]stok`, value);
                              }}
                              messageError={
                                getIn(errors?.data?.[index], "stok") &&
                                getIn(touched?.data?.[index], "stok")
                              }
                            />
                          </section>
                          <section>
                            <Label htmlFor="kategori_id" title="Kategori" />
                            <Select
                              value={value.kategori_id || 0}
                              id={`data[${index}]kategori_id`}
                              name={`data[${index}]kategori_id`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              options={optionKategori}
                              isError={
                                getIn(errors?.data?.[index], "kategori_id") &&
                                getIn(touched?.data?.[index], "kategori_id")
                              }
                              messageError={getIn(
                                errors?.data?.[index],
                                "kategori_id"
                              )}
                            />
                          </section>
                        </section>
                      ))}

                    <section>
                      <Button
                        title="+"
                        colorSchema="blue"
                        variant="outline"
                        width="sm"
                        onClick={() => arrayHelpers.push(defaultCatatanAray)}
                      />
                    </section>
                  </>
                )}
              />
              <section>
                <Button width="lg1" colorSchema="dark" title="Simpan" />
              </section>
            </Form>
          </FormikProvider>
        </section>
      </section>
    </>
  );
}

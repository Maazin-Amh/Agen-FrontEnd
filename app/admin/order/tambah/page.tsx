"use client";
import React from "react";
import {
  useFormik,
  Form,
  FormikProvider,
  ArrayHelpers,
  FieldArray,
  getIn,
} from "formik";
import * as yup from "yup";
import { CreateOrder, OrderDetail, Status } from "../interface";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Select from "@/components/Select";
import { ArrowLongLeftIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import clsx from "clsx";
import useOrderModule from "../lib";
import useOptions from "@/hook/useOption";
import CurrencyInput from "react-currency-input-field";
import { DeleteButton } from "@/components/ButtonAction";

const formattedDate = getCurrentDateFormatted();
const defaultOrder: CreateOrder = {
  tanggal_order: formattedDate,
  status: Status.BELUM,
  total_bayar: 0,
  konsumen_id: null,
  order_detail: [
    {
      jumlah: 0,
      jumlah_harga: 0,
      produk: {
        id: 0,
        nama: "",
      },
    },
  ],
};
const createOrderSchema = yup
  .object()
  .shape({
    tanggal_order: yup.string().nullable().default("").required("Wajib isi"),
    status: yup.string().nullable().default("").required("Wajib isi"),
    total_bayar: yup.number().nullable().required("Wajib isi"),
    konsumen_id: yup.number().nullable().required("Wajib isi"),
    order_detail: yup.array().of(
      yup.object().shape({
        jumlah: yup.number().nullable().required("Wajib isi"),
        jumlah_harga: yup.number().nullable().required("Wajib isi"),
        produk: yup.object().shape({
          id: yup.number().nullable().required("Wajib isi"),
        }),
      })
    ),
  })
  .default(defaultOrder);

const option = [
  {
    label: "Sudah bayar",
    value: "bayar",
  },
  {
    label: "Belum bayar",
    value: "belum bayar",
  },
];
function getCurrentDateFormatted() {
  const date = new Date();

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}

function TambahOrder() {
  const { useCreateOrder } = useOrderModule();
  const { mutate, isLoading } = useCreateOrder();

  const onSubmit = async (values: CreateOrder) => {
    mutate(values, {
      onSuccess: () => {
        resetForm();
        setValues(defaultOrder);
        console.log("Order successfully created");
      },
    });
  };

  const formik = useFormik<CreateOrder>({
    initialValues: createOrderSchema.getDefault(),
    validationSchema: createOrderSchema,
    onSubmit: onSubmit,
  });

  const { optionKonsumen, optionProduk } = useOptions();

  const {
    values,
    setValues,
    resetForm,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    touched,
  } = formik;

  return (
    <section className="w-full m-10 justify-center items-center flex ">
      <section className="">
        <Link href={"/admin/order"}>
          <span className="flex items-center">
            <ArrowLongLeftIcon className="h-5 w-5 mr-2" />
            Kembali
          </span>
        </Link>
        <h2 className="text-xl font-bold text-gray-500">Tambah Order</h2>
        <FormikProvider value={formik}>
          <Form className="space-y-5" onSubmit={handleSubmit}>
            <section>
              <Label htmlFor="tanggal_order" title="Tanggal Order" />
              <InputText
                value={values.tanggal_order}
                id="tanggal_order"
                name="tanggal_order"
                onChange={handleChange}
                onBlur={handleBlur}
                isError={!!errors.tanggal_order}
                messageError={errors.tanggal_order}
              />
            </section>
            <section>
              <Label htmlFor="status" title="Status" />
              <Select
                value={values.status}
                id="status"
                name="status"
                onChange={handleChange}
                onBlur={handleBlur}
                options={option}
                isError={!!errors.status}
                messageError={errors.status}
              />
            </section>
            <section>
              <Label htmlFor="total_bayar" title="Total Bayar" />
              <CurrencyInput
                id="total_bayar"
                name="total_bayar"
                value={values.total_bayar || 0}
                placeholder="Rp. 0"
                decimalsLimit={2}
                prefix="Rp. "
                decimalSeparator=","
                groupSeparator="."
                onValueChange={(value) => {
                  setFieldValue("total_bayar", value);
                }}
              />
            </section>
            <section>
              <Label htmlFor="konsumen_id" title="Konsumen ID" />
              <Select
                value={values.konsumen_id || 0}
                id="konsumen_id"
                name="konsumen_id"
                onChange={handleChange}
                onBlur={handleBlur}
                options={optionKonsumen}
                isError={!!errors.konsumen_id}
                messageError={errors.konsumen_id}
              />
            </section>
            <FieldArray
              name="order_detail"
              render={(arrayHelpers: ArrayHelpers) => (
                <>
                  {values.order_detail.map((detail, index) => (
                    <section
                      key={index}
                      className="space-y-2 shadow-lg p-5 relative"
                    >
                      <section className="flex items-center justify-end">
                        <DeleteButton
                          onClick={() => arrayHelpers.remove(index)}
                        />
                      </section>
                      <section>
                        <Label
                          htmlFor={`order_detail[${index}].jumlah`}
                          title="Jumlah"
                        />
                        <InputText
                          value={detail.jumlah}
                          placeholder="Jumlah"
                          id={`order_detail[${index}].jumlah`}
                          name={`order_detail[${index}].jumlah`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isError={
                            !!getIn(errors, `order_detail[${index}].jumlah`)
                          }
                          messageError={getIn(
                            errors,
                            `order_detail[${index}].jumlah`
                          )}
                        />
                      </section>
                      <section>
                        <Label
                          htmlFor={`order_detail[${index}].jumlah_harga`}
                          title="Jumlah Harga"
                        />
                        <CurrencyInput
                          id={`order_detail[${index}].jumlah_harga`}
                          name={`order_detail[${index}].jumlah_harga`}
                          value={detail.jumlah_harga || 0}
                          placeholder="Rp. 0"
                          decimalsLimit={2}
                          prefix="Rp. "
                          decimalSeparator=","
                          groupSeparator="."
                          onValueChange={(value) => {
                            setFieldValue(
                              `order_detail[${index}].jumlah_harga`,
                              value
                            );
                          }}
                        />
                      </section>
                      <section>
                        <Label
                          htmlFor={`order_detail[${index}].produk.id`}
                          title="Produk ID"
                        />
                        <Select
                          value={detail.produk.id}
                          id={`order_detail[${index}].produk.id`}
                          name={`order_detail[${index}].produk.id`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          options={optionProduk}
                          isError={
                            !!getIn(errors, `order_detail[${index}].produk.id`)
                          }
                          messageError={getIn(
                            errors,
                            `order_detail[${index}].produk.id`
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
                      onClick={() =>
                        arrayHelpers.push({
                          jumlah: 0,
                          jumlah_harga: 0,
                          produk: {
                            id: 0,
                            nama: "",
                          },
                        })
                      }
                    />
                  </section>
                </>
              )}
            />
            <Button title="Simpan" width="lg" colorSchema="blue" isLoading={isLoading} />
          </Form>
        </FormikProvider>
      </section>
    </section>
  );
}

export default TambahOrder;
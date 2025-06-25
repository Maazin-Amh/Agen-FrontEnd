"use client";
import { useFormik, Form, FormikProvider, getIn } from "formik";
import * as yup from "yup";
import Button from "@/components/Button";
import Label from "@/components/Label";
import Link from "next/link";
import useProdukModule from "@/app/dashboard/lib";
import CurrencyInputs from "@/components/CurencyInput";
import { ProdukUpdatePayload } from "@/app/dashboard/interface";
import { useRouter } from "next/navigation";
import InputText from "@/components/InputText";
import { rupianUtil } from "@/utils";
import { formatRupiahIntl } from "@/utils/rupiah.utils";

export const ProdukCreateSchema = yup.object().shape({
  harga: yup.number().nullable().required("Isi harga produk"),
  stok: yup.number().nullable().required("Isi stok produk"),
  files: yup.string().nullable().default(""),
});

export default function UpdateProduk({ params }: { params: { id: string } }) {
  const { useDetailProduk, useUpdateProduk } = useProdukModule();
  const { mutate, isLoading } = useUpdateProduk(+params.id);
  const { data, isFetching } = useDetailProduk(params.id);
  const router = useRouter();

  const formik = useFormik<ProdukUpdatePayload>({
    initialValues: {
      harga: data?.harga || null,
      stok: data?.stok || null,
      files: data?.files || "",
      file: undefined,
      id: data?.id || 0,
    },
    validationSchema: ProdukCreateSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: () => {
          window.location.href = "/dashboard/admin";
        },
      });
    },
  });

  const { handleChange, handleSubmit, setFieldValue, values, errors } = formik;

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Update Produk
        </h2>

        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="harga" title="Harga Produk" />
              <InputText
                id="harga"
                name="harga"
                value={formatRupiahIntl(values.harga || 0)}
                onChange={(e) => {
      const cleaned = e.target.value.replace(/[^0-9]/g, "");
      formik.setFieldValue("harga", parseInt(cleaned || "0", 10));
    }}
                isError={!!errors.harga}
                messageError={errors.harga}
              />
            </div>

            <div>
              <Label htmlFor="stok" title="Stok Produk" />
              <InputText
                id="stok"
                name="stok"
                value={values.stok || undefined}
                onChange={handleChange}
                isError={!!errors.stok}
                messageError={errors.stok}
              />
            </div>

            <input
              type="file"
              className="block w-full border border-gray-200 rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4"
              id="files"
              onChange={(event: any) => {
                const file = event.target.files[0];

                let reader = new FileReader();
                reader.onloadend = () => {
                  setFieldValue("files", reader.result);
                };
                reader.readAsDataURL(file);
                setFieldValue("file", file);
              }}
            />

            <div className="flex gap-3 items-center ">
              <button
                type="button"
                onClick={() => router.back()}
                className="w-full p-2 rounded-lg  text-white  bg-red-600"
              >
                Batal
              </button>
              <button
                type="submit"
                className="w-full p-2 rounded-lg text-white bg-green-700"
              >
                Simpan
              </button>
            </div>
          </Form>
        </FormikProvider>
      </div>
    </section>
  );
}

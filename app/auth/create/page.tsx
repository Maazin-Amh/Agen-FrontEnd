"use client";

import { useFormik, Form, FormikProvider, getIn } from "formik";
import { useSession } from "next-auth/react";
import * as yup from "yup";
import useAuthModule from "../lib";
import { LoginPayload, RegisterPayload } from "../interface";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .nullable()
    .default("")
    .email("Gunakan format email")
    .required("Mohon harap di isi"),
  nama: yup.string().nullable().default("").required("Mohon harap di isi"),
  alamat: yup.string().nullable().default("").required("Mohon harap di isi"),
  password: yup
    .string()
    .nullable()
    .default("")
    .required("Mohon harap di isi")
    .min(8, "Min 8 karakater"),
});

const Login = () => {
  const { data: session, status } = useSession();
  const { useRegister } = useAuthModule();
  const { mutate } = useRegister();
  const router = useRouter()
  const formik = useFormik<RegisterPayload>({
    initialValues: registerSchema.getDefault(),
    validationSchema: registerSchema,
    enableReinitialize: true,
    onSubmit: (payload) => {
      mutate(payload);
    },
  });
  const { handleChange, handleSubmit, handleBlur, values, errors } = formik;

  return (
    <>
      <div className="relative w-full h-screen bg-cover bg-[url('/bg-login.png')] bg-center">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="bg-white w-full max-w-md p-8 space-y-6">
            <h2 className="text-2xl font-bold text-center">Buat Akun</h2>
            <FormikProvider value={formik}>
              <Form className="space-y-5" onSubmit={handleSubmit}>
                <InputText
                  value={values.nama}
                  placeholder="Eddie"
                  id="nama"
                  name="nama"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isError={getIn(errors, "nama")}
                  messageError={getIn(errors, "nama")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <InputText
                  value={values.email}
                  placeholder="exampel@email.com"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isError={getIn(errors, "email")}
                  messageError={getIn(errors, "email")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <InputText
                  value={values.alamat}
                  placeholder="JL.thaimana"
                  id="alamat"
                  name="alamat"
                  type="alamat"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isError={getIn(errors, "alamat")}
                  messageError={getIn(errors, "alamat")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <InputText
                  value={values.password}
                  placeholder="**********"
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isError={getIn(errors, "password")}
                  messageError={getIn(errors, "password")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className=" border border-black hover:bg-green-700 hover:text-white w-1/4 p-2 rounded"
                  >
                    ➜
                  </button>
                </div>
              </Form>
            </FormikProvider>

            <div className="text-center font-medium text-sm mt-4">
                sudah punya akun ?
              <button onClick={() => router.push('/login')} className="ml-2 text-green-800 hover:underline">
                Masuk
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

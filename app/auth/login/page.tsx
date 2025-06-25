"use client";

import { useFormik, Form, FormikProvider, getIn } from "formik";
import { getSession, signIn, useSession } from "next-auth/react";
import * as yup from "yup";
import useAuthModule from "../lib";
import { LoginPayload } from "../interface";
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
    .required("Mohon di isi"),
  password: yup
    .string()
    .nullable()
    .default("")
    .required("Mohon di isi")
    .min(8, "Min 8 karakater"),
});

const Login = () => {
  const { data: session, status } = useSession();
  console.log("session", session);
  console.log("status", status);
  const { useLogin } = useAuthModule();
  const router = useRouter();
  const { mutate } = useLogin();

  const formik = useFormik<LoginPayload>({
    initialValues: registerSchema.getDefault(),
    validationSchema: registerSchema,
    enableReinitialize: true,
    onSubmit: (payload) => {
      mutate(payload);
      // router.push("/home");
    },
  });
  const { handleChange, handleSubmit, handleBlur, values, errors } = formik;

  return (
    <>
      <div className="relative w-full h-screen bg-cover bg-[url('/bg-login.png')] bg-center">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="bg-white w-full max-w-md p-8 space-y-6">
            <h2 className="text-2xl font-bold text-center">Login</h2>
            <FormikProvider value={formik}>
              <Form className="space-y-5" onSubmit={handleSubmit}>
                <InputText
                  value={values.email}
                  placeholder="example@email.com"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isError={getIn(errors, "email")}
                  messageError={getIn(errors, "email")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black-500"
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

            <div className="text-center text-sm mt-4">
              <a
                href="/auth/resetpassword"
                className="text-green-800 font-medium hover:underline"
              >
                Lupa Password?
              </a>
              <br />
              <a
                href="/register"
                className="text-green-800 font-medium hover:underline"
              >
                Buat Akun
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

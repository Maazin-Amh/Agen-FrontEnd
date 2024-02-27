"use client";

import { useFormik, Form, FormikProvider, getIn } from "formik";

import * as yup from "yup";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Button from "@/components/Button";
import useAuthModule from "../../../lib";
import Link from "next/link";
import { ResetPasswordPayload } from "@/app/auth/interface";

export const ResetPwSchema = yup.object().shape({
  new_password: yup
    .string()
    .nullable()
    .default("")
    .required("isi terlebih dahulu")
    .min(8, "Minimal 8 karakater"),
});

const LupaPw = ({ params }: { params: { id: string; token: string } }) => {
  const { id, token } = params;

  const { useResetPassword } = useAuthModule();
  const { mutate, isLoading } = useResetPassword(id, token);
  const formik = useFormik<ResetPasswordPayload>({
    initialValues: ResetPwSchema.getDefault(),
    validationSchema: ResetPwSchema,
    enableReinitialize: true,
    onSubmit: (payload) => {
      mutate(payload);
    },
  });
  const { handleChange, handleSubmit, handleBlur, values, errors } = formik;

  return (
    <section>
      <div className="flex items-center justify-center w-full">
        <h1 className="text-3xl text-blue-400">Reset Password</h1>
      </div>
      <FormikProvider value={formik}>
        <Form className="space-y-5" onSubmit={handleSubmit}>
          <section>
            <Label htmlFor="new_password" title="new_password" />
            <InputText
              value={values.new_password}
              placeholder="**********"
              id="new_password"
              name="new_password"
              type="new_password"
              onChange={(e) => {
                handleChange(e);
              }}
              onBlur={handleBlur}
              isError={getIn(errors, "new_password")}
              messageError={errors?.new_password}
            />
          </section>
          <section>
            <Button
              height="lg"
              title="Reset Password"
              colorSchema="blue"
              isLoading={isLoading}
              isDisabled={isLoading}
            />
            <Link href={"/auth/login"}>
              <Button title="Back" colorSchema="green" />
            </Link>
          </section>
        </Form>
      </FormikProvider>
    </section>
  );
};

export default LupaPw;

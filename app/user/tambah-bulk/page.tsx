"use client";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Select from "@/components/Select";
import {
  useFormik,
  Form,
  FormikProvider,
  getIn,
  ArrayHelpers,
  FieldArray,
} from "formik";
import * as yup from "yup";
import useUserModule from "@/app/user/lib";
import { UserCreateArrayPayload } from "../interface";
import { userCreateSchema } from "../add/page";
import { DeleteButton } from "@/components/ButtonAction";
import { option } from "../add/page";

const defaultCatatanArray = {
  data: [
    {
      nama: "",
      email: "",
      umur: "",
      tanggal_lahir: "",
      status: "",
    },
  ],
};

const createUserArraySchema = yup
  .object()
  .shape({
    data: yup.array().of(userCreateSchema),
  })
  .default(defaultCatatanArray);

/*
const ujianSchema = yup.object().shape({
  nilai: yup.number().nullable(),
  mapel: yup.string().nullable(),
});

const createUjian = yup
  .object()
  .shape({
    nama: yup.string().nullable(),
    alamat: yup.string().nullable(),
    ujian: yup.array().of(userCreateSchema),
    tes: yup.object().shape({
      tes1: yup.string().nullable().required(),
      tes2: yup.string().nullable(),
    }),
  })
  .default(ujianSchema);

  */

const TambahBulkUser = () => {
  const { useCreateBulkUser } = useUserModule();
  const { mutate, isLoading } = useCreateBulkUser();
  const onSubmit = async (values: UserCreateArrayPayload) => {
    mutate(values, {
      onSuccess: () => {
        resetForm();
        window.location.href = "/user";
        setValues(defaultCatatanArray);
      },
    });
  };

  const formik = useFormik<UserCreateArrayPayload>({
    initialValues: createUserArraySchema.getDefault(),
    validationSchema: createUserArraySchema,
    enableReinitialize: true,
    onSubmit: onSubmit,
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
    touched,
  } = formik;

  return (
    <section className="flex items-center absolute justify-center w-full h-full">
      <section className="w-1/3">
        <h2 className="text-xl font-bold text-gray-500">Create User</h2>
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
                        className="space-y-2 shadow-lg p-5 relative"
                      >
                        <section className="flex items-center justify-end">
                          <DeleteButton
                            onClick={() => arrayHelpers.remove(index)}
                          />
                        </section>
                        <section>
                          <Label htmlFor={`data[${index}]nama`} title="nama" />
                          <InputText
                            value={value.nama}
                            placeholder="nama"
                            id={`data[${index}]nama`}
                            name={`data[${index}]nama`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isError={
                              getIn(errors?.data?.[index], "nama") &&
                              getIn(touched?.data?.[index], "nama")
                            }
                            messageError={getIn(errors?.data?.[index], "nama")}
                          />
                        </section>
                        <section>
                          <Label htmlFor="email" title="email" />
                          <InputText
                            value={value.email}
                            placeholder="email"
                            id={`data[${index}]email`}
                            name={`data[${index}]email`}
                            onChange={(e) => {
                              setFieldValue(
                                `data[${index}]email`,
                                e.target.value
                              );
                            }}
                            onBlur={handleBlur}
                            isError={
                              getIn(errors?.data?.[index], "email") &&
                              getIn(touched?.data?.[index], "email")
                            }
                            messageError={getIn(errors?.data?.[index], "email")}
                          />
                        </section>
                        <section>
                          <Label htmlFor="umur" title="umur" />
                          <Select
                            value={value.umur}
                            id={`data[${index}]umur`}
                            name={`data[${index}]umur`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            options={option}
                            isError={
                              getIn(errors?.data?.[index], "umur") &&
                              getIn(touched?.data?.[index], "umur")
                            }
                            messageError={getIn(errors?.data?.[index], "umur")}
                          />
                        </section>
                        <section>
                          <Label htmlFor="tangal_lahir" title="tangal lahir" />
                          <InputText
                            value={value.tanggal_lahir}
                            placeholder="tanggal lahir"
                            id={`data[${index}]tanggal_lahir`}
                            name={`data[${index}]tanggal_lahir`}
                            onChange={(e) => {
                              setFieldValue(
                                `data[${index}]tanggal_lahir`,
                                e.target.value
                              );
                            }}
                            type="date"
                            onBlur={handleBlur}
                            isError={
                              getIn(errors?.data?.[index], "tanggal_lahir") &&
                              getIn(touched?.data?.[index], "tanggal_lahir")
                            }
                            messageError={getIn(
                              errors?.data?.[index],
                              "tanggal_lahir"
                            )}
                          />
                        </section>
                        <section>
                          <Label htmlFor="status" title="status" />
                          <InputText
                            value={value.status}
                            placeholder="status"
                            id={`data[${index}]status`}
                            name={`data[${index}]status`}
                            onChange={(e) => {
                              setFieldValue(
                                `data[${index}]status`,
                                e.target.value
                              );
                            }}
                            onBlur={handleBlur}
                            isError={
                              getIn(errors?.data?.[index], "status") &&
                              getIn(touched?.data?.[index], "status")
                            }
                            messageError={getIn(
                              errors?.data?.[index],
                              "status"
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
                        arrayHelpers.push(userCreateSchema.getDefault())
                      }
                    />
                  </section>
                </>
              )}
            />
            <section>
              <Button
                width="lg1"
                title="Simpan"
                colorSchema="dark"
                isLoading={isLoading}
                isDisabled={isLoading}
              />
            </section>
          </Form>
        </FormikProvider>
      </section>
    </section>
  );
};

export default TambahBulkUser;

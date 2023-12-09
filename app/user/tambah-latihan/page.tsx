"use client";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import {
  useFormik,
  Form,
  FormikProvider,
  getIn,
  ArrayHelpers,
  FieldArray,
} from "formik";
import * as yup from "yup";
import { DeleteButton } from "@/components/ButtonAction";
import { create } from "domain";

const ujianSchema = yup.object().shape({
  nilai: yup.number().nullable().default(null).required("isi terlebih dahulu"),
  mapel: yup.string().nullable().default("").required("isi terlebih dahulu"),
});

const defaultuserArray = {
  data: [
    {
      nama: "",
      alamat: "",
      ujian: [
        {
          mapel: "",
          nilai: null,
        },
      ],
      tes: {
        tes1: "",
        tes2: "",
      },
    },
  ],
};

const createUjian = yup
  .object()
  .shape({
    nama: yup.string().nullable().default("").required("isi terlebih dahulu"),
    alamat: yup.string().nullable().default("").required("isi terlebih dahulu"),
    ujian: yup.array().of(ujianSchema),
    tes: yup.object().shape({
      tes1: yup.string().nullable().required("isi terlebih dahulu").default(""),
      tes2: yup.string().nullable().default(""),
    }),
  })
  .default(defaultuserArray);

const createArraySchema = yup
  .object()
  .shape({
    data: yup.array().of(createUjian),
  })
  .default(defaultuserArray);

const TambahBulkUser = () => {
  const formik = useFormik({
    initialValues: createArraySchema.getDefault(),
    validationSchema: createArraySchema,
    enableReinitialize: true,
    onSubmit: () => {
      console.log("oke berjalan", values);
    },
  });

  const {
    handleChange,
    handleSubmit,
    setFieldValue,
    handleBlur,
    values,
    errors,
    touched,
  } = formik;

  return (
    <section className="flex items-center  justify-center w-full h-full">
      <section className="w-1/3">
        <h2 className="text-xl font-bold text-gray-500">Latihan ...</h2>
        {JSON.stringify(values)}
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
                        className="space-y-2 rounded-lg mt-10 border p-5 relative"
                      >
                        <section className="flex items-center justify-end">
                          <DeleteButton
                            onClick={() => arrayHelpers.remove(index)}
                          />
                        </section>
                        <section>
                          <Label htmlFor="nama" title="nama" />
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
                          <Label htmlFor="alamat" title="alamat" />
                          <InputText
                            value={value.alamat}
                            placeholder="alamat"
                            id={`data[${index}]alamat`}
                            name={`data[${index}]alamat`}
                            onChange={(e) => {
                              setFieldValue(
                                `data[${index}]alamat`,
                                e.target.value
                              );
                            }}
                            onBlur={handleBlur}
                            isError={
                              getIn(errors?.data?.[index], "alamat") &&
                              getIn(touched?.data?.[index], "alamat")
                            }
                            messageError={getIn(
                              errors?.data?.[index],
                              "alamat"
                            )}
                          />
                        </section>
                        <section>
                          <Label htmlFor="hasil mapel" title="hasil mapel" />
                          <FieldArray
                            name={`data[${index}].ujian`}
                            render={(ujianArrayHelpers: ArrayHelpers) => (
                              <>
                                {value.ujian &&
                                  value?.ujian.map((values, indexing) => (
                                    <section
                                      key={indexing}
                                      className="flex justify-between mb-3 mt-3 items-center"
                                    >
                                      <div>
                                        <InputText
                                          value={values.mapel}
                                          placeholder="nama mapel"
                                          id={`data[${index}].ujian[${indexing}].mapel`}
                                          name={`data[${index}].ujian[${indexing}].mapel`}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          isError={
                                            getIn(errors?.data?.[index], `ujian.[${indexing}]mapel`) &&
                                            getIn(touched?.data?.[index], `ujian.[${indexing}]mapel`)
                                          }
                                          messageError={getIn(
                                            errors?.data?.[index],
                                            `ujian.[${indexing}]mapel`
                                          )}
                                        />
                                      </div>
                                      <div>
                                        <InputText
                                          value={values.nilai || ""}
                                          placeholder="nilai mapel"
                                          id={`data[${index}].ujian[${indexing}].nilai`}
                                          name={`data[${index}].ujian[${indexing}].nilai`}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          isError={
                                            getIn(errors?.data?.[index], `ujian.[${indexing}]nilai`) &&
                                            getIn(touched?.data?.[index], `ujian.[${indexing}]nilai`)
                                          }
                                          messageError={getIn(
                                            errors?.data?.[index],
                                            `ujian.[${indexing}]nilai`
                                          )}
                                        />
                                      </div>
                                    </section>
                                  ))}
                                <section className="flex items-center justify-between flex-row-reverse">
                                  <DeleteButton
                                    disabled={value.ujian.length <= 1}
                                    onClick={() =>
                                      ujianArrayHelpers.remove(index)
                                    }
                                  />
                                  <Button
                                    title="+"
                                    colorSchema="blue"
                                    className="font-bold"
                                    variant="outline"
                                    width="sm"
                                    onClick={() =>
                                      ujianArrayHelpers.push({
                                        mapel: "",
                                        nilai: null,
                                      })
                                    }
                                  />
                                </section>
                              </>
                            )}
                          />
                        </section>
                        <section>
                          <Label htmlFor="tes" title="tes" />
                          <section className="flex justify-between mb-3 mt-3 items-center">
                            <div>
                              <InputText
                                value={value.tes.tes1}
                                placeholder="tes 1"
                                id={`data[${index}].tes.tes1`}
                                name={`data[${index}].tes.tes1`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isError={
                                  getIn(errors?.data?.[index], `tes.tes1`) &&
                                  getIn(touched?.data?.[index], `tes.tes1`)
                                }
                                messageError={getIn(
                                  errors?.data?.[index],
                                  `tes.tes1`
                                )}
                              />
                            </div>
                            {/* {JSON.stringify(errors?.data?.[index])} */}
                            <div>
                              <InputText
                                value={value.tes.tes2}
                                placeholder="tes 2"
                                id={`data[${index}].tes.tes2`}
                                name={`data[${index}].tes.tes2`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isError={
                                  getIn(errors?.data?.[index], `tes.tes2`) &&
                                  getIn(touched?.data?.[index], `tes.tes2`)
                                }
                                messageError={getIn(
                                  errors?.data?.[index],
                                  `tes.tes2`
                                )}
                              />
                            </div>
                          </section>
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
                          nama: "",
                          alamat: "",
                          ujian: [
                            {
                              mapel: "",
                              nilai: null,
                            },
                          ],
                          tes: {
                            tes1: "",
                            tes2: "",
                          },
                        })
                      }
                    />
                  </section>
                </>
              )}
            />
            <section>
              <Button
                width="lg1"
                onClick={() => {
                  console.log("oke berjalan", values);
                }}
                title="Simpan"
                colorSchema="dark"
              />
            </section>
          </Form>
        </FormikProvider>
      </section>
    </section>
  );
};

export default TambahBulkUser;

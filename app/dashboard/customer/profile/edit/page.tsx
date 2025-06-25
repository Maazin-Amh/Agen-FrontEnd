"use client";
import useAuthModule from "@/app/auth/lib";
import Label from "@/components/Label";
import { useFormik, Form, FormikProvider, getIn } from "formik";
import { useRouter } from "next/navigation";
import * as yup from "yup";
// import { FaMapMarkerAlt, FaSave, FaTimes } from "react-icons/fa";

export const ProfileSchema = yup.object().shape({
  alamat: yup
    .string()
    .nullable()
    .default("")
    .required("Tolong isi alamat terlebih dahulu"),
});

const EditProfile = () => {
  const { useUpdateProfile, useProfile } = useAuthModule();
  const { mutate: profilemutate } = useUpdateProfile();
  const { data: profile } = useProfile();
  const router = useRouter();

  const formik = useFormik<any>({
    initialValues: {
      alamat: profile?.data.alamat ?? "",
      id: profile?.data.id,
    },
    validationSchema: ProfileSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      profilemutate(values);
    },
  });

  const { handleChange, handleSubmit, values, errors } = formik;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-green-700 mb-4 text-center">
          Edit Profil
        </h2>

        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="alamat" title="Alamat" />
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">
                  {/* <FaMapMarkerAlt /> */}
                </span>
                <textarea
                  id="alamat"
                  name="alamat"
                  value={values.alamat}
                  onChange={handleChange}
                  rows={4}
                  className={`p-1 w-full rounded border ${
                    getIn(errors, "alamat")
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:ring focus:border-blue-400`}
                  placeholder="Tulis alamat lengkapmu di sini..."
                />
                {getIn(errors, "alamat") && (
                  <p className="text-red-500 text-sm m">
                    {getIn(errors, "alamat")}
                  </p>
                )}
              </div>
            </div>

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
    </div>
  );
};

export default EditProfile;

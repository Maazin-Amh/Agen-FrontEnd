import Label from "@/components/Label";
import InputText from "@/components/InputText";
import { UserListFilter } from "../interface";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import Select from "@/components/Select";

type FilterProps = {
  params: UserListFilter;
  setParams: Dispatch<SetStateAction<any>>;
};

const option = [
  {
    value: 15,
    label: "15",
  },
  {
    value: 16,
    label: "16",
  },
  {
    value: 17,
    label: "17",
  },
  {
    value: 18,
    label: "18",
  },
  {
    value: 19,
    label: "19",
  },
  {
    value: 20,
    label: "20",
  },
];

const Filter: React.FC<FilterProps> = ({ params, setParams }) => {
  let [eror, setError] = useState<any>();

  const handleChange = (e: ChangeEvent<any>) => {
    setParams((params: UserListFilter) => {
      return {
        ...params,
        [e.target.name]: e.target.value,
      };
    });

    if (e.target.name === "to_umur") {
      if (Number(params.to_umur) > e.target.value) {
        setError(
          `tahun yang anda masukan harus lebih besar dari ${params.from_umur}`
        );
      }
    }

    if (e.target.name === "from_umur") {
      if (e.target.value > Number(params.to_umur)) {
        setParams((prevParams: UserListFilter) => {
          return {
            ...prevParams,
            to_year: "",
          };
        });
      }
    }
  };

  return (
    <section>
      <section className="space-y-3 pt-5">
        <section>
          <Label title="nama" htmlFor="Nama" />
          <InputText
            onChange={handleChange}
            name="nama"
            id="nama"
            value={params.nama}
          />
        </section>
        <section>
          <Label title="email" htmlFor="Email" />
          <InputText
            onChange={handleChange}
            name="email"
            id="email"
            value={params.email}
          />
        </section>
        <section>
          <Label title="dari umur" htmlFor="from_umur" />
          <Select
            onChange={handleChange}
            options={option}
            value={params.from_umur}
            name="from_year"
            id="from_year"
          />
        </section>
        <section>
          <Label title="ke umur" htmlFor="to_umur" />
          <Select
            onChange={handleChange}
            options={option}
            value={params.to_umur}
            name="to_year"
            id="to_year"
          />
        </section>
        {eror && <p className="text-red-500 font-light text-xs">{eror}</p>}
      </section>
    </section>
  );
};

export default Filter;

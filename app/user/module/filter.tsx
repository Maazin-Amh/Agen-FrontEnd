import Label from "@/components/Label";
import InputText from "@/components/InputText";
import { UserListFilter } from "../interface";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import Select from "@/components/Select";
import { set } from "date-fns";

type FilterProps = {
  params: UserListFilter;
  setParams: Dispatch<SetStateAction<any>>;
};
const option = [
  {
    value: 2020,
    label: "2020",
  },
  {
    value: 2021,
    label: "2021",
  },
  {
    value: 2022,
    label: "2022",
  },
  {
    value: 2023,
    label: "2023",
  },
];

const Filter: React.FC<FilterProps> = ({ params, setParams }) => {
  const handleChange = (e: ChangeEvent<any>) => {
    setParams((params: UserListFilter) => {
      return {
        ...params,
        [e.target.name]: e.target.value,
      };
    });
    if (params.from_year > params.to_year) {
      alert(
        `maaf tahun yang anda pilih harus lebih besar dari ${params.from_year}`
      );
    }
  };
  return (
    <section>
      <section className="space-y-3 pt-5">
        <section>
          <Label title="Nama" htmlFor="Nama" />
          <InputText
            onChange={handleChange}
            name="nama"
            id="nama"
            value={params.nama}
          />
        </section>
        <section>
          <Label title="Email" htmlFor="Email" />
          <InputText
            onChange={handleChange}
            name="email"
            id="email"
            value={params.email}
          />
        </section>
        <section>
          <Label title="dari" htmlFor="from_year" />
          <Select
            onChange={handleChange}
            options={option}
            value={params.from_year}
            name="from_year"
            id="from_year"
          />
        </section>
        <section>
          <Label title="ke" htmlFor="to_year" />
          <Select
            onChange={handleChange}
            options={option}
            value={params.to_year}
            name="to_year"
            id="to_year"
          />
        </section>
      </section>
    </section>
  );
};

export default Filter;

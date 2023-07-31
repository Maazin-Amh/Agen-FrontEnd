import { ReactNode } from "react";

type status = "bagus 100" | "keren 90" | "hebat 80";
interface SectionProps {
    judulpel: string;
    child: ReactNode;
    xstatus: status;
}

const  Nilai: React.FC<SectionProps> = ({judulpel, xstatus, child}) => {
    return(
        <main className=" border border-red-500 mt-5 rounded-lg  shadow-md px-2">
        <div className="border-b border-red-500  py-2 ">
          <h5 className="font-bold text-red-500"> {judulpel}</h5>
        </div>
        <div className="py-3 text-red-500 text-sm">{child}</div>
      </main>
    )
}   
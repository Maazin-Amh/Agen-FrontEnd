"use client";
import { ReactNode } from "react";

interface TableProps {
  children: ReactNode;
  isFetching?: boolean;
  isEmpty?: boolean;
  isError?: boolean;
}

export const Table: React.FC<TableProps> = ({
  isFetching = false,
  isEmpty = false,
  isError = false,
  children,
}) => {
  return (
    <>
      {" "}
      <table className="divide-y border ds-wst border-gray-100 w-full">{children}</table>
      {isError && (
        <div className="flex items-center justify-center w-full h-32">
          <div className="text-lg text-gray-500">Ada kesalahan</div>
        </div>
      )}
      {isEmpty && !isFetching && !isError ? (
        <div className="flex items-center justify-center w-full h-32">
          <div className="text-lg text-gray-500">Data tidak ditemukan</div>
        </div>
      ) : null}
    </>
  );
};

interface TheadProps {
  children: ReactNode;
}

export const Thead: React.FC<TheadProps> = ({ children }) => {
  return <thead className="bg-[#fdfdfd] ">{children}</thead>;
};

interface TbodyProps {
  children: ReactNode;
}

export const Tbody: React.FC<TbodyProps> = ({ children }) => {
  return <tbody className="bg-[#fefefe]">{children}</tbody>;
};

interface TrProps {
  children: ReactNode;
}

export const Tr: React.FC<TrProps> = ({ children }) => {
  return <tr className="border-b">{children}</tr>;
};

interface ThProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
}

export const Th: React.FC<ThProps> = ({ children, ...props }) => {
  return (
    <th
      className="px-4 py-2 text-base border-r text-start bg-[#fefefe] font-normal text-[#aeaeaf]"
      {...props}
    >
      {children}
    </th>
  );
};

interface TdProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
}

export const Td: React.FC<TdProps> = ({ children, ...props }) => {
  return (
    <td
      className="px-4 py-4 text-sm font-medium text-slate-900"
      {...props}
    >
      {children}
    </td>
  );
};

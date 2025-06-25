import { useToast } from "@chakra-ui/react";

type SubmitFunction = (id: number) => any;

export function useConfirmDelete({
  onSubmit,
}: {
  onSubmit: SubmitFunction;
}) {
  const toast = useToast();

  const handleDelete = (id: number) => {
    toast({
      title: "Apakah Yakin?",
      description: "Data yang terhapus tidak bisa dikembalikan",
      status: "warning",
      duration: null,
        position: "top-right",
      isClosable: true,
      render: () => (
        <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-md">
          <p className="text-gray-700 mb-2">Apakah Anda yakin ingin menghapus item ini?</p>
          <div className="flex justify-center gap-3">
            <button
              className=" hover:bg-red-600 text-red-600  px-4 py-2 rounded "
              onClick={async () => {
                await onSubmit(id);
                toast.closeAll(); 
              }}
            >
              Hapus
            </button>
            <button
              className=" hover:bg-gray-300 text-gray-700 px-4 py-2 rounded"
              onClick={() => toast.closeAll()}
            >
              Batal
            </button>
          </div>
        </div>
      ),
    });
  };

  return handleDelete;
}

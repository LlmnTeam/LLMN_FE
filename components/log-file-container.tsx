import { useState } from "react";
import Container from "./container";
import LogFile from "./log-file";
import { cls } from "@/libs/utils";

interface LogFileProps {
  filename: string;
}

interface LogFileContainerProps {
  files: LogFileProps[];
}

export default function LogFileContainer({ files }: LogFileContainerProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const filesPerPage = 9;

  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = files.slice(indexOfFirstFile, indexOfLastFile);

  const filledFiles = [...currentFiles];
  while (filledFiles.length < filesPerPage) {
    filledFiles.push({ filename: "" });
  }

  const totalPages = Math.ceil(files.length / filesPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Container title="로그 파일" type="log">
      <div className="grid grid-cols-3 w-full gap-0 border-[#E9ECEF]">
        {filledFiles.map((file, index) => (
          <div
            key={index}
            className={cls(
              "flex flex-col justify-start items-center h-[110px] xs:h-[130px] sm:h-[155px] gap-1 xs:gap-2 sm:gap-3 pt-5 xs:pt-5.5 sm:pt-6",
              index < 6 ? "border-b" : "",
              index % 3 !== 2 ? "border-r" : ""
            )}
          >
            {file.filename ? (
              <LogFile filename={file.filename} />
            ) : (
              <div className="w-[65px] h-[64px]" />
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={cls(
              "w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 rounded-full mx-1 xs:mx-1.5 sm:mx-2 mt-1 sm:mt-0 border border-black",
              currentPage === page ? "bg-black " : "bg-white"
            )}
          />
        ))}
      </div>
    </Container>
  );
}

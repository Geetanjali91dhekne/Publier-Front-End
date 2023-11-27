import { Checkbox } from 'antd';
import React, { useRef, useState } from 'react';
import { BsFileEarmarkArrowUpFill } from 'react-icons/bs';
import { RxCross1 } from 'react-icons/rx';
import DocumentImage from '../../../../../assets/icons/onboarding/document.png';
import Preview from '../../../../../assets/icons/onboarding/preview.svg';
type Props = {
    files: any;
    setFiles: any;
    deletedDoc?: any;
    setDeletedDoc?: any;
    type: string;
};
const FileDragAndDrop: React.FC<Props> = ({ files, setFiles, deletedDoc, setDeletedDoc, type }) => {
    const fileInputRef = useRef<any>();
    const [docUpload, setDocUpload] = useState<boolean[]>([]);
    const [statusDoc, setStatusDoc] = useState<string[]>([]);
    const backendUrl: any = process.env.REACT_APP_BACKEND_URL;

    const handleSelectChange = (event: any, index: number) => {
        const newSelectedValues = [...statusDoc];
        newSelectedValues[index] = event.target.value;
        setStatusDoc(newSelectedValues);

        setFiles((prevFiles: any[]) => {
            const updatedFiles = [...prevFiles];
            updatedFiles[index].status = event.target.value;
            return updatedFiles;
        });
    };
    const handleCheckChange = (event: any, index: number) => {
        const { checked } = event.target;
        setDocUpload((prevDocUpload: any) => {
            const updatedDocUpload = [...prevDocUpload];
            updatedDocUpload[index] = checked;
            setFiles((prevFiles: any[]) => {
                const updatedFiles = [...prevFiles];
                updatedFiles[index].doc_check = checked;
                return updatedFiles;
            });
            return updatedDocUpload;
        });
    };

    const handleDropFile = (e: any) => {
        e.preventDefault();
        const fileList = e.dataTransfer.files;
        if (fileList) {
            const dummyFiles = [...files];
            Object.keys(fileList).map((key: any) => {
                let newFile = fileList[key];
                newFile.doc_check = false;
                newFile.status = 'IN';
                dummyFiles.push(newFile);
                return newFile;
            });
            setFiles(dummyFiles);
        }
    };

    const handleInputFile = (e: any) => {
        if (e.target.files) {
            const dummyFiles = [...files];
            Object.keys(e.target.files).map((key: any) => {
                let newFile = e.target.files[key];
                newFile.doc_check = false;
                newFile.status = 'IN';
                dummyFiles.push(newFile);
                return newFile;
            });
            setFiles(dummyFiles);
        }
    };

    const handleDragOver = (e: any) => {
        e.preventDefault();
    };

    const handleClick = (e: any) => {
        const { target = {} } = e || {};
        target.value = '';
    };

    const DeleteFile = (fileIndex: any) => {
        if (!deletedDoc.includes(files[fileIndex]?.id)) {
            setDeletedDoc((prevArrayState: any) => [...prevArrayState, files[fileIndex]?.id]);
        }
        const filteredFiles = files.filter((element: any, index: any) => {
            if (fileIndex !== index) {
                return element;
            }
            return null;
        });
        const filteredStatus = statusDoc.filter((element: any, index: any) => {
            if (fileIndex !== index) {
                return element;
            }
            return null;
        });
        setFiles(filteredFiles);
        setStatusDoc(filteredStatus);
    };

    const ViewFile = (fileIndex: any) => {
        if (files[fileIndex]?.document) {
            const documentUrl = `${backendUrl}/${files[fileIndex]?.document}`;
            window.open(documentUrl, '_blank');
        } else {
            const url = window.URL.createObjectURL(files[fileIndex]);
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.click();
            console.log(url);
        }
    };

    return (
        <div className="px-8">
            <div onDrop={handleDropFile} onDragOver={handleDragOver} className="h-[201px] border-dashed border border-[#3570E4] my-5 bg-[#F9FBFF] flex justify-center items-center">
                <div className="flex items-center justify-center gap-3">
                    <div className="bg-[#3570E4] rounded-full p-3 ">
                        <BsFileEarmarkArrowUpFill size={24} color="white" />
                    </div>
                    <div className="font-[Montserrat] text-[14px]">
                        <input type="file" hidden={true} ref={fileInputRef} onChange={handleInputFile} onClick={handleClick} multiple />
                        <div className="font-[700]">
                            Drop any document here, or{' '}
                            <span onClick={() => fileInputRef.current.click()} className="text-[#3570E4] cursor-pointer">
                                browser
                            </span>
                        </div>
                        <div className="font-[400] text-[#707174]">Supports: PDF, JPEG ,PNG, DOCX . Max size 15 MB</div>
                    </div>
                </div>
            </div>
            <div>
                {type === 'agremment' ? (
                    <div>
                        {files?.map((item: any, index: any) => (
                            <div key={index} className="flex justify-between items-center bg-[rgba(194,217,205,0.4)] h-[50px] px-3 mb-4">
                                <div className="flex gap-3 items-center">
                                    <img className="h-[20px] pl-2" src={DocumentImage} alt="document"></img>
                                    <div className="font-[Roboto] font-[500] text-[14px]">{files[index]?.document || item?.name}</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <img onClick={() => ViewFile(index)} className="w-[30px] cursor-pointer" src={Preview} alt="preview"></img>
                                    <div className="cursor-pointer" onClick={() => DeleteFile(index)}>
                                        <RxCross1 size={22} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        {files?.map((item: any, index: any) => (
                            <div key={index} className="flex justify-between items-center bg-[rgba(194,217,205,0.4)] h-[50px] px-3 mb-4">
                                <div className="flex gap-3 items-center">
                                    <div>
                                        <Checkbox className="customCheckBox2" checked={(files[index]?.doc_check === 1 ? true : false) || docUpload[index] || false} onChange={(event) => handleCheckChange(event, index)} />
                                    </div>
                                    <img className="h-[20px] pl-2" src={DocumentImage} alt="document"></img>
                                    <div className="font-[Roboto] font-[500] text-[14px]">{files[index]?.document || item?.name}</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <select
                                        value={files[index]?.status || statusDoc[index] || ''}
                                        onChange={(event) => handleSelectChange(event, index)}
                                        className="w-[120px] h-[32px] rounded-lg bg-[#C2D9CD] outline-0 color-black font-[Montserrat] px-2 cursor-pointer"
                                    >
                                        <option className="font-[Montserrat]" value={'AP'}>
                                            Approved
                                        </option>
                                        <option className="font-[Montserrat]" value={'RE'}>
                                            Rejected
                                        </option>
                                        <option className="font-[Montserrat]" value={'IN'}>
                                            In Progress
                                        </option>
                                    </select>
                                    <img onClick={() => ViewFile(index)} className="w-[30px] cursor-pointer" src={Preview} alt="preview"></img>
                                    <div className="cursor-pointer" onClick={() => DeleteFile(index)}>
                                        <RxCross1 size={22} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileDragAndDrop;

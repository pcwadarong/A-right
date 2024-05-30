'use client';

import { useState, useEffect, useRef, ChangeEvent } from 'react';
import FileEditIcon from '@/components/svg/file';
import Image from 'next/image';
import AutoResizeTextarea from '@/components/ui/textarea';

const Create: React.FC = () => {
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const menuRef = useRef<HTMLDivElement>(null);
  const [explanationArea, setExplanationArea] = useState<string>('');

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShowUserMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        setImageUrl(reader.result.toString());
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteClick = () => {
    setImageUrl('');
  };

  return (
    <div className="flex w-full h-screen px-4 py-8 md:px-8 2xl:px-0 bg-green-light justify-center">
      <div className="w-full 2xl:w-[1400px]">
        <div className="flex gap-2 justify-end mb-5 subtitle items-center">
          <button className="py-1 px-3 bg-white rounded-md">미리보기</button>
          <button className="py-1 px-3 bg-white rounded-md">임시저장</button>
          <button className="py-1 px-3 bg-primary text-white rounded-md">저장</button>
          <div className="relative flex items-center" ref={menuRef}>
            <button onClick={() => setShowUserMenu((prev) => !prev)} aria-label="Toggle User Menu">
              <Image src={'/meatball.svg'} alt="meatball menu icon" width="20" height="20" />
            </button>
            {showUserMenu && (
              <div className="absolute right-0 top-10 flex flex-col text-center rounded-lg overflow-hidden shadow-md bg-white">
                <button
                  className="rounded-md px-3 py-2 hover:bg-gray-2 text-nowrap"
                  onClick={() =>
                    alert('아직 지원되지 않는 기능입니다. 조금만 기다려주시면 감사하겠습니다.')
                  }
                >
                  복제하기
                </button>
                <button
                  className="text-red px-3 py-2 rounded-md hover:bg-gray-2"
                  onClick={() => {
                    if (confirm('정말 삭제하시겠습니까?')) setImageUrl('');
                  }}
                >
                  삭제하기
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="bg-white rounded-2xl overflow-hidden">
          <p className="py-2 px-4 text-font">{}페이지</p>
          <div className="aspect-[4/1] bg-font justify-center flex">
            {imageUrl ? (
              <div className="relative overflow-hidden flex items-center">
                <img src={imageUrl} alt="Uploaded" className="w-full h-auto object-cover" />
                <div className="absolute bottom-5 right-5 bg-gray-4/50 text-white p-2 rounded-md">
                  <button onClick={handleDeleteClick}>삭제하기</button>
                </div>
              </div>
            ) : (
              <label
                className="cursor-pointer p-50 justify-center flex flex-col items-center"
                aria-label="Upload Image"
              >
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".jpg, .jpeg, .png, .bmp, .webp, .svg"
                />
                <FileEditIcon color="white" width={70} height={70} />
                <p className="mt-2 text-white">사진 추가하기</p>
              </label>
            )}
          </div>
          <div className="p-2">
            <input
              type="text"
              placeholder="설문 제목 입력"
              className="p-2 w-full focus:outline-none hover:border-b-[1px] focus:border-b-[1px] hover:border-gray-3 focus:border-primary"
            />
            <AutoResizeTextarea
              value={explanationArea}
              onChange={(e) => setExplanationArea(e.target.value)}
              placeholder="설명을 입력하세요 ..."
            />
          </div>
          <div className="border-t-[1px] border-gray-2 flex h-14 items-center">
            <button className="flex-1 border-r-[1px] border-gray-2">항목 추가</button>
            <button className="flex-1">페이지 추가</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;

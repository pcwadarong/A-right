'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Survey } from '@/types';
import Special from './special';
import Reaction from './reaction';
import { openDetailModal } from '@/utils/handleModal';
import { getRandomColor } from '@/utils/getRandomColor';

const SurveyItem: React.FC<{ item: Survey }> = ({ item }) => {
  const [randomClass, setRandomClass] = useState('');

  useEffect(() => {
    setRandomClass(getRandomColor());
  }, []);

  return (
    <li
      className="drop-shadow flex flex-col flex-1 justify-between overflow-hidden rounded-3xl h-[360px] cursor-pointer"
      onClick={() => openDetailModal(item)}
    >
      <div className={`h-36 w-full bg-${randomClass} overflow-hidden`}>
        {item.img && (<Image
          className="w-full h-full object-cover"
          src={item.img}
          alt="survey image"
          width={100}
          height={100}
        />)}
      </div>
      <div className="px-6 py-7 flex flex-col justify-between bg-white flex-grow">
        <div>
          <Special point={item.point} duration={item.duration} />
          <h3 className="body1 md:text-xl mt-3 mb-2 line-clamp-2">{item.title}</h3>
          <p className="caption text-gray-4 truncate">{item.duration}</p>
        </div>
        <Reaction response={item.response} comments={item.comments} />
      </div>
    </li>
  );
};

export default SurveyItem;

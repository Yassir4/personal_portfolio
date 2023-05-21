import React from 'react';


interface Props {
    date: string
}

const Date: React.FC<Props> = ({date}) => {
  return (<div className='flex flex-row items-center'>
    <div className='h-3.5 w-0.5 bg-zinc-200 mr-3' />
    <p className='text-zinc-400 text-sm'>{date}</p>
  </div>

  );
};

export default Date;
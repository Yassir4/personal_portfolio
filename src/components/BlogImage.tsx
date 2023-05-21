
import React from 'react';


const BlogImage: React.FC<{
  src:string
  alt?: string
}> = (props) => {
  
  return (
    <div className='w-full flex justify-center align-center'>
      <img
        src={props.src} 
        alt={props.alt}
      />
    </div>
  );
  
};

export default BlogImage;
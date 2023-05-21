import React from 'react';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Date from './Date';

const postsDirectory = path.join(process.cwd(), 'posts');
const getPostMetaData = () => {
  
  const files = fs.readdirSync(postsDirectory);
    
  const allPostsData = files.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  });
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
};

const BlogsPreview: React.FC<{}> = () => {
  const postMetaData = getPostMetaData();
  const postPreviews = postMetaData.map((file, index) => (
    <div key={index} className='scale-95 hover:scale-100 hover:bg-zinc-100 p-4 rounded transition group-hover:scale-100 group-hover:opacity-100'>
      <Link href={`/posts/${file.id}`}>
        <Date date={file.date || ''} />
        <p className='text-base antialiased font-bold mt-2'>{file.title}</p>
        <p className='text-sm relative z-10 mt-2  text-zinc-600 '>{file.preview}</p>
      </Link>
    </div>
  ));
  return (
    <div>
      <p className='text-base text-center text-zinc-500 font-bold'>Articles</p>
      <div className='md:mx-[15%] mt-10'>
        {postPreviews}
      </div>
    </div>
  );
};

export default BlogsPreview;
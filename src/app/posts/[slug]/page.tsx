
import fs from 'fs';
import matter from 'gray-matter';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import Date from '@/components/Date';
import BlogImage from '@/components/BlogImage';
import getPostMetadata from '@/components/getPostMetadata';



const getPostContent = (slug: string): {
  contentHtml: string;
  date: string;
  title: string;
} => {
  const folder = 'posts/';
  const file = `${folder}${slug}.md`;
  const content = fs.readFileSync(file, 'utf-8');

  const matterResult = matter(content);
  // @ts-ignore
  return {contentHtml: matterResult.content, ...matterResult.data} ;
};

export const generateStaticParams = async () => {
  const posts = getPostMetadata();
  return posts.map((post) => ({
    slug: post.slug,
  }));
};

const Article = ({params}: {params: { slug: string } }) => {
  const postData = getPostContent(params.slug);
  
  return (
    <div className='w-full flex flex-col items-center'>
      <div className='justify-center'>
        <Date date={postData.date} />
        <br />
        <h1 className='text-lg font-bold'>{postData.title}</h1>
        <br />
        <article
        //  className='prose antialiased font-sans text-base w-[40rem]'
          className='prose mx-auto mt-8 w-[25rem] md:w-[60rem] prose-pre:border-[1px] prose-pre:border-skin-line prose-pre:border-solid'
        >
          <ReactMarkdown components={{
            img: (props) => {
              if(props.src)
                return(
                  <BlogImage src={props.src} alt={props.alt}/>
                );
              return null;
            }
          }}>
            {postData.contentHtml}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
};

export default Article;

import fs from 'fs';
import matter from 'gray-matter';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import Date from '@/components/Date';
import BlogImage from '@/components/BlogImage';



const getPostContent = async (slug: string) => {
  const folder = 'posts/';
  const file = `${folder}${slug}.md`;
  const content = fs.readFileSync(file, 'utf-8');

  const matterResult = matter(content);

  return {contentHtml: matterResult.content, ...matterResult.data} ;
};

  
const Article: React.FC<{ params: { slug: string } }> = async ({params}) => {
  const postData = await getPostContent(params.slug);
  
  return (
    <div className='mx-[10%]'>
      <Date date={postData.date} />
      <br />
      <h1 className='text-lg font-bold'>{postData.title}</h1>
      <br />
      <article className='prose antialiased font-sans text-base'>
        <ReactMarkdown components={{
          img: (props) => {
            return(
              <BlogImage src={props.src} alt={props.alt}/>
            );},
        }}>
          {postData.contentHtml}
        </ReactMarkdown>
      </article>
    </div>
  );
};

export default Article;
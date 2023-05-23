import React from 'react';


export interface Props {}

const Blog: React.FC<Props> = () => {
  return (
    <div className='mt-16 mx-16'>
      <h1 className='text-left text-4xl font-bold tracking-tight text-zinc-800'>
        Hi There!
      </h1>
      <div className='mt-8 space-y-7 text-base text-zinc-600'>
        <p>I am Yassir Hartani a FrontEnd developer, primarily working with Javascript | React | React Native | NextJs and Expo.
          I live in Casablanca, but I have worked mostly with remote-first teams, where I had the chance to meet and learn from developers around the globe.
        </p>
        <p>
          Currently I am a FrontEnd developer at <a href='https://google.com/' className='text-blue-400'>@Groovehq</a> where I am responsible for developing and maintaining a cross-platform application.
        </p>
        <p>
          I like to write about some stuff I learned or that I find interesting, it also helps me improve my thinking and my communication skills while learning more about the topic I'm writing about.
        </p>
        <p>If you wanna connect, find me on <a href='https://google.com/' className='text-blue-400'>Twitter</a> ,<a href='https://google.com/' className='text-blue-400'>GitHub</a>,<a href='https://google.com/' className='text-blue-400'>LinkedIn</a>, or just send me an email to hartaniyassir@gmail.com.</p>
      </div>
   
    </div>
  );
};

export default Blog;


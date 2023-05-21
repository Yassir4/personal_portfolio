import Main from '@/components/Main';
import Navbar from '@/components/Navbar';
import BlogsPreview from '@/components/BlogsPreview';

export default function Home() {
  return (
    <main className='flex justify-center align-center'>
      <title>Yassir | Front-End Developer</title>
      <div >
        <div className='w-full'>
          <Main />
          <BlogsPreview />
        </div>
      </div>
    </main>
  );
}

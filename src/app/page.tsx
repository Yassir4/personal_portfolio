import Main from '@/components/Main';
import BlogsPreview from '@/components/BlogsPreview';

export default function Home() {
  return (
    <div>
      <main className='flex justify-center align-center'>
        <title>Yassir | Front-End Developer</title>
        <div >
          <div className='w-full'>
            <Main />
            <BlogsPreview />
          </div>
        </div>
      </main>
    </div>
  );
}

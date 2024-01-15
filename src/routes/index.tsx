import Photo from "../islands/Photo.tsx";

export default function Home() {
  return (
    <main class="hero min-h-screen bg-base-200">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <Photo />
        </div>
      </div>
    </main>
  );
}

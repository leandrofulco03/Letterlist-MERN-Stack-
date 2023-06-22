import { Link } from 'react-router-dom';
import './Home.css';
import { BoltIcon, CheckCircleIcon, UserIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import ScrollReveal from 'scrollreveal';
import { useEffect } from 'react';

const features = [
  {
    name: 'Ready to write',
    description:
      'Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.',
    icon: PencilSquareIcon,
  },
  {
    name: 'Fast',
    description:
      'Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.',
    icon: BoltIcon,
  },
  {
    name: 'Multi Users',
    description:
      'Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.',
    icon: UserIcon,
  },
  {
    name: 'Free',
    description:
      'Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.',
    icon: CheckCircleIcon,
  },
]

const stats = [
  { id: 1, name: 'New Notes every month', value: '360,000' },
  { id: 2, name: 'Task completed', value: '72%' },
  { id: 3, name: 'Users annually', value: '26,000+' },
]

export default function HomePage() {

  useEffect(() => {
    const sr = ScrollReveal({
      origin: 'top',
      distance: '80px',
      duration: 2000,
      reset: false
    });
    sr.reveal(
      `
      .home_container
      `
    )
  }, [])

  return (
    <main className="home_container">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="banner mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Make <span>Letterlist</span> become essential.
            </h1>
            <p className="mt-6 text-lg leading-8 text-white">
                From jotting down grocery lists to recording important meeting notes, we all need a reliable list app.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to={'/user'}
                className="btn_primary"
              >
                Create User
              </Link>
            </div>
          </div>
        </div>
      {/* STATS */}
      <div className="py-10 sm:py-3">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-white">{stat.name}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>

      {/* FEATURES DIV */}
      <div className="py-24 sm:py-44">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-red-600">Faster to organize</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you need to change your routine
          </p>
          <p className="mt-6 text-lg leading-8 text-white">
            Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum
            pulvinar et feugiat blandit at. In mi viverra elit nunc.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-red-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-white">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
    <div className='mockup_feature pb-32'>
      <div className='mockup_title'>
        <h2 className='text-base font-semibold leading-7 mb-1 text-red-600'>Responsive mode</h2>
        <p className='text-3xl sm:text-3x1 mb-1 font-bold tracking-tight text-white'>Add task.</p>
        <p className='text-3xl sm:text-3x1 mb-1 font-bold tracking-tight text-white'>Get more every day.</p>
        <p className='mockup_lorem text-white leading-8'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque deleniti, vel vero porro voluptates suscipit facere nam accusamus corporis repellendus aspernatur id amet.</p>
      </div>
      <div className='mockup_image'>
        <img src="/img/mockup.png" alt="mockup" width='300' />
      </div>
    </div>
    </div>
    <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
    </main>
  )
}

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MagicCard } from '@/components/magicui/magic-card';
import { ArrowRight } from 'lucide-react';
import videoSrc from '../assets/Images/banner.mp4';
import CodeBlock from '@/components/core/HomePage/CodeBlock';
import TimelineSection from '@/components/core/HomePage/TimeLine';
import InstructorSection from '@/components/core/HomePage/InstructorSection';
// import {banner} from "../assets/Images/banner.mp4";
import GridPattern from '@/components/magicui/animated-grid-pattern';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
const HomePage = () => {
    return (
        <>


            {/* section 1 of blue background */}
            <section className='bg-richblack-900 text-[#e0e6ed] w-full xsm:p-8 xxsm:p-4 sm:p-16'>
                <div className='w-full flex flex-col justify-center items-center bg-richblack-900 gap-3'>

                    <Link to={"/signup"}>

                        <Button className="bg-[#1f2937] text-[#e0e6ed] hover:bg-[#374151] gap-1 mt-6">
                            Become an Instructor
                            <ArrowRight className='w-4 h-4'></ArrowRight>
                        </Button>
                    </Link>
                    <h2 className='mt-4 text-clamp-h1 font-bold text-center'>
                        Empower Your Future with <span className='text-[#38bdf8]'>Coding Skills</span>
                    </h2>
                    <p className='mt-2 text-center max-w-xl text-clamp-p'>
                        With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                    </p>
                    <div className='mt-4 flex space-x-4'>
                        <Link to="/About-us">
                            <Button className="bg-[#facc15] text-[#1f2937] hover:bg-[#eab308]">
                                Learn More
                            </Button>
                        </Link>
                        <Button className="bg-[#1f2937] text-[#e0e6ed] hover:bg-[#374151]">
                            Book a Demo
                        </Button>
                    </div>
                    {/* video section */}
                    <div className='mt-16 w-full flex justify-end'>
                        <div className='relative'>
                            <div className='absolute inset-1 bg-richblack-5 transform xxsm:translate-x-2 sm:-translate-x-4 xxsm:translate-y-2 sm:translate-y-4 z-0'></div>
                            <video className='relative z-10 mr-8' width="750" height="500" controls autoFocus autoPlay muted loop>
                                <source src={videoSrc} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>

                {/* unlock your potential and coding animation part 1st part */}

                <div className='w-full flex flex-col md:flex-row justify-between gap-8 relative top-16'>
                    <div className='w-full md:w-1/2 flex flex-col'>
                        <h1 className='text-clamp-h1 font-bold mb-6'>
                            Unlock your <span className='text-[#38bdf8]'>coding potential</span> with our online courses.
                        </h1>
                        <p className='text-clamp-p mb-6'>
                            Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.
                        </p>
                        <div className='flex gap-4 mt-4'>
                            <Button className="bg-[#facc15] text-[#1f2937] hover:bg-[#eab308] flex items-center gap-2 px-4 py-2 rounded-md">
                                Try it Yourself <ArrowRight className='w-4 h-4' />
                            </Button>
                            <Button className="bg-[#1f2937] text-[#e0e6ed] hover:bg-[#374151] px-4 py-2 rounded-md">
                                Learn More
                            </Button>
                        </div>
                    </div>
                    <div className='w-full md:w-1/2 mt-8 md:mt-0'>
                        <MagicCard gradientOpacity={2} className="min-h-20">
                            <CodeBlock />
                        </MagicCard>
                    </div>
                </div>


                {/* unlock your potential and coding animation part 2nd part */}
                <div className='w-full flex flex-col md:flex-row justify-between gap-8 relative top-16 mt-16 md:hidden'>
                    <div className='w-full md:w-1/2 flex flex-col'>
                        <h1 className='text-clamp-h1 font-bold mb-6'>
                            Start <span className='text-[#38bdf8]'>coding in seconds</span>
                        </h1>
                        <p className='text-clamp-p mb-6'>
                            Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.
                        </p>
                        <div className='flex gap-4 mt-4'>
                            <Button className="bg-[#facc15] text-[#1f2937] hover:bg-[#eab308] flex items-center gap-2 px-4 py-2 rounded-md">
                                Continue Lessons <ArrowRight className='w-4 h-4' />
                            </Button>
                            <Button className="bg-[#1f2937] text-[#e0e6ed] hover:bg-[#374151] px-4 py-2 rounded-md">
                                Learn More
                            </Button>
                        </div>
                    </div>
                    <div className='w-full md:w-1/2 mt-8 md:mt-0'>
                        <MagicCard gradientOpacity={0.1} gradientColor='blue' className="min-h-20">
                            <CodeBlock />
                        </MagicCard>
                    </div>
                </div>

                <div className='w-full flex flex-col md:flex-row justify-between gap-8 relative top-16 mt-16 hidden md:flex'>
                    <div className='w-full md:w-1/2 mt-8 md:mt-0'>
                        <MagicCard gradientOpacity={0.1} gradientColor='blue' className="min-h-20">
                            <CodeBlock />
                        </MagicCard>
                    </div>
                    <div className='w-full md:w-1/2 flex flex-col'>
                        <h1 className='text-clamp-h1 font-bold mb-6'>
                            Start <span className='text-[#38bdf8]'>coding in seconds</span>
                        </h1>
                        <p className='text-clamp-p mb-6'>
                            Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.
                        </p>
                        <div className='flex gap-4 mt-4'>
                            <Button className="bg-[#facc15] text-[#1f2937] hover:bg-[#eab308] flex items-center gap-2 px-4 py-2 rounded-md">
                                Continue Lessons <ArrowRight className='w-4 h-4' />
                            </Button>
                            <Button className="bg-[#1f2937] text-[#e0e6ed] hover:bg-[#374151] px-4 py-2 rounded-md">
                                Learn More
                            </Button>
                        </div>
                    </div>
                </div>


                {/* unlock the power of code */}

                <div className='w-full flex flex-col relative top-80  items-center mb-64'>


                    <h1 className='text-3xl font-bold mb-6'>
                        Unlock the <span className='text-[#38bdf8]'>power of coding.</span>
                    </h1>
                    <p className='text-lg mb-6'>

                        Learn to Build Anything You Can Imagine                     </p>
                    <div className='relative'>
                        <div className='flex gap-4 top-8'>
                            <Link to={"/catalog"}>
                                <Button className="bg-[#facc15] text-[#1f2937] hover:bg-[#eab308] flex items-center gap-2 px-4 py-2 rounded-md">
                                    Explore Full Catalog <ArrowRight className='w-4 h-4' />
                                </Button>

                            </Link>
                            <Link to={"/About-us"}>
                                <Button className="bg-[#1f2937] text-[#e0e6ed] hover:bg-[#374151] px-4 py-2 rounded-md">
                                    Learn More
                                </Button>

                            </Link>
                        </div>

                    </div>

                </div>



            </section>

            {/* setion 2 of white bg */}

            <section className='w-full bg-richblack-5 relative top-24 text-richblack-900  xsm:p-8 xxsm:p-4 sm:p-16'>

                <div className='sm:flex  justify-between mt-12 gap-8'>

                    <div>
                        <h1 className='text-clamp-h1 font-bold mb-6'>Get the Skills you need for a  <span className='text-[#38bdf8]'>Job that is in demand.</span></h1>
                    </div>
                    <div>
                        <div className='flex flex-col gap-6'>
                            <p className='text-clamp-p'>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                            <Link to="/About-us">
                                <Button className="bg-[#facc15] text-[#1f2937] hover:bg-[#eab308] flex items-center gap-2 px-4 py-2 rounded-md">Learn More</Button>

                            </Link>
                        </div>
                    </div>
                </div>

                {/* TimeLine Section */}
                <TimelineSection></TimelineSection>



                <GridPattern
                    numSquares={30}
                    maxOpacity={0.1}
                    duration={2}
                    repeatDelay={1}


                />
            </section>

            {/* section 3 of blue bg */}
            <section className='bg-richblack-900 text-[#e0e6ed] w-full xsm:p-8 xxsm:p-4 sm:p-16'>
                <InstructorSection></InstructorSection>

            </section>

            {/* ratting and reviews section: Pending */}

            {/* footer */}
            <Footer></Footer>




        </>
    );


}

export default HomePage;

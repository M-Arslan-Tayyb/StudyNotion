// eslint-disable-next-line no-unused-vars
import React from 'react'
// import CTAButton from "../../../components/core/HomePage/Button";
// import { FaArrowRight } from "react-icons/fa";
// import Instructor from "../../../assets/Images/Instructor.png";
import Instructor from "../../../assets/Images/Instructor.png";
import { Button } from '@/components/ui/button';
// import HighlightText from './HighlightText';

const InstructorSection = () => {
    return (
        <div>
            <div className="flex flex-col lg:flex-row gap-20 items-center">
                <div className="lg:w-[50%] relative top-20">
                    <img
                        src={Instructor}
                        alt=""
                        className="shadow-white shadow-[-20px_-20px_0_0]"
                    />
                </div>
                <div className="lg:w-[50%] flex gap-10 flex-col">
                    <h1 className="lg:w-[50%] text-4xl font-semibold ">
                        Become an
                        {/* <HighlightText text={"instructor"} /> */}
                        <h1 className='text-[#38bdf8] text-clamp-h1'>
                            Instructor
                        </h1>
                    </h1>

                    <p className="font-medium text-[16px] text-justify w-[90%] text-richblack-300">
                        Instructors from around the world teach millions of students on
                        StudyNotion. We provide the tools and skills to teach what you
                        love.
                    </p>

                    <div className="w-fit">
                        <Button className="bg-[#facc15] text-[#1f2937] hover:bg-[#eab308]">
                            Start Teaching Now</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InstructorSection
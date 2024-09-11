// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import CountryCode from "../../../utils/data/countrycode"

import { useContactUsMutation } from "@/services/operations/contactUsApi"

const ContactUsForm = () => {


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful,isLoading },
    } = useForm()
    const contactMutation = useContactUsMutation(); // Call the mutation hook

    const submitContactForm = async (data) => {
        console.log("Form Data - ", data);

        contactMutation.mutate(data, {
            onSuccess: () => {
                reset(); // Reset form on success
            },
            
        });
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstname: "",
                lastname: "",
                message: "",
                phoneNo: "",
            })
        }
    }, [reset, isSubmitSuccessful])

    return (
        <form
            className="flex flex-col gap-7"
            onSubmit={handleSubmit(submitContactForm)}
        >
            <div className="flex flex-col gap-5 lg:flex-row">
                <div className="flex flex-col gap-2 lg:w-[48%]">
                    <label htmlFor="firstname" className="lable-style">
                        First Name
                    </label>
                    <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        placeholder="Enter first name"
                        className="w-full rounded-md bg-richblack-800 px-4 py-3 text-richblack-5 placeholder-richblack-300 shadow-sm border border-richblack-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"

                        {...register("firstname", { required: true })}
                    />
                    {errors.firstname && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter your name.
                        </span>
                    )}
                </div>
                <div className="flex flex-col gap-2 lg:w-[48%]">
                    <label htmlFor="lastname" className="lable-style">
                        Last Name
                    </label>
                    <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        placeholder="Enter last name"
                        className="w-full rounded-md bg-richblack-800 px-4 py-3 text-richblack-5 placeholder-richblack-300 shadow-sm border border-richblack-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        
                        {...register("lastname")}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="lable-style">
                    Email Address
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter email address"
                    className="w-full rounded-md bg-richblack-800 px-4 py-3 text-richblack-5 placeholder-richblack-300 shadow-sm border border-richblack-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"

                    {...register("email", { required: true })}
                />
                {errors.email && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                        Please enter your Email address.
                    </span>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="phonenumber" className="lable-style">
                    Phone Number
                </label>

                <div className="flex gap-5">
                    <div className="flex w-[81px] flex-col gap-2">
                        <select
                            type="text"
                            name="firstname"
                            id="firstname"
                            placeholder="Enter first name"
                            className="w-full rounded-md bg-richblack-800 px-4 py-3 text-richblack-5 placeholder-richblack-300 shadow-sm border border-richblack-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"

                            {...register("countrycode", { required: true })}
                        >
                            {CountryCode.map((ele, i) => {
                                return (
                                    <option key={i} value={ele.code}>
                                        {ele.code} -{ele.country}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="flex w-[calc(100%-90px)] flex-col gap-2">
                        <input
                            type="number"
                            name="phonenumber"
                            id="phonenumber"
                            placeholder="12345 67890"
                            className="w-full rounded-md bg-richblack-800 px-4 py-3 text-richblack-5 placeholder-richblack-300 shadow-sm border border-richblack-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"

                            {...register("phoneNo", {
                                required: {
                                    value: true,
                                    message: "Please enter your Phone Number.",
                                },
                                maxLength: { value: 12, message: "Invalid Phone Number" },
                                minLength: { value: 10, message: "Invalid Phone Number" },
                            })}
                        />
                    </div>
                </div>
                {errors.phoneNo && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                        {errors.phoneNo.message}
                    </span>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="message" className="lable-style">
                    Message
                </label>
                <textarea
                    name="message"
                    id="message"
                    cols="30"
                    rows="7"
                    placeholder="Enter your message here"
                    className="w-full rounded-md bg-richblack-800 px-4 py-3 text-richblack-5 placeholder-richblack-300 shadow-sm border border-richblack-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"

                    {...register("message", { required: true })}
                />
                {errors.message && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                        Please enter your Message.
                    </span>
                )}
            </div>

            <button
                type="submit"
            className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
             ${
               !isLoading &&
               "transition-all duration-200 hover:scale-95 hover:shadow-none"
             }  disabled:bg-richblack-500 sm:text-[16px] `
            }
            >
                Send Message
            </button>
        </form>
    )
}

export default ContactUsForm
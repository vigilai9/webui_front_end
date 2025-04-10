import React, { useState } from 'react'
import { Button } from './ui/button';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import axios from 'axios';


const UserQuery = () => {
    const [userQuery, setUserQuery] = useState({ name: "", email: "", phone: "", designation: "", query: "" });

    const queryHandler = (event: any) => {
        setUserQuery((prev) => {
            return { ...prev, [event.target.name]: event.target.value }
        });
    }

    const submitQuery = async(event: any) => {
        event.preventDefault();
        console.log(userQuery);
        // "body": "{\"name\":\"Kanta Doe\",\"email\":\"kanta@example.com\",\"designation\":\"Developer\",\"phone\":\"1234567890\",\"query\":\"How do I use Lambda?\"}"
        const response = await axios.post("https://90p4290to5.execute-api.us-east-2.amazonaws.com/new_stage/query",  userQuery)
        console.log("REspooo", response);
    }


    return (
        <div className="flex max-w-5xl w-full flex-col items-center justify-center gap-2  bg-gray-100 py-20  mt-30">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl font-semibold leading-snug mb-6">
                    Let Us Know About Yourself
                </h2>
                <p className="my-4 md:my-6 text-gray-500 text-center text-base md:text-lg tracking-tight px-4 md:px-8 lg:px-44 mx-auto">
                    Interested in learning more or discussing your specific needs? Fill out the form below, and one of our specialists will get in touch.
                </p>
            </div>

            <form onSubmit={submitQuery} className="bg-white rounded-2xl shadow-xl border border-gray-200 max-w-4xl mx-auto p-6 sm:p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                
                    <div className="grid w-full max-w-sm items-center gap-1">
                      <Label htmlFor="name">Name<span className="text-red-500">*</span></Label>
                      <Input type="text" id="name" name="name" onChange={queryHandler} className='rounded' required/>
                    </div>

                    <div className="grid w-full max-w-sm items-center gap-1">
                      <Label htmlFor="designation">Designation / Role</Label>
                      <Input type="text" id="designation" name="designation" onChange={queryHandler} className='rounded'/>
                    </div>

                    <div className="grid w-full max-w-sm items-center gap-1">
                      <Label htmlFor="email">Email<span className="text-red-500">*</span></Label>
                      <Input type="text" id="email" name="email" onChange={queryHandler} className='rounded' required/>
                    </div>

                    <div className="grid w-full max-w-sm items-center gap-1">
                      <Label htmlFor="phone">Phone<span className="text-red-500">*</span></Label>
                      <Input type="text" id="phone" name="phone" onChange={queryHandler} className='rounded' />
                    </div>

                  
                </div>
                <div className="grid w-full gap-1.5">
                      <Label htmlFor="message">Tell us what's on your mind <span className="text-red-500">*</span></Label>
                      <Textarea id="query" name="query"  rows={5} onChange={queryHandler} required/>
                </div>

                <div
                    className="flex items-center justify-center mt-6"
                >
                    <Button type='submit' size={'lg'} variant={'default'} className="rounded">
                        Submit inquiry
                    </Button>
                </div>
            </form>
        </div>

    )
}

export default UserQuery
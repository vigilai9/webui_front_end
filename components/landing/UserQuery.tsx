import React, { useState } from 'react'
import { Button } from '../ui/button';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { motion } from 'framer-motion';
import axios from 'axios';

interface IUserQuery{
    name: string,
    email: string,
    phone?: string,
    designation?: string,
    query: string,
}

const initialFormData: IUserQuery = {
    name: '',
    email: '',
    phone: '',
    designation: '',
    query: '',
};

const UserQuery = () => {
    // state to store user query
    const [userQuery, setUserQuery] = useState<IUserQuery>(initialFormData);
    const [loading, setLoading] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    //onchange query handler
    const queryChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setUserQuery((prev) => {
            return { ...prev, [name]: value.trimStart() }
        });
    }
    //submit handler for user query
    const submitQuery = async(event: any) => {
        event.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');
        setLoading(true);
        
        try {
            const x = await axios.post(
              'https://90p4290to5.execute-api.us-east-2.amazonaws.com/new_stage/query',
              userQuery
            );
            setSuccessMessage('Your inquiry has been submitted successfully!');
            setUserQuery(initialFormData);
          } catch (error) {
            setErrorMessage('There was an error submitting your inquiry. Please try again later.');
          } finally {
            setLoading(false);
        }
    }

  return (
    <div className="w-full max-w-7xl lg:px-0 md:px-2 sm:px-2 px-2">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col justify-center mx-auto items-center gap-6 py-12"
    >
      <div className="flex items-center space-x-2 bg-gray-200 w-fit rounded px-2 py-1 text-sm">
        <span className="text-blue-800">•</span>
        <span className="text-blue-800 font-semibold">Get Started</span>
      </div>
      <div className="flex flex-col items-center text-center gap-4 w-full">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight px-2 sm:px-0">
          Ready to <span className="text-[#1b3b5f]">Upgrade</span> Your Security?
        </h1>
        <p className="max-w-2xl text-gray-600 text-sm sm:text-base px-4 sm:px-0">
          Fill out the form below and our team will get in touch to schedule a personalized demo of our video surveillance solution.
        </p>
      </div>

      <div className="w-full max-w-2xl mt-6 sm:mt-8 px-2 sm:px-0">
      <div className="flex max-w-4xl w-full flex-col items-center justify-center gap-2 rounded py-8 md:py-8 lg:py-12 px-4">
      <form   
       className="bg-white rounded-2xl shadow-xl max-w-4xl mx-auto p-6 sm:p-10 w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="grid w-full items-center gap-1">
            <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={userQuery.name}
              onChange={queryChangeHandler}
              className="rounded"
              required
            />
          </div>

          <div className="grid w-full items-center gap-1">
            <Label htmlFor="designation">Designation / Role</Label>
            <Input
              type="text"
              id="designation"
              name="designation"
              value={userQuery.designation}
              onChange={queryChangeHandler}
              className="rounded"
            />
          </div>

          <div className="grid w-full items-center gap-1">
            <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={userQuery.email}
              onChange={queryChangeHandler}
              className="rounded"
              required
            />
          </div>

          <div className="grid w-full items-center gap-1">
            <Label htmlFor="phone">Phone</Label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={userQuery.phone}
              onChange={queryChangeHandler}
              className="rounded"
            />
          </div>
        </div>

        <div className="grid w-full gap-1.5 mb-4">
          <Label htmlFor="query">
            Tell us what's on your mind <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="query"
            name="query"
            value={userQuery.query}
            onChange={queryChangeHandler}
            rows={5}
            required
          />
        </div>

        {successMessage && (
          <p className="text-green-600 text-center mb-4">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-600 text-center mb-4">{errorMessage}</p>
        )}

        <div onClick={submitQuery} className="flex items-center justify-center mt-6">
          <Button
            type="submit"
            size="lg"
            variant="default"
            className="rounded"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Inquiry'}
          </Button>
        </div>
      </form>
    </div>
      </div>
    </motion.div>
  </div>
  );
};

export default UserQuery;
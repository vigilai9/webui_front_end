import React, { useState } from 'react'
import { Button } from './ui/button';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
            await axios.post(
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
    <div className="flex max-w-5xl w-full flex-col items-center justify-center gap-2 rounded bg-gray-100 py-8 md:py-8 lg:py-12 mt-30">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold leading-snug mb-6">
          Let Us Know About Yourself
        </h2>
        <p className="my-4 md:my-6 text-gray-500 text-center text-base md:text-lg tracking-tight px-4 md:px-8 lg:px-44 mx-auto">
          Interested in learning more or discussing your specific needs? Fill out the form below,
          and one of our specialists will get in touch.
        </p>
      </div>

      <form onSubmit={submitQuery} className="bg-white rounded-2xl shadow-xl max-w-4xl mx-auto p-6 sm:p-10 w-full">
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

        <div className="flex items-center justify-center mt-6">
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
  );
};

export default UserQuery;
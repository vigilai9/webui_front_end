import React from 'react';
import { Button } from '../ui/button';
import { Instagram, Linkedin, Twitter, X } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full text-gray-800 bg-gray-200">

        <div className="w-full max-w-7xl lg:px-0 md:px-2 sm:px-2 px-2 mx-auto">
          {/* Main footer content */}
           <div className='pt-4 flex flex-col gap-4 items-center mx-auto'>
             <h1 className='text-4xl font-bold'>Try <span className='text-[#1b3b5f]'>VigilAI</span> Today</h1>
             <div className='flex flex-col'>
               <p className='text-center'>Under 30 Sec, Human Level Reporting</p>
             </div>
             <Button>Get started for Free</Button>
           </div>

        <div className="mx-auto py-12">
          
        <div className="mx-auto py-12">
  <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-8 text-center md:text-left">
    {/* Brand column - full width on mobile, spans all columns */}
    <div className="md:col-span-1">
      <h1 className="text-3xl font-bold mb-4">VigilAI</h1>
      <p className="text-gray-600 text-sm max-w-xs mx-auto md:mx-0">
        Advanced AI-premises video surveillance for modern security operations. Stay ahead of threats with our cutting-edge technology.
      </p>
    </div>

    {/* Product column */}
    <div className="md:pl-4">
      <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
      <ul className="space-y-3 text-sm">
  <li>
    <a 
      href="mailto:utkarsh@s3cura.ai" 
      className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
    >
      utkarsh@s3cura.ai
    </a>
  </li>
  <li>
    <a 
      href="mailto:utsav@s3cura.ai" 
      className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
    >
      utsav@s3cura.ai
    </a>
  </li>
  <li>
    <a 
      href="mailto:gaurav@s3cura.ai" 
      className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
    >
      gaurav@s3cura.ai
    </a>
  </li>
      </ul>
    </div>

    <div className="md:pl-4">
      <h2 className="text-lg font-semibold mb-4 invisible">.</h2>
      <ul className="space-y-3 text-sm">
        <li><a className="text-gray-600 hover:text-gray-900 transition-colors duration-200" href="tel:+13125394410">+1 (312) 539-4410</a></li>
        <li><a className="text-gray-600 hover:text-gray-900 transition-colors duration-200" href="tel:+13126190735">+1 (312) 619-0735</a></li>
      </ul>
    </div>
  </div>
  </div>
      
          {/* Footer bottom */}
          <div className="border-t border-gray-300 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm mb-4 md:mb-0">© 2025 VigilAI. All rights reserved.</p>
              <div className="flex items-center space-x-6">
                <a href="https://www.instagram.com/s3cura.ai/" target='_blank' className="text-gray-500 hover:text-gray-900">
                  <span className="sr-only">Facebook</span>
                  <Instagram className='h-4 w-4'/>
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/company/s3cura/" target='_blank' className="text-gray-500 hover:text-gray-900">
                  <span className="sr-only">LinkedIn</span>
                  <Linkedin  className='h-4 w-4'/>
                </a>
              </div>
            </div>
          </div>
        </div>
       </div>
      </footer>
    );
};

export default Footer;
import { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import Sidebar from '../components/Sidebar';
import { saveStudent } from '../api/student';
import Link from 'next/link';
import { useRouter } from 'next/router';

type StudentInterface = {
  name: string,
  email: string,
  mobile: string,
  status: number,
};

export default function Student() {
  const [students, setStudents] = useState<StudentInterface>({
    name: "",
    email: "",
    mobile: "",
    status: 1,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const router = useRouter();

  const handleSave = async () => {
    // Validate inputs
    const errors: { [key: string]: string } = {};
    if (!students.name.trim()) {
      errors.name = "Name is required";
    }
    if (!students.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(students.email)) {
      errors.email = "Email is invalid";
    }
    if (!students.mobile.trim()) {
      errors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(students.mobile)) {
      errors.mobile = "Mobile number must be 10 digits";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      const data = await saveStudent(students);
      console.log(data);
      router.push('/student');
    } catch (error) {
      console.error("Error saving student:", error);
      // Handle error
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className=' class="w-3/12 bg-gray-200"'>
          <Sidebar />
        </div>

        <div className='w-9/12 bg-white-300'>
          <section className="container px-4 mx-auto">
            <Link href="/student" className='float-right -my-4'>
              <button data-modal-target="#static-modal" data-modal-toggle="#static-modal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                Back
              </button>
            </Link>
            <div className="flex flex-col mt-8">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden dark:border-gray-700 md:rounded-lg">
                    <form className="max-w-sm mx-auto border-2 p-4 rounded-lg mt-4">
                      <div>
                        <h1 className="text-2xl font-bold py-2 place-content-center text-gray-800 dark:text-white">Add Student </h1>
                      </div>
                      <div className="mb-5">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name </label>
                        <input type="text" id="name" name='name' className={`bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.name ? 'border-red-500' : ''}`} placeholder="Enter your Name" value={students.name}
                          onChange={(e) => {
                            setStudents((students) => ({ ...students, [e.target.name]: e.target.value }));
                            setErrors((errors) => ({ ...errors, name: '' }));
                          }} 
                          required />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email </label>
                        <input type="email" id="email" name='email' className={`bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.email ? 'border-red-500' : ''}`} placeholder="Enter valid Email" value={students.email}
                          onChange={(e) => {
                            setStudents((students) => ({ ...students, [e.target.name]: e.target.value }));
                            setErrors((errors) => ({ ...errors, email: '' }));
                          }}  
                          required />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                      <div className="mb-5">
                        <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile No </label>
                        <input type="text" id="mobile" name='mobile' className={`bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.mobile ? 'border-red-500' : ''}`} placeholder="Enter valid Mobile number" value={students.mobile} maxLength={10}
                          onChange={(e) => {
                            setStudents((students) => ({ ...students, [e.target.name]: e.target.value }));
                            setErrors((errors) => ({ ...errors, mobile: '' }));
                          }}  
                          required />
                        {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
                      </div>
                      <button 
                        type="button" 
                        className="text-white mb-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
                        onClick={handleSave}
                      >
                        Save
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

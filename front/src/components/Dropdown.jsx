import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

const Dropdown = ({ title, description }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full">
            <div
                className="cursor-pointer transition"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="flex justify-between items-center mb-4">
                    <span className="max-w-10/12">{title}</span>
                    <IoIosArrowDown className="bg-purpleOiches text-white w-5 h-5" />
                </h3>
            </div>
            {isOpen && (
                <div
                    className="mt-2 bg-gray-50 p-4 rounded-md shadow-md border-t border-gray-200 mb-6"
                    dangerouslySetInnerHTML={{ __html: description }}
                />
            )}
        </div>
    );
};

export default Dropdown;

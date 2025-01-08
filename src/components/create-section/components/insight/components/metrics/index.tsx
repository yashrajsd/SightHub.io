import { MetricsOptions, metricProps } from '@/constants/constants';
import { Trash2 } from 'lucide-react';
import React, { useState } from 'react';

type FormData = {
    fields: string[];
    [key: string]: string | string[]; // Other keys will map to string or array of strings
};

const Metrics = () => {
    const [selected, setSelected] = useState<metricProps[]>([]);
    const [formData, setFormData] = useState<FormData>({
        fields: [], 
    });

    const handleSelection = (item: metricProps) => {
        setSelected((prevSelected) => [...prevSelected, item]);

        if (item.type === 'Input') {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [item.label]: '',
            }));
        }


        if (item.type === 'Field') {
            setFormData((prevFormData) => ({
                ...prevFormData,
                fields: [...prevFormData.fields, item.label], 
            }));
        }
    };

    const handleDelete = (label: string) => {
        setSelected((prevSelected) =>
            prevSelected.filter((item) => item.label !== label)
        );

        if (formData[label] !== undefined) {
            setFormData((prevFormData) => {
                const updatedData = { ...prevFormData };
                delete updatedData[label];
                return updatedData;
            });
        }

        if (formData.fields.includes(label)) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                fields: prevFormData.fields.filter((field:string) => field !== label),
            }));
        }
    };

    const handleInputChange = (label: string, value: string) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [label]: value,
        }));
    };

    const availableOptions = MetricsOptions.filter(
        (option) => !selected.some((item) => item.label === option.label)
    );

    const handleSubmit = () => {
        console.log('Form Data:', formData);
    };

    return (
        <div className="w-full">
            <ul className="w-full flex flex-col font-aeonik">
                {selected.map((item) => (
                    <li key={item.label} className="flex">
                        <span className="flex items-center gap-2 flex-1 p-3 border-[1px] text-[0.9rem] rounded-md">
                            {item.label}
                        </span>
                        {item.type === 'Input' && (
                            <span>
                                <input
                                    placeholder={item.placeholder}
                                    value={formData[item.label] || ''}
                                    onChange={(e) =>
                                        handleInputChange(item.label, e.target.value)
                                    }
                                    className="p-3 bg-transparent focus:outline-none border-[1px] rounded-md"
                                />
                            </span>
                        )}
                        <span
                            className="p-4 rounded-md border-[1px] cursor-pointer hover:bg-[#FF4646] hover:text-white transition duration-300"
                            onClick={() => handleDelete(item.label)}
                        >
                            <Trash2 size={15} />
                        </span>
                    </li>
                ))}
            </ul>
            <div className="w-full flex gap-2">
                {availableOptions.map((item, index) => (
                    <button
                        className="p-3 rounded-md border-[1px] text-[0.8rem] font-bold mt-8 flex items-center gap-2 text-[#363636] hover:text-black"
                        key={index}
                        onClick={() => handleSelection(item)}
                    >
                        {item.icon} {item.label}
                    </button>
                ))}
            </div>
            <button
                onClick={handleSubmit}
                className="border-[1px] flex items-center justify-center w-full text-white p-2 bg-[#292929] transition duration-300 rounded-md my-4 "
            >
                Generate
            </button>
        </div>
    );
};

export default Metrics;

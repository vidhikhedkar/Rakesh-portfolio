import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiSave, FiLoader } from 'react-icons/fi';
import { fetchServices, updateServices, deleteService, } from '../../service/servicesoffering.service';


const ServicesOfferingTab = () => {
    const [offerings, setOfferings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusMessage, setStatusMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');



    useEffect(() => {
        const loadServices = async () => {
            try {
                const data = await fetchServices();
                setOfferings(data);
            } catch (error) {
                console.error('Fetch services error:', error);
                setErrorMessage('Failed to load services from the server.');
            } finally {
                setLoading(false);
            }
        };
        loadServices();
    }, []);



    const handleChange = (index, field, value) => {
        setOfferings((prev) =>
            prev.map((item, i) =>
                i === index
                    ? {
                        ...item,
                        [field]: value,
                    }
                    : item
            )
        );
    };


    const handleAddItem = () => {
        const hasUnsavedService = offerings.some(
            (service) => !service._id
        );
        if (hasUnsavedService) {
            setErrorMessage('Please save the newly added service before adding another one.');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return;
        }


        const newService = {
            num: '01',
            title: '',
            desc: '',
            cardDesc: '',
        };


        setOfferings((prev) => {
            const updated = [newService, ...prev];
            return updated.map((item, index) => ({
                ...item,
                num: String(index + 1).padStart(2, '0'),
            }));
        });
        setStatusMessage('');
        setErrorMessage('');
    };


    const handleDeleteItem = async (index, service) => {
        try {
            setErrorMessage('');
            setStatusMessage('');
            if (service?._id) {
                await deleteService(service._id);
            }
            setOfferings((prev) => {
                const updated = prev
                    .filter((_, i) => i !== index)
                    .map((item, idx) => ({
                        ...item,
                        num: String(idx + 1).padStart(2, '0'),
                    }));

                return updated;
            });
            setStatusMessage('Service deleted successfully!');
            setTimeout(() => {
                setStatusMessage('');
            }, 3000);
        } catch (error) {
            console.error('Delete service error:', error);
            setErrorMessage('Failed to delete service.');
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatusMessage('');
        setErrorMessage('');
        try {
            const response = await updateServices(offerings);
            const savedServices = response?.data || response;
            setOfferings(savedServices);
            setStatusMessage('Services updated successfully!');
            setTimeout(() => {
                setStatusMessage('');
            }, 3000);
        } catch (error) {
            console.error('Update services error:', error);
            setErrorMessage('Failed to update services on the server.');
        }
    };


    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <FiLoader className="w-6 h-6 animate-spin text-[#5B78FF]" />
            </div>
        );
    }


    return (
        <div className="max-w-full p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                <div>
                    <h2 className="text-2xl font-semibold text-[#191C1D]">
                        Manage Offerings
                    </h2>

                    <p className="text-sm text-[#5F5E5E] mt-1">
                        Update titles, list descriptions, and grid card text
                        for your services section.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleAddItem}
                    className="flex items-center gap-2 bg-[#5B78FF] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#4a65e0] transition-colors cursor-pointer"
                >
                    <FiPlus className="w-4 h-4" />
                    Add Service
                </button>
            </div>


            {statusMessage && (
                <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-medium border border-emerald-100">
                    {statusMessage}
                </div>
            )}


            {errorMessage && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl text-sm font-medium border border-red-100">
                    {errorMessage}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div
                    className={`space-y-6 ${offerings.length > 4
                        ? 'max-h-150 overflow-y-auto pr-2 no-scrollbar'
                        : ''
                        }`}
                >
                    {offerings.map((service, index) => (
                        <div
                            key={service._id || `new-${index}`}
                            className={`p-5 rounded-2xl bg-[#F8F9FA] border relative group ${!service._id
                                ? 'border-[#5B78FF]'
                                : 'border-gray-200/60'
                                }`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold px-2.5 py-1 bg-white rounded-lg border border-gray-200 text-[#5B78FF]">
                                        Item #{service.num}
                                    </span>

                                    {!service._id && (
                                        <span className="text-xs font-semibold px-2.5 py-1 bg-[#EEF2FF] text-[#5B78FF] rounded-lg">
                                            NEW
                                        </span>
                                    )}
                                </div>

                                {offerings.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleDeleteItem(index, service)
                                        }
                                        className="text-gray-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                                        title="Delete Service"
                                    >
                                        <FiTrash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>


                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Service Title
                                    </label>

                                    <input
                                        type="text"
                                        value={service.title || ''}
                                        onChange={(e) =>
                                            handleChange(
                                                index,
                                                'title',
                                                e.target.value
                                            )
                                        }
                                        className="w-full text-sm px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 focus:outline-none focus:border-[#5B78FF]"
                                        required
                                    />
                                </div>


                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Left List Description
                                    </label>

                                    <input
                                        type="text"
                                        value={service.desc || ''}
                                        onChange={(e) =>
                                            handleChange(
                                                index,
                                                'desc',
                                                e.target.value
                                            )
                                        }
                                        className="w-full text-sm px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 focus:outline-none focus:border-[#5B78FF]"
                                        required
                                    />
                                </div>

                             
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Right Grid Card Description
                                    </label>

                                    <input
                                        type="text"
                                        value={service.cardDesc || ''}
                                        onChange={(e) =>
                                            handleChange(
                                                index,
                                                'cardDesc',
                                                e.target.value
                                            )
                                        }
                                        className="w-full text-sm px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 focus:outline-none focus:border-[#5B78FF]"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


                <div className="flex justify-end pt-6">
                    <button
                        type="submit"
                        className="flex items-center gap-2 bg-[#191C1D] text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-black transition-colors cursor-pointer"
                    >
                        <FiSave className="w-4 h-4" />
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ServicesOfferingTab;